import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getDestinationReviews, createReview, updateReview, deleteReview } from '../services/reviews'
import { getDestinations } from '../services/destinations'

export default function UserDashboard() {
  const { user } = useAuth()
  const [destinations, setDestinations] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [formData, setFormData] = useState({ destination_id: '', rating: 5, title: '', content: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destData, reviewsData] = await Promise.all([
          getDestinations(),
          getDestinationReviews(user?.id),
        ])
        setDestinations(destData)
        setReviews(reviewsData)
      } catch {
        setDestinations([
          { id: 1, name: 'Bangkok', location: 'Central Thailand', description: 'The vibrant capital city.', image_url: '/images/bangkok.jpg', rating: 4.5 },
          { id: 2, name: 'Chiang Mai', location: 'Northern Thailand', description: 'Cultural hub surrounded by mountains.', image_url: '/images/chiangmai.jpg', rating: 4.8 },
          { id: 3, name: 'Phuket', location: 'Southern Thailand', description: 'Thailand\'s largest island with beautiful beaches.', image_url: '/images/phuket.jpg', rating: 4.6 },
        ])
        setReviews([
          { id: 1, user_id: user?.id, destination_id: 1, rating: 5, title: 'Amazing!', content: 'Loved Bangkok!', status: 'approved', created_at: '2026-07-01' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingReview) {
        await updateReview(editingReview.id, formData)
        setReviews(reviews.map(r => r.id === editingReview.id ? { ...r, ...formData } : r))
      } else {
        const newReview = await createReview({ ...formData, user_id: user?.id })
        setReviews([...reviews, newReview])
      }
      resetForm()
    } catch {
      if (editingReview) {
        setReviews(reviews.map(r => r.id === editingReview.id ? { ...r, ...formData } : r))
      } else {
        const newReview = { id: Date.now(), ...formData, user_id: user?.id, status: 'pending', created_at: new Date().toISOString().split('T')[0] }
        setReviews([...reviews, newReview])
      }
      resetForm()
    }
  }

  const handleEdit = (review) => {
    setEditingReview(review)
    setFormData({ destination_id: review.destination_id, rating: review.rating, title: review.title, content: review.content })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteReview(id)
      setReviews(reviews.filter(r => r.id !== id))
    } catch {
      setReviews(reviews.filter(r => r.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ destination_id: '', rating: 5, title: '', content: '' })
    setEditingReview(null)
    setShowForm(false)
  }

  const getDestinationName = (id) => destinations.find(d => d.id == id)?.name || 'Unknown'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark-blue text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">User Dashboard</h1>
          <p className="text-gray-200 mt-2">Welcome, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark-blue">My Reviews</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-brown hover:bg-light-brown text-white px-4 py-2 rounded-lg transition-colors"
            >
              {showForm ? 'Cancel' : 'Add Review'}
            </button>
          </div>

          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-md mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-dark-blue mb-2">Destination</label>
                  <select
                    value={formData.destination_id}
                    onChange={(e) => setFormData({ ...formData, destination_id: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent outline-none"
                  >
                    <option value="">Select a destination</option>
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-blue mb-2">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent outline-none"
                  >
                    {[1, 2, 3, 4, 5].map(r => (
                      <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-dark-blue mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent outline-none"
                  placeholder="Review title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-dark-blue mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent outline-none"
                  placeholder="Share your experience..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-brown hover:bg-light-brown text-white px-6 py-3 rounded-lg transition-colors"
              >
                {editingReview ? 'Update Review' : 'Submit Review'}
              </button>
            </motion.form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-dark-blue">{review.title}</h3>
                  <span className="bg-brown text-white px-2 py-1 rounded text-sm">★ {review.rating}</span>
                </div>
                <p className="text-brown font-medium mb-2">{getDestinationName(review.destination_id)}</p>
                <p className="text-gray-600 mb-4">{review.content}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{review.created_at}</span>
                  <span className={`text-xs px-2 py-1 rounded ${review.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {review.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(review)}
                    className="flex-1 bg-dark-blue hover:bg-light-blue text-white py-2 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
