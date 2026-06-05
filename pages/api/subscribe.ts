import type { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";

type SubscribeResponse = { ok: true } | { error: string };

// Lightweight, dependency-free email shape check. Defense-in-depth alongside
// the HTML5 `type="email"` constraint on the form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LEN = 254; // RFC 5321

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { email } = (req.body ?? {}) as { email?: unknown };

  if (
    typeof email !== "string" ||
    email.length === 0 ||
    email.length > MAX_EMAIL_LEN ||
    !EMAIL_RE.test(email)
  ) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    // Don't leak config state to the client.
    console.error("[subscribe] DATABASE_URL is not set");
    return res
      .status(503)
      .json({ error: "Signup is temporarily unavailable. Try again later." });
  }

  try {
    const sql = neon(dbUrl);
    // Idempotent: if the email is already in the table, do nothing.
    // The user still sees a success state — they're already subscribed.
    await sql`
      INSERT INTO subscribers (email)
      VALUES (${email.toLowerCase().trim()})
      ON CONFLICT (email) DO NOTHING
    `;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[subscribe] insert failed:", err);
    return res
      .status(500)
      .json({ error: "Couldn't save your email. Please try again." });
  }
}
