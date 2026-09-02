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

export async function getAllUsers() {
  return request('/admin/users')
}

export async function updateUserRole(userId, role) {
  return request(`/admin/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  })
}

export async function getUserActions() {
  return request('/admin/actions')
}

export async function getAllReviews() {
  return request('/admin/reviews')
}

export async function moderateReview(id, status) {
  return request(`/admin/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })
}
