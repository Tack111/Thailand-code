const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(endpoint, options = {}) {
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
  return request('/api/admin/users')
}

export async function updateUserRole(userId, role) {
  return request(`/api/admin/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  })
}

export async function getUserActions() {
  return request('/api/admin/actions')
}

export async function getAllReviews() {
  return request('/api/admin/reviews')
}

export async function moderateReview(id, status) {
  return request(`/api/admin/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  })
}
