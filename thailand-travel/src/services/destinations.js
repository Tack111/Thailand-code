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

export async function getDestinations() {
  return request('/destinations')
}

export async function getDestination(id) {
  return request(`/destinations/${id}`)
}
