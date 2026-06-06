-- Run this once in your Neon production database (SQL editor in the Neon
-- console) to create the table the /api/high-scores endpoint reads/writes.

CREATE TABLE IF NOT EXISTS high_scores (
  id          SERIAL PRIMARY KEY,
  initials    CHAR(3) NOT NULL,
  score       INTEGER NOT NULL CHECK (score >= 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Top-N lookup index. score DESC for "highest first"; created_at ASC tie-breaks
-- so the first player to hit a score keeps the slot when others tie.
CREATE INDEX IF NOT EXISTS high_scores_top_idx
  ON high_scores (score DESC, created_at ASC);
