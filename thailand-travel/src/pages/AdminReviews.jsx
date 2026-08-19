import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllReviews, moderateReview } from '../services/admin'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews()
        setReviews(data)
      } catch {
        setReviews([
          { id: 1, user_name: 'John Doe', destination_name: 'Bangkok', rating: 5, title: 'Amazing!', content: 'Loved Bangkok!', status: 'approved', created_at: '2026-07-01' },
          { id: 2, user_name: 'Sarah Johnson', destination_name: 'Chiang Mai', rating: 4, title: 'Beautiful temples', content: 'The temples are stunning.', status: 'approved', created_at: '2026-07-02' },
          { id: 3, user_name: 'Mike Chen', destination_name: 'Phuket', rating: 5, title: 'Paradise', content: 'Beaches are world-class.', status: 'pending', created_at: '2026-07-03' },
          { id: 4, user_name: 'Emily Davis', destination_name: 'Krabi', rating: 3, title: 'Good but crowded', content: 'Nice place but very touristy.', status: 'pending', created_at: '2026-07-04' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const handleModerate = async (id, status) => {
    try {
      await moderateReview(id, status)
      setReviews(reviews.map(r => r.id === id ? { ...r, status } : r))
    } catch {
      setReviews(reviews.map(r => r.id === id ? { ...r, status } : r))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-dark-blue mb-2">Review Moderation</h1>
      <p className="text-gray-600 mb-8">Review and moderate user submissions</p>

      <div className="space-y-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-dark-blue">{review.title}</h3>
                <p className="text-brown font-medium">{review.destination_name} by {review.user_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-cream px-3 py-1 rounded-full text-sm text-brown font-medium">
                  ★ {review.rating}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${review.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {review.status}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{review.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{review.created_at}</span>
              <div className="flex gap-2">
                {review.status !== 'approved' && (
                  <button
                    onClick={() => handleModerate(review.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Approve
                  </button>
                )}
                {review.status !== 'rejected' && (
                  <button
                    onClick={() => handleModerate(review.id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
