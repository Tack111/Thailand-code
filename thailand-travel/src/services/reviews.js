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

export async function getReviews() {
  return request('/api/reviews')
}

export async function getDestinationReviews(destinationId) {
  return request(`/api/reviews?destination_id=${destinationId}`)
}

export async function createReview(reviewData) {
  return request('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  })
}

export async function updateReview(id, reviewData) {
  return request(`/api/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify(reviewData),
  })
}

export async function deleteReview(id) {
  return request(`/api/reviews/${id}`, {
    method: 'DELETE',
  })
}
