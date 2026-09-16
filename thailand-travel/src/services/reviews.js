const isProduction = import.meta.env.PROD
const API_BASE = isProduction ? '/.netlify/functions/api' : ''

async function request(path, options = {}) {
  const endpoint = isProduction ? path : `/api${path}`
  const url = `${API_BASE}${endpoint}`
  const token = localStorage.getItem('token')
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

export async function getReviews() {
  return request('/reviews')
}

export async function getDestinationReviews(destinationId) {
  return request(`/reviews?destination_id=${destinationId}`)
}

export async function getUserReviews(userId) {
  return request(`/reviews?user_id=${userId}`)
}

export async function createReview(reviewData) {
  return request('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  })
}

export async function updateReview(id, reviewData) {
  return request(`/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify(reviewData),
  })
}

export async function deleteReview(id) {
  return request(`/reviews/${id}`, {
    method: 'DELETE',
  })
}
