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

async function logUserAction(userId, actionType, description) {
  try {
    await query(
      'INSERT INTO user_actions (user_id, action_type, description) VALUES ($1, $2, $3)',
      [userId, actionType, description]
    )
  } catch (err) {
    console.error('Failed to log user action:', err.message)
  }
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
    await query(`ALTER TABLE destinations ADD COLUMN IF NOT EXISTS must_try_dishes TEXT`)
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
        INSERT INTO destinations (name, location, description, image_url, rating, category, price_range, address, latitude, longitude, google_map_embed, google_review_rating, google_review_count, opening_hours, why_visit, best_time_to_visit, nearby_attractions, travel_tips, visit_duration, transport_options, is_trending, is_featured)
        VALUES
          ('Bangkok', 'Bangkok, Central Thailand', 'Thailand''s bustling capital where ancient temples sit beside neon-lit skyscrapers, and world-famous street food costs less than $2.', '/images/bangkok.jpg', 4.5, 'city', '$$', 'Phra Nakhon, Bangkok 10200, Thailand', 13.7563, 100.5018, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60223.17002304996!2d100.4925!3d13.7518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x100a7fa99b9c4d41%3A0x5b1d3e0b0b000000!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2sth!4v1700000000000', 4.7, 1250000, '{"monday":"Open 24h","tuesday":"Open 24h","wednesday":"Open 24h","thursday":"Open 24h","friday":"Open 24h","saturday":"Open 24h","sunday":"Open 24h"}', 'A dazzling blend of golden temples, chaotic markets, and the world''s best street food — all for under $5.', 'November to February for cool weather. Visit temples early morning to beat crowds and heat.', 'Grand Palace, Chatuchak Market, Khao San Road, Chatuchak Weekend Market', 'Use the BTS Skytrain or MRT subway to avoid traffic. Get a Rabbit Card or MRT card for easy travel.', '3-5 days', 'BTS Skytrain, MRT, tuk-tuks, ride-hailing apps (Grab)', true, true),
          ('The Grand Palace', 'Bangkok, Central Thailand', 'The opulent former royal residence, home to the Emerald Buddha and dozens of stunning temples.', '/images/watmahathat.jpg', 4.6, 'attraction', '$$', 'Na Phra Lan Rd, Phra Nakhon, Bangkok 10200, Thailand', 13.7518, 100.4932, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.305363367436!2d100.4918!3d13.7518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x100a7fa9dcb8b8a1%3A0x8a0a0a0a0a0a0a0a!2sGrand%20Palace!5e0!3m2!1sen!2sth!4v1700000000000', 4.6, 890000, '{"monday":"08:30-15:30","tuesday":"08:30-15:30","wednesday":"08:30-15:30","thursday":"08:30-15:30","friday":"08:30-15:30","saturday":"08:30-15:30","sunday":"08:30-15:30"}', 'Wander through Thailand''s most sacred site — the glittering Emerald Buddha temple complex alone is worth the trip.', 'Open daily except when royal ceremonies close it. Arrive at 8:30 AM for fewer crowds. Dress modestly: shoulders and knees must be covered.', 'Wat Pho (Reclining Buddha), Wat Arun (Temple of Dawn), Chinatown', 'Take the Chao Phraya Express Boat to Tha Chang pier. Avoid tuk-tuks offering "shortened" routes.', 'Half day (3-4 hours)', 'Chao Phraya Express Boat, BTS to Saphan Taksin', false, true),
          ('Thip Samai', 'Bangkok, Central Thailand', 'World-famous for what many call the best pad thai in Bangkok — fresh, tangy, and served with a perfect wok hei char.', '/images/rotipairam.jpg', 4.4, 'street_food', '$', '369/14 Samsen Rd, Phra Nakhon, Bangkok 10200, Thailand', 13.7583, 100.4972, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.4!2d100.495!3d13.758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x100a7fa9!2sThip%20Samai!5e0!3m2!1sen!2sth!4v1700000000000', 4.4, 25000, '{"monday":"16:00-01:00","tuesday":"16:00-01:00","wednesday":"16:00-01:00","thursday":"16:00-01:00","friday":"16:00-23:59","saturday":"16:00-01:00","sunday":"16:00-01:00"}', 'The pad thai here defined Bangkok street food. The smoky wok aroma and the price under $2 make this a pilgrimage site for food lovers.', 'Best visited after 6 PM when the grill fires up. Go at 9 PM or later — the queue is part of the experience.', 'Nearby Yaowarat (Chinatown) for more night bites', 'Walk from Khao San Road. Grab a motorcycle taxi if you''re in a hurry.', '30-45 min', 'Walking, motorcycle taxi', true, true),
          ('Chiang Mai', 'Chiang Mai, Northern Thailand', 'Northern Thailand''s cultural heart, ringed by mountains and home to over 300 temples.', '/images/chiangmai.jpg', 4.8, 'city', '$$', 'Mueang Chiang Mai, Chiang Mai 50200, Thailand', 18.7883, 98.9810, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37685.0!2d98.981!3d18.788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sChiang%20Mai!5e0!3m2!1sen!2sth!4v1700000000000', 4.7, 98000, '{"monday":"Open 24h","tuesday":"Open 24h","wednesday":"Open 24h","thursday":"Open 24h","friday":"Open 24h","saturday":"Open 24h","sunday":"Open 24h"}', 'Cool mountain air, ancient temples, and a food scene that''s the soul of Northern Thailand — all wrapped in a relaxed old-city charm.', 'November to February (cool season). Avoid the burning season (March-May) when air quality drops.', 'Doi Suthep, Old City Temples, Night Bazaar, Warorot Market', 'Rent a bicycle or tuk-tuk to explore the Old City. Songthaew (shared red trucks) are cheap for getting around.', '3-4 days', 'Songthaew, tuk-tuk, bicycle rental, Grab', true, true),
          ('Wat Phra That Doi Suthep', 'Chiang Mai, Northern Thailand', 'Sacred mountaintop temple with golden stupa and panoramic views over Chiang Mai.', '/images/doisuthep.jpg', 4.5, 'temple', '$', 'Doi Suthep, Mueang Chiang Mai, Chiang Mai 50200, Thailand', 18.8019, 98.9247, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37685.0!2d98.925!3d18.802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sDoi%20Suthep!5e0!3m2!1sen!2sth!4v1700000000000', 4.5, 52000, '{"monday":"06:00-18:00","tuesday":"06:00-18:00","wednesday":"06:00-18:00","thursday":"06:00-18:00","friday":"06:00-18:00","saturday":"06:00-18:00","sunday":"06:00-18:00"}', 'Climb (or take the funicular) to this golden mountaintop temple for sweeping views and a deeply spiritual atmosphere.', 'Visit at sunrise for the most magical light. Wear long pants — dress code is strict.', 'Buppha Wat Boreham Marketplace, Chiang Mai Zoo, Nimman Road cafes', 'Take a songthaew or red truck up the mountain. Allow time for the climb or funicular queue.', 'Half day (2-3 hours)', 'Songthaew, funicular, taxi', false, true),
          ('Khao Soi Khun Yai', 'Chiang Mai, Northern Thailand', 'No-frills shack serving the iconic Chiang Mai-style khao soi — rich coconut curry noodle soup with crispy and soft egg noodles.', '/images/khaosoi.jpg', 4.3, 'street_food', '$', '101/1-2 Soi 5, Sri Poom Rd, Tambon Sri Poom, Amphoe Mueang, Chiang Mai 50200, Thailand', 18.7815, 98.9606, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37685.0!2d98.960!3d18.782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sKhao%20Soi%20Khun%20Yai!5e0!3m2!1sen!2sth!4v1700000000000', 4.3, 18000, '{"monday":"08:00-18:00","tuesday":"08:00-18:00","wednesday":"Closed","thursday":"08:00-18:00","friday":"08:00-18:00","saturday":"08:00-18:00","sunday":"08:00-18:00"}', 'This is where locals come for khao soi — a bowl of rich coconut curry broth, soft egg noodles, crispy shallots, and pickled mustard greens. It''s the definitive Northern Thai comfort food.', 'Open Tuesday-Sunday only. Arrive before 1 PM or go late afternoon to avoid the lunch rush. Ask for ''ped thai'' (extra crispy noodles) on top.', 'Warorot Market, Chiang Mai Gate, Nimmanhaemin Road', 'Located in the old city near Tha Phae Gate. Walkable from most Old City guesthouses.', '45-60 min', 'Walking', true, true),
          ('Tong Tem Toh', 'Chiang Mai, Northern Thailand', 'Upscale Northern Thai restaurant serving authentic dishes like gaeng hang lay (spicy pork belly curry) and sai oua (herbal sausage).', '/images/khaosoi.jpg', 4.4, 'restaurant', '$$', '51 Samlarn Rd, Tambon Phra Sing, Mueang Chiang Mai, Chiang Mai 50200, Thailand', 18.7825, 98.9686, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37685.0!2d98.969!3d18.783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sTong%20Tem%20Toh!5e0!3m2!1sen!2sth!4v1700000000000', 4.4, 3200, '{"monday":"11:00-22:00","tuesday":"11:00-22:00","wednesday":"11:00-22:00","thursday":"11:00-22:00","friday":"11:00-23:00","saturday":"11:00-23:00","sunday":"11:00-22:00"}', 'Authentic Northern Thai cuisine in a beautiful teak house setting. Try the gaeng hang lay and fresh herbs salad — these are the dishes Thais actually eat.', 'Dinner is best here. Reservations recommended on weekends. Try their signature sai oua (herbal sausage).', 'Nimmanhaemin Road, Wat Phra That Doi Suthep, Chiang Mai Night Bazaar', 'In the old city near the Three Kings Monument. Easy walk from Tha Phae Road.', '1.5-2 hours', 'Walking, tuk-tok', false, true),
          ('Phuket', 'Phuket, Southern Thailand', 'Thailand''s largest island with powder-white beaches, dramatic limestone cliffs, and a vibrant beach scene.', '/images/phuket.jpg', 4.6, 'island', '$$$', 'Mueang Phuket, Phuket 83000, Thailand', 7.8804, 98.3067, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37725.0!2d98.306!3d7.880!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sPhuket!5e0!3m2!1sen!2sth!4v1700000000000', 4.6, 75000, '{"monday":"Open 24h","tuesday":"Open 24h","wednesday":"Open 24h","thursday":"Open 24h","friday":"Open 24h","saturday":"Open 24h","sunday":"Open 24h"}', 'Crystal-clear waters, dramatic cliffs at Railay, and beach clubs that stay open till sunrise.', 'November to April (dry season). July-August is peak season for tourists.', 'Patong Beach, Big Buddha, Phi Phi Islands, Blue Tree', 'Rent a scooter for flexibility. Use Bolt/Grab for short trips. Avoid tuk-tuks on the island.', '4-5 days', 'Scooter rental, tuk-tuk, Bolt/Grab', true, true),
          ('Railay Beach', 'Krabi, Southern Thailand', 'Accessible only by boat, this limestone karst paradise offers world-class rock climbing and stunning beaches.', '/images/railay.jpg', 4.7, 'beach', '$$', 'Railay, Mueang Krabi, Krabi 81000, Thailand', 7.9833, 99.4167, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37760.0!2d99.416!3d7.983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sRailay%20Beach!5e0!3m2!1sen!2sth!4v1700000000000', 4.6, 18000, '{"monday":"Open 24h","tuesday":"Open 24h","wednesday":"Open 24h","thursday":"Open 24h","friday":"Open 24h","saturday":"Open 24h","sunday":"Open 24h"}', 'Towering limestone cliffs rising from emerald water — a UNESCO-recognized landscape that''s a climber''s and photographer''s dream.', 'Visit November to April for calm seas. Early morning or late afternoon for the best photos and fewer crowds.', 'Phra Nang Cave, Ao Nang, Tiger Cave Temple', 'Take a long-tail boat from Ao Nang or Krabi Town (15-30 min). No cars allowed on the beach.', 'Full day (6+ hours)', 'Long-tail boat', true, true),
          ('Krua Thai Kaprao', 'Bangkok, Central Thailand', 'Humble shophouse serving authentic Thai home cooking — think stir-fried basil pork, green curry, and papaya salad.', '/images/rotipairam.jpg', 4.2, 'restaurant', '$', '113/26 Maha Chai Rd, Tambon Wang Mahapu, Bang Rak, Bangkok 10500, Thailand', 13.7426, 100.5105, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.2!2d100.510!3d13.743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sKrua%20Thai!5e0!3m2!1sen!2sth!4v1700000000000', 4.2, 4200, '{"monday":"10:30-21:00","tuesday":"10:30-21:00","wednesday":"10:30-21:00","thursday":"10:30-21:00","friday":"10:30-22:00","saturday":"10:30-22:00","sunday":"10:30-21:00"}', 'Where Bangkok locals eat after work — honest, flavorful Thai food without any tourist markup. The basil pork (krapow) is addictive.', 'Come hungry and be ready to share tables. Cash only. Try the som tam (papaya salad) — it''s properly spicy.', 'Chinatown (Yaowarat), Saphan Sung Market', 'In the historic Charoen Krung area, near Hua Lumphong.', '1-1.5 hours', 'MRT, tuk-tuk, walking', false, true),
          ('Mae Varee Mango Sticky Rice', 'Bangkok, Central Thailand', 'Famous for the best mango sticky rice in Bangkok — fresh mangoes, sweet coconut cream, and warm glutinous rice.', '/images/takahrai.jpg', 4.3, 'cafe', '$', 'M Floor, Mango Tree Building, 384/14 Siam Rd, Ratchathewi, Bangkok 10400, Thailand', 13.7409, 100.5223, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.3!2d100.522!3d13.741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sMae%20Varee!5e0!3m2!1sen!2sth!4v1700000000000', 4.3, 12000, '{"monday":"10:00-22:00","tuesday":"10:00-22:00","wednesday":"10:00-22:00","thursday":"10:00-22:00","friday":"10:00-23:00","saturday":"10:00-23:00","sunday":"10:00-22:00"}', 'The mango sticky rice here is legendary — sweet, fragrant, and perfectly balanced. It''s the benchmark other places try to match.', 'Best in season (March-August) when mangoes are at their peak. Expect a 15-minute queue — it''s worth it.', 'Siam Paragon, MBK Center, Bangkok Art District', 'Inside Siam Discovery or near Siam BTS. Easy to combine with shopping.', '30 min', 'BTS, walking', false, true),
          ('Ayutthaya', 'Ayutthaya, Central Thailand', 'Ancient capital of Siam with dozens of atmospheric temple ruins spread across a UNESCO World Heritage site.', '/images/ayutthaya.jpg', 4.4, 'city', '$$', 'Mueang Chaiya, Ayutthaya 13000, Thailand', 14.3699, 100.5854, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37375.0!2d100.585!3d14.370!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sAyutthaya!5e0!3m2!1sen!2sth!4v1700000000000', 4.4, 92000, '{"monday":"Open 24h","tuesday":"Open 24h","wednesday":"Open 24h","thursday":"Open 24h","friday":"Open 24h","saturday":"Open 24h","sunday":"Open 24h"}', 'Pedal-powered trishaws and crumbling brick chedis — cycling through Ayutthaya''s ruins feels like stepping into a history film set.', 'Early morning (8-10 AM) to avoid tour buses and heat. Rent a bicycle to explore the spread-out ruins.', 'Wat Mahathat, Wat Chaiwatthanaram, Bang Pa-In Royal Palace', 'Day trip from Bangkok by train (1.5 hours) or organized tour.', 'Full day', 'Train, bicycle, tuk-tuk', false, true)
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
        await logUserAction(result[0].id, 'registration', `${name} registered a new account`)

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
        await logUserAction(user.id, 'login', `${user.name} logged in`)
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

  const destinationMatch = req.url.match(/^\/api\/destinations\/([^\/]+)$/)
  if (destinationMatch && req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM destinations WHERE id = $1', [destinationMatch[1]])
      if (result.length === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Destination not found' }))
        return
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result[0]))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Failed to fetch destination' }))
    }
    return
  }

  if (req.method === 'GET' && req.url.startsWith('/api/reviews')) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
    const { searchParams } = parsedUrl
    const destinationId = searchParams.get('destination_id')
    const userId = searchParams.get('user_id')

    // Only match exact /api/reviews path (no review ID)
    if (parsedUrl.pathname === '/api/reviews') {
      try {
        let sql = `
          SELECT r.*, u.name as user_name, d.name as destination_name
          FROM reviews r
          JOIN users u ON r.user_id = u.id
          JOIN destinations d ON r.destination_id = d.id
          WHERE r.status = 'approved'
        `
        const params = []
        if (destinationId) {
          params.push(destinationId)
          sql += ` AND r.destination_id = $${params.length}`
        }
        if (userId) {
          params.push(userId)
          sql += ` AND r.user_id = $${params.length}`
        }
        sql += ` ORDER BY r.created_at DESC`
        const result = await query(sql, params)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Failed to fetch reviews' }))
      }
      return
    }
  }

  if (req.url === '/api/reviews' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const auth = req.headers.authorization
        if (!auth || !auth.startsWith('Bearer ')) {
          res.writeHead(401, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Unauthorized' }))
          return
        }
        const token = auth.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)

        const { destination_id, rating, title, content } = JSON.parse(body)
        if (!destination_id || !rating || !title || !content) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'All fields are required' }))
          return
        }

        const result = await query(
          'INSERT INTO reviews (user_id, destination_id, rating, title, content) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [decoded.userId, destination_id, rating, title, content]
        )
        await logUserAction(decoded.userId, 'review_creation', `Created review for destination: ${title}`)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result[0]))
      } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Failed to create review' }))
      }
    })
    return
  }

  const reviewPutMatch = req.url.match(/^\/api\/reviews\/([^\/]+)$/)
  if (reviewPutMatch && req.method === 'PUT') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const auth = req.headers.authorization
        if (!auth || !auth.startsWith('Bearer ')) {
          res.writeHead(401, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Unauthorized' }))
          return
        }
        const token = auth.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)

        const { rating, title, content } = JSON.parse(body)
        const result = await query(
          'UPDATE reviews SET rating = $1, title = $2, content = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING *',
          [rating, title, content, reviewPutMatch[1], decoded.userId]
        )
        if (result.length === 0) {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Review not found' }))
          return
        }
        await logUserAction(decoded.userId, 'review_update', `Updated review: ${title}`)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result[0]))
      } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Failed to update review' }))
      }
    })
    return
  }

  const reviewDeleteMatch = req.url.match(/^\/api\/reviews\/([^\/]+)$/)
  if (reviewDeleteMatch && req.method === 'DELETE') {
    try {
      const auth = req.headers.authorization
      if (!auth || !auth.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Unauthorized' }))
        return
      }
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)

      const result = await query(
        'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING id',
        [reviewDeleteMatch[1], decoded.userId]
      )
      if (result.length === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Review not found' }))
        return
      }
      await logUserAction(decoded.userId, 'review_deletion', `Deleted review ID: ${reviewDeleteMatch[1]}`)
      res.writeHead(200, { 'Content-Type': 'application/json' })
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Failed to delete review' }))
    }
    return
  }

  if (req.url === '/api/admin/users' && req.method === 'GET') {
    try {
      const auth = req.headers.authorization
      if (!auth || !auth.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Unauthorized' }))
        return
      }
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const admin = await query('SELECT role FROM users WHERE id = $1', [decoded.userId])
      if (admin.length === 0 || admin[0].role !== 'admin') {
        res.writeHead(403, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Admin access required' }))
        return
      }

      const result = await query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC')
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Failed to fetch users' }))
    }
    return
  }

  const adminUserPutMatch = req.url.match(/^\/api\/admin\/users\/([^\/]+)$/)
  if (adminUserPutMatch && req.method === 'PUT') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const auth = req.headers.authorization
        if (!auth || !auth.startsWith('Bearer ')) {
          res.writeHead(401, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Unauthorized' }))
          return
        }
        const token = auth.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        const admin = await query('SELECT role FROM users WHERE id = $1', [decoded.userId])
        if (admin.length === 0 || admin[0].role !== 'admin') {
          res.writeHead(403, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Admin access required' }))
          return
        }

        const { role } = JSON.parse(body)
        const result = await query('UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role', [role, adminUserPutMatch[1]])
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result[0]))
      } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Failed to update user' }))
      }
    })
    return
  }

  if (req.url === '/api/admin/actions' && req.method === 'GET') {
    try {
      const auth = req.headers.authorization
      if (!auth || !auth.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Unauthorized' }))
        return
      }
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const admin = await query('SELECT role FROM users WHERE id = $1', [decoded.userId])
      if (admin.length === 0 || admin[0].role !== 'admin') {
        res.writeHead(403, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Admin access required' }))
        return
      }

      const result = await query(`
        SELECT ua.*, u.name as user_name
        FROM user_actions ua
        JOIN users u ON ua.user_id = u.id
        ORDER BY ua.created_at DESC
      `)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Failed to fetch actions' }))
    }
    return
  }

  if (req.url === '/api/admin/reviews' && req.method === 'GET') {
    try {
      const auth = req.headers.authorization
      if (!auth || !auth.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Unauthorized' }))
        return
      }
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const admin = await query('SELECT role FROM users WHERE id = $1', [decoded.userId])
      if (admin.length === 0 || admin[0].role !== 'admin') {
        res.writeHead(403, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Admin access required' }))
        return
      }

      const result = await query(`
        SELECT r.*, u.name as user_name, d.name as destination_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        JOIN destinations d ON r.destination_id = d.id
        ORDER BY r.created_at DESC
      `)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Failed to fetch reviews' }))
    }
    return
  }

  const adminReviewPutMatch = req.url.match(/^\/api\/admin\/reviews\/([^\/]+)$/)
  if (adminReviewPutMatch && req.method === 'PUT') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      try {
        const auth = req.headers.authorization
        if (!auth || !auth.startsWith('Bearer ')) {
          res.writeHead(401, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Unauthorized' }))
          return
        }
        const token = auth.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        const admin = await query('SELECT role FROM users WHERE id = $1', [decoded.userId])
        if (admin.length === 0 || admin[0].role !== 'admin') {
          res.writeHead(403, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Admin access required' }))
          return
        }

        const { status } = JSON.parse(body)
        const result = await query('UPDATE reviews SET status = $1 WHERE id = $2 RETURNING *', [status, adminReviewPutMatch[1]])
        if (result.length > 0) {
          await logUserAction(decoded.userId, `review_${status}`, `${status.charAt(0).toUpperCase() + status.slice(1)} review ID: ${adminReviewPutMatch[1]}`)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result[0]))
      } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Failed to moderate review' }))
      }
    })
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
