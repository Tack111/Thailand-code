import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({ connectionString: process.env.NEON_DB })

const migration = `
ALTER TABLE destinations
ADD COLUMN IF NOT EXISTS category VARCHAR(100),
ADD COLUMN IF NOT EXISTS price_range VARCHAR(50),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS google_map_embed TEXT,
ADD COLUMN IF NOT EXISTS google_review_rating DECIMAL(3,2),
ADD COLUMN IF NOT EXISTS google_review_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS opening_hours JSONB,
ADD COLUMN IF NOT EXISTS why_visit TEXT,
ADD COLUMN IF NOT EXISTS best_time_to_visit TEXT,
ADD COLUMN IF NOT EXISTS nearby_attractions TEXT,
ADD COLUMN IF NOT EXISTS travel_tips TEXT,
ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS visit_duration VARCHAR(100),
ADD COLUMN IF NOT EXISTS transport_options TEXT,
ADD COLUMN IF NOT EXISTS last_updated DATE DEFAULT CURRENT_DATE;

CREATE INDEX IF NOT EXISTS idx_destinations_category ON destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_price_range ON destinations(price_range);
CREATE INDEX IF NOT EXISTS idx_destinations_is_trending ON destinations(is_trending);
CREATE INDEX IF NOT EXISTS idx_destinations_is_featured ON destinations(is_featured);
`

try {
  for (const stmt of migration.split(';').map(s => s.trim()).filter(s => s.length > 0)) {
    try {
      await pool.query(stmt)
      console.log('OK:', stmt.substring(0, 60) + '...')
    } catch (e) {
      console.log('Skip:', e.message.substring(0, 80))
    }
  }
  const tables = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='destinations' ORDER BY ordinal_position")
  console.log('\nDestinations columns:', tables.rows.map(r => r.column_name).join(', '))
} catch (err) {
  console.error('Migration error:', err.message)
} finally {
  await pool.end()
}