import 'dotenv/config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3002
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
const DATABASE_URL = process.env.NEON_DB || process.env.NEON_DATABASE_URL

if (!DATABASE_URL) {
  console.error('Missing NEON_DB or NEON_DATABASE_URL in .env')
  process.exit(1)
}

const pool = new Pool({ connectionString: DATABASE_URL })

async function query(text, params) {
  const res = await pool.query(text, params)
  return res.rows
}

async function initSchema() {
  const schemaPath = path.join(__dirname, '..', 'schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf-8')
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  console.log(`Executing ${statements.length} schema statements...`)
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i]
    try {
      await query(stmt)
      console.log(`Statement ${i + 1} OK: ${stmt.substring(0, 50)}...`)
    } catch (err) {
      console.error(`Statement ${i + 1} failed:`, err.message)
    }
  }

  const tables = await query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
  console.log('Existing tables:', tables.map(t => t.table_name).join(', ') || 'none')
  console.log('Schema initialization complete')
}

async function ensureUserColumns() {
  try {
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'))`)
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`)
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`)
    await query(`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'destinations'`)
    await query(`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS details TEXT`)
    await query(`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`)
    await query(`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`)
    console.log('Additional columns ensured')
  } catch (err) {
    console.log('Column check:', err.message)
  }
}

async function seedData() {
  try {
    const count = await query('SELECT COUNT(*) as cnt FROM destinations')
    if (count[0].cnt === '0') {
      await query(`
        INSERT INTO destinations (name, location, description, image_url, rating, category, details)
        VALUES
          ('Bangkok', 'Bangkok, Central Thailand', 'The vibrant capital city with temples, markets, and amazing street food.', '/images/bangkok.jpg', 4.5, 'destinations', 'Bangkok is a city of contrasts, where ancient temples stand alongside modern skyscrapers.'),
          ('Chiang Mai', 'Chiang Mai, Northern Thailand', 'Cultural hub surrounded by mountains, temples, and lush jungles.', '/images/chiangmai.jpg', 4.8, 'destinations', 'Chiang Mai offers a relaxed atmosphere with over 300 temples.'),
          ('Phuket', 'Phuket, Southern Thailand', 'Thailand largest island with beautiful beaches and vibrant nightlife.', '/images/phuket.jpg', 4.6, 'destinations', 'Phuket boasts pristine beaches like Patong, Kata, and Nai Harn.'),
          ('Krabi', 'Krabi, Southern Thailand', 'Stunning limestone cliffs, clear waters, and incredible diving spots.', '/images/krabi.jpg', 4.7, 'destinations', 'Krabi is famous for Railay Beach and world-class rock climbing.'),
          ('Ayutthaya', 'Ayutthaya, Central Thailand', 'Ancient capital with magnificent temple ruins and UNESCO World Heritage sites.', '/images/ayutthaya.jpg', 4.4, 'destinations', 'Ayutthaya was once the thriving capital of Siam.'),
          ('Koh Samui', 'Koh Samui, Surat Thani', 'Tropical paradise with palm-fringed beaches and luxury resorts.', '/images/kohsamui.jpg', 4.5, 'destinations', 'Koh Samui combines natural beauty with luxury.')
      `)
      console.log('Destination seed data inserted')
    }
  } catch (err) {
    console.log('Seed data error:', err.message)
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.url === '/api/auth/register' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const { name, email, password } = JSON.parse(body)
        if (!name || !email || !password) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Name, email and password are required' }))
          return
        }

        const existing = await query('SELECT id FROM users WHERE email = $1', [email])
        if (existing.length > 0) {
          res.writeHead(409, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Email already registered' }))
          return
        }

        const password_hash = await bcrypt.hash(password, 10)
        const result = await query(
          'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role',
          [name, email, password_hash]
        )

        const token = jwt.sign({ userId: result[0].id, email: result[0].email }, JWT_SECRET, { expiresIn: '7d' })

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ user: result[0], token }))
      } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Registration failed' }))
      }
    })
    return
  }

  if (req.url === '/api/auth/login' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(body)
        const result = await query('SELECT id, name, email, password_hash, role FROM users WHERE email = $1', [email])
        if (result.length === 0) {
          res.writeHead(401, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Invalid credentials' }))
          return
        }

        const user = result[0]
        const valid = await bcrypt.compare(password, user.password_hash)
        if (!valid) {
          res.writeHead(401, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Invalid credentials' }))
          return
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
        const { password_hash, ...safeUser } = user

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ user: safeUser, token }))
      } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Login failed' }))
      }
    })
    return
  }

  if (req.url === '/api/auth/profile' && req.method === 'GET') {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Unauthorized' }))
      return
    }

    try {
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const result = await query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.userId])
      if (result.length === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'User not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ user: result[0] }))
    } catch (err) {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Invalid token' }))
    }
    return
  }

  if (req.url === '/api/destinations' && req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM destinations ORDER BY created_at DESC')
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Failed to fetch destinations' }))
    }
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Not Found' }))
})

server.listen(PORT, async () => {
  try {
    await initSchema()
    await ensureUserColumns()
    await seedData()
    console.log(`Server running on http://localhost:${PORT}`)
  } catch (err) {
    console.error('Server startup error:', err)
    process.exit(1)
  }
})
