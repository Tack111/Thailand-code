import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getDestinations } from '../services/destinations'

const foodCategories = [
  { key: 'all', label: 'All Food', icon: '🍜' },
  { key: 'street_food', label: 'Street Food', icon: '🍢' },
  { key: 'restaurant', label: 'Restaurants', icon: '🍽️' },
  { key: 'cafe', label: 'Cafes & Desserts', icon: '☕' },
]

export default function FoodPage() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getDestinations()
        const foodSpots = data.filter(p =>
          p.category === 'street_food' || p.category === 'restaurant' || p.category === 'cafe'
        )
        setPlaces(foodSpots)
      } catch (err) {
        console.error('Failed to fetch food spots:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaces()
  }, [])

  const filtered = places.filter(place => {
    const matchesCategory = category === 'all' || place.category === category
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = priceFilter === 'all' || place.price_range === priceFilter
    return matchesCategory && matchesSearch && matchesPrice
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Thai Food Guide</h1>
          <p className="text-xl text-emerald-100 mb-8">
            Curated food spots — from Bangkok hole-in-the-walls to Chiang Mai hidden gems.
            These are the places where locals actually eat.
          </p>
          <div className="max-w-2xl">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search dishes, spots, neighborhoods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {foodCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat.key
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-48">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Price Range</h3>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Prices</option>
              <option value="$">Budget ($)</option>
              <option value="$$">Mid-range ($$)</option>
              <option value="$$$">Upscale ($$$)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filtered.length}</span> food spots
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No food spots found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((place, i) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/places/${place.id}`} className="group block">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={place.image_url || '/images/hero.jpg'}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm
                          ${place.category === 'street_food' ? 'text-red-700'
                            : place.category === 'restaurant' ? 'text-emerald-700'
                            : 'text-amber-700'}`}>
                          {place.category === 'street_food' ? 'Street Food'
                            : place.category === 'restaurant' ? 'Restaurant'
                            : 'Cafe'}
                        </span>
                        {place.is_trending && (
                          <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
                            🔥 Trending
                          </span>
                        )}
                      </div>
                      {place.price_range && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                            {place.price_range}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-dark-blue group-hover:text-emerald-600 transition-colors">
                          {place.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold text-sm">{place.google_review_rating || place.rating || '4.5'}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {place.location}
                      </p>

                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {place.why_visit || place.description}
                      </p>

                      {place.must_try_dishes && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-3">
                          <p className="text-xs font-semibold text-amber-800 uppercase mb-1">Must-try dishes</p>
                          <p className="text-sm text-amber-800">{place.must_try_dishes}</p>
                        </div>
                      )}

                      {place.opening_hours && (
                        <div className="text-xs text-gray-500 mb-3">
                          <span className="font-medium">Hours:</span>{' '}
                          {place.opening_hours.monday}
                        </div>
                      )}

                      {place.price_range && (
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Price:</span> {place.price_range}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
