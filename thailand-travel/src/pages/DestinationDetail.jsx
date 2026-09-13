import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getDestination } from '../services/destinations'

export default function DestinationDetail() {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await getDestination(id)
        setPlace(data)
      } catch (err) {
        console.error('Failed to fetch place:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPlace()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
          <Link to="/places" className="text-emerald-600 hover:text-emerald-700">← Back to places</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={place.image_url || '/images/hero.jpg'}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link to="/places" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Places
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{place.name}</h1>
            <p className="text-xl text-white/80">{place.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why Visit */}
            {place.why_visit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100"
              >
                <h2 className="text-lg font-bold text-emerald-800 mb-2">✨ Why Visit</h2>
                <p className="text-emerald-700">{place.why_visit}</p>
              </motion.div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{place.description}</p>
            </div>

            {/* Best Time to Visit */}
            {place.best_time_to_visit && (
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <h2 className="text-lg font-bold text-amber-800 mb-2">🕐 Best Time to Visit</h2>
                <p className="text-amber-700">{place.best_time_to_visit}</p>
              </div>
            )}

            {/* Travel Tips */}
            {place.travel_tips && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h2 className="text-lg font-bold text-blue-800 mb-2">💡 Travel Tips</h2>
                <p className="text-blue-700">{place.travel_tips}</p>
              </div>
            )}

            {/* Google Map */}
            {place.google_map_embed && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={place.google_map_embed}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${place.name}`}
                  ></iframe>
                </div>
              </div>
            )}

            {/* Nearby Attractions */}
            {place.nearby_attractions && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Attractions</h2>
                <p className="text-gray-700">{place.nearby_attractions}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-8 h-8" fill={i < Math.round(place.rating || 0) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <div className="text-3xl font-bold text-gray-900">{place.rating || '4.5'}</div>
                <p className="text-gray-500">{place.google_review_count || '100+'} reviews</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                {place.category && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-900 capitalize">{place.category}</span>
                  </div>
                )}
                {place.price_range && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price Range</span>
                    <span className="font-medium text-gray-900">{place.price_range}</span>
                  </div>
                )}
                {place.visit_duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Visit Duration</span>
                    <span className="font-medium text-gray-900">{place.visit_duration}</span>
                  </div>
                )}
              </div>

              {place.last_updated && (
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">Last updated: {place.last_updated}</p>
                </div>
              )}
            </div>

            {/* Opening Hours */}
            {place.opening_hours && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Opening Hours</h3>
                <div className="space-y-2">
                  {Object.entries(place.opening_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-500 capitalize">{day}</span>
                      <span className="text-gray-900">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transport Options */}
            {place.transport_options && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">How to Get There</h3>
                <p className="text-gray-700 text-sm">{place.transport_options}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
