const isProduction = import.meta.env.PROD
const API_BASE = isProduction ? '/.netlify/functions/api' : ''

async function request(path, options = {}) {
  const endpoint = isProduction ? path : `/api${path}`
  const url = `${API_BASE}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

export async function register(name, email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export async function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getProfile() {
  return request('/auth/profile')
}
