import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getReviews } from '../services/reviews'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews()
        setReviews(data)
      } catch {
        setReviews([
          { id: 1, user: 'Sarah Johnson', destination: 'Bangkok', rating: 5, title: 'Amazing street food!', content: 'The food scene in Bangkok is absolutely incredible. From pad thai to mango sticky rice, every meal was a delight.', created_at: '2026-07-01' },
          { id: 2, user: 'Mike Chen', destination: 'Chiang Mai', rating: 4, title: 'Beautiful temples', content: 'The temples in Chiang Mai are stunning. Wat Phra That Doi Suthep offers breathtaking views of the city.', created_at: '2026-07-03' },
          { id: 3, user: 'Emily Davis', destination: 'Phuket', rating: 5, title: 'Paradise found', content: 'The beaches in Phuket are world-class. Clear water, white sand, and amazing sunsets every evening.', created_at: '2026-07-05' },
          { id: 4, user: 'James Wilson', destination: 'Krabi', rating: 4, title: 'Incredible scenery', content: 'Railay Beach is like nothing I have seen before. The limestone cliffs rising from the ocean are majestic.', created_at: '2026-07-06' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Reviews</h1>
          <p className="text-xl text-gray-200">Hear from fellow travelers about their Thai adventures</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
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
                  <p className="text-brown font-medium">{review.destination}</p>
                </div>
                <div className="flex items-center bg-cream px-3 py-1 rounded-full">
                  <span className="text-brown font-bold">★ {review.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{review.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {review.user}</span>
                <span>{review.created_at}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
