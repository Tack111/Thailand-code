import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Pool } = pg
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
const DATABASE_URL = process.env.NEON_DB || process.env.NEON_DATABASE_URL

let pool = null
if (DATABASE_URL) {
  pool = new Pool({ connectionString: DATABASE_URL })
}

async function query(text, params) {
  const res = await pool.query(text, params)
  return res.rows
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    },
    body: JSON.stringify(body),
  }
}

export const handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/api', '')
  const method = event.httpMethod

  if (method === 'OPTIONS') {
    return jsonResponse(204, {})
  }

  if (!pool) {
    return jsonResponse(500, { message: 'Database not configured' })
  }

  let body = {}
  if (event.body) {
    try {
      body = JSON.parse(event.body)
    } catch {
      return jsonResponse(400, { message: 'Invalid JSON' })
    }
  }

  try {
    if (path === '/auth/register' && method === 'POST') {
      const { name, email, password } = body
      if (!name || !email || !password) {
        return jsonResponse(400, { message: 'Name, email and password are required' })
      }

      const existing = await query('SELECT id FROM users WHERE email = $1', [email])
      if (existing.length > 0) {
        return jsonResponse(409, { message: 'Email already registered' })
      }

      const password_hash = await bcrypt.hash(password, 10)
      const result = await query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role',
        [name, email, password_hash]
      )

      const token = jwt.sign({ userId: result[0].id, email: result[0].email }, JWT_SECRET, { expiresIn: '7d' })
      return jsonResponse(201, { user: result[0], token })
    }

    if (path === '/auth/login' && method === 'POST') {
      const { email, password } = body
      const result = await query('SELECT id, name, email, password_hash, role FROM users WHERE email = $1', [email])
      if (result.length === 0) {
        return jsonResponse(401, { message: 'Invalid credentials' })
      }

      const user = result[0]
      const valid = await bcrypt.compare(password, user.password_hash)
      if (!valid) {
        return jsonResponse(401, { message: 'Invalid credentials' })
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
      const { password_hash, ...safeUser } = user
      return jsonResponse(200, { user: safeUser, token })
    }

    if (path === '/auth/profile' && method === 'GET') {
      const auth = event.headers.authorization
      if (!auth || !auth.startsWith('Bearer ')) {
        return jsonResponse(401, { message: 'Unauthorized' })
      }

      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const result = await query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.userId])
      if (result.length === 0) {
        return jsonResponse(404, { message: 'User not found' })
      }
      return jsonResponse(200, { user: result[0] })
    }

    if (path === '/destinations' && method === 'GET') {
      const result = await query('SELECT * FROM destinations ORDER BY created_at DESC')
      return jsonResponse(200, result)
    }

    return jsonResponse(404, { message: 'Not Found' })
  } catch (err) {
    console.error('Function error:', err.message)
    return jsonResponse(500, { message: 'Server error', error: err.message })
  }
}
