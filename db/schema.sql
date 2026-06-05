-- Run this once in your Neon database (SQL editor in the Neon console
-- or via `psql $DATABASE_URL -f db/schema.sql`) to create the table the
-- /api/subscribe endpoint writes to.

CREATE TABLE IF NOT EXISTS subscribers (
  id          SERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helpful index for sorting/recency lookups (UNIQUE on email already
-- gives us a lookup index for dedupe).
CREATE INDEX IF NOT EXISTS subscribers_created_at_idx
  ON subscribers (created_at DESC);
