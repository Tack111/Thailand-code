import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDestinations } from '../services/destinations'

export default function LandingPage() {
  const [featuredPlaces, setFeaturedPlaces] = useState([])
  const [trendingPlaces, setTrendingPlaces] = useState([])
  const [foodSpots, setFoodSpots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getDestinations()
        setFeaturedPlaces(data.filter(p => p.is_featured && !['restaurant','street_food','cafe'].includes(p.category)).slice(0, 3))
        setTrendingPlaces(data.filter(p => p.is_trending && !['restaurant','street_food','cafe'].includes(p.category)).slice(0, 4))
        setFoodSpots(data.filter(p => ['restaurant','street_food','cafe'].includes(p.category) && p.is_featured).slice(0, 3))
      } catch (err) {
        console.error('Failed to fetch places:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaces()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/80 to-cyan-900/90"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('/images/hero.jpg')] bg-cover bg-center"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-emerald-500/30 backdrop-blur-sm rounded-full text-emerald-100 text-sm font-medium mb-6 border border-emerald-400/30"
          >
            Your Trusted Thailand Travel Guide
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the Real
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Thailand
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100 leading-relaxed">
            Curated places, honest reviews, and insider tips from real travelers.
            Plan your perfect trip to the Land of Smiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/places"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
            >
              Explore Places
            </Link>
            <Link
              to="/reviews"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 rounded-xl text-lg font-semibold transition-all hover:-translate-y-0.5"
            >
              Read Reviews
            </Link>
          </div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-200"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Verified Information
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Real Traveler Reviews
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Updated Regularly
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Places */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Featured Destinations</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Popular Places to Visit</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Hand-picked destinations loved by travelers. Each place is verified with real ratings and insider tips.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPlaces.map((place, i) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/places/${place.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={place.image_url || '/images/hero.jpg'}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-emerald-700">
                            {place.category || 'Attraction'}
                          </span>
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
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center text-amber-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <span className="ml-1 font-semibold">{place.rating || "4.5"}</span>
                          </div>
                          <span className="text-gray-400 text-sm">({place.google_review_count || "100+"} reviews)</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{place.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{place.why_visit || place.description}</p>
                        {place.location && (
                          <p className="text-gray-500 text-sm mt-3 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {place.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/places"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
            >
              View All Places
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      {trendingPlaces.length > 0 && (
        <section className="py-20 px-4 bg-emerald-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-emerald-300 font-semibold text-sm uppercase tracking-wider">Trending Now</span>
              <h2 className="text-4xl font-bold text-white mt-2">Best Spots This Season</h2>
              <p className="text-emerald-100 mt-4 max-w-2xl mx-auto">
                Discover what's popular right now. These places are getting attention from travelers this season.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {trendingPlaces.map((place, i) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                   <Link to={`/places/${place.id}`} className="group block">
                     <div className="relative overflow-hidden rounded-xl">
                       <div className="aspect-square overflow-hidden">
                         <img
                           src={place.image_url || '/images/hero.jpg'}
                           alt={place.name}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                       </div>
                       {place.price_range && (
                         <div className="absolute top-3 right-3">
                           <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                             {place.price_range}
                           </span>
                         </div>
                       )}
                       <div className="absolute bottom-0 left-0 right-0 p-4">
                         <span className="text-xs text-emerald-300 font-medium">Trending</span>
                         <h3 className="text-lg font-bold text-white">{place.name}</h3>
                         <p className="text-gray-300 text-sm">{place.location}</p>
                       </div>
                     </div>
                   </Link>
                </motion.div>
              ))}
            </div>
          </div>
         </section>
       )}

      {/* Food Highlights Section */}
      {foodSpots.length > 0 && (
        <section className="py-20 px-4 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Food Guide</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Taste Thailand</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Hand-picked food spots curated by locals — from Bangkok hole-in-the-walls to Chiang Mai hidden gems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {foodSpots.map((place, i) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/places/${place.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={place.image_url || '/images/hero.jpg'}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium
                            ${place.category === 'street_food' ? 'text-red-700'
                              : place.category === 'restaurant' ? 'text-emerald-700'
                              : 'text-amber-700'}`}>
                            {place.category === 'street_food' ? 'Street Food'
                              : place.category === 'restaurant' ? 'Restaurant'
                              : 'Cafe'}
                          </span>
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
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          <span className="ml-1 font-semibold">{place.google_review_rating || place.rating || '4.5'}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{place.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {place.location}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">{place.why_visit || place.description}</p>
                        {place.must_try_dishes && (
                          <p className="text-xs text-amber-700 mt-2 italic line-clamp-1">Must-try: {place.must_try_dishes}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/food"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors"
              >
                Explore Food Guide
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Why Trust Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Your Reliable Travel Companion</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '✓', title: 'Verified Info', desc: 'All places are verified with accurate prices, hours, and locations.' },
              { icon: '★', title: 'Real Ratings', desc: 'Authentic reviews from real travelers who visited these places.' },
              { icon: '🕐', title: 'Updated Daily', desc: 'We keep our information fresh and up-to-date for you.' },
              { icon: '💡', title: 'Local Tips', desc: 'Insider knowledge to help you experience Thailand like a local.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-emerald-50 border border-emerald-100"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore Thailand?</h2>
          <p className="text-emerald-100 text-lg mb-8">
            Join thousands of travelers who trust us to plan their perfect Thai adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-emerald-700 hover:bg-gray-100 rounded-xl text-lg font-semibold transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/places"
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-500 rounded-xl text-lg font-semibold transition-colors"
            >
              Browse Places
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
