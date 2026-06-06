import type { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";

type Score = { initials: string; score: number };
type HighScoresResponse =
  | { scores: Score[] }
  | { ok: true; rank: number; scores: Score[] }
  | { error: string };

const TOP_N = 10;
const MAX_SCORE = 100_000; // sanity cap to block obvious shenanigans
const INITIALS_RE = /^[A-Z]{3}$/;

// Small denylist of obvious garbage / slurs. Not exhaustive; intentionally
// minimal so it's easy to review. Mirrored on the client for UX.
const DENY: ReadonlySet<string> = new Set([
  "ASS", "FUC", "FCK", "CUM", "TIT", "GAY", "FAG", "JEW",
  "NIG", "HOE", "WTF", "DIE", "KKK", "POO", "PEE",
]);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HighScoresResponse>,
) {
  // 1) Method dispatch first — bad methods get a clean 405 regardless of DB state.
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // 2) For POST, validate input before touching the DB.
  let initials = "";
  let score = 0;
  if (req.method === "POST") {
    const { initials: rawInitials, score: rawScore } = (req.body ?? {}) as {
      initials?: unknown;
      score?: unknown;
    };

    initials =
      typeof rawInitials === "string" ? rawInitials.toUpperCase().trim() : "";
    if (!INITIALS_RE.test(initials)) {
      return res
        .status(400)
        .json({ error: "Initials must be exactly 3 letters (A-Z)." });
    }
    if (DENY.has(initials)) {
      return res.status(400).json({ error: "Pick different initials." });
    }

    const s =
      typeof rawScore === "number" && Number.isFinite(rawScore)
        ? Math.floor(rawScore)
        : NaN;
    if (!Number.isFinite(s) || s < 0 || s > MAX_SCORE) {
      return res.status(400).json({ error: "Invalid score." });
    }
    score = s;
  }

  // 3) Now we need the DB. If it's not configured, fail uniformly.
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("[high-scores] DATABASE_URL is not set");
    return res
      .status(503)
      .json({ error: "Leaderboard is temporarily unavailable." });
  }

  const sql = neon(dbUrl);

  try {
    if (req.method === "GET") {
      const rows = (await sql`
        SELECT initials, score
        FROM high_scores
        ORDER BY score DESC, created_at ASC
        LIMIT ${TOP_N}
      `) as Score[];
      return res.status(200).json({ scores: rows });
    }

    // POST: insert then re-read top N (catches ties / concurrent inserts).
    await sql`
      INSERT INTO high_scores (initials, score)
      VALUES (${initials}, ${score})
    `;

    const rows = (await sql`
      SELECT initials, score
      FROM high_scores
      ORDER BY score DESC, created_at ASC
      LIMIT ${TOP_N}
    `) as Score[];

    // Best-effort rank of the row we just inserted, for UI highlighting.
    let rank = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].initials === initials && rows[i].score === score) {
        rank = i;
        break;
      }
    }
    return res.status(200).json({ ok: true, rank, scores: rows });
  } catch (err) {
    console.error("[high-scores] DB error:", err);
    return res
      .status(500)
      .json({ error: "Couldn't talk to the leaderboard." });
  }
}
