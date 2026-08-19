import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getDestinations } from '../services/destinations'

const destinations = [
  { id: 1, name: 'Bangkok', location: 'Bangkok, Central Thailand', description: 'The vibrant capital city with temples, markets, and amazing street food.', image_url: '/images/bangkok.jpg', rating: 4.5, category: 'destinations', details: 'Bangkok is a city of contrasts, where ancient temples stand alongside modern skyscrapers. Don\'t miss the Grand Palace, Wat Arun, and the floating markets.' },
  { id: 2, name: 'Chiang Mai', location: 'Chiang Mai, Northern Thailand', description: 'Cultural hub surrounded by mountains, temples, and lush jungles.', image_url: '/images/chiangmai.jpg', rating: 4.8, category: 'destinations', details: 'Chiang Mai offers a relaxed atmosphere with over 300 temples, ethical elephant sanctuaries, and the famous Sunday Walking Street.' },
  { id: 3, name: 'Phuket', location: 'Phuket, Southern Thailand', description: 'Thailand\'s largest island with beautiful beaches and vibrant nightlife.', image_url: '/images/phuket.jpg', rating: 4.6, category: 'destinations', details: 'Phuket boasts pristine beaches like Patong, Kata, and Nai Harn, plus a vibrant old town with Sino-Portuguese architecture.' },
  { id: 4, name: 'Krabi', location: 'Krabi, Southern Thailand', description: 'Stunning limestone cliffs, clear waters, and incredible diving spots.', image_url: '/images/krabi.jpg', rating: 4.7, category: 'destinations', details: 'Krabi is famous for Railay Beach, accessible only by boat, and offers world-class rock climbing, island hopping, and stunning sunsets.' },
  { id: 5, name: 'Ayutthaya', location: 'Ayutthaya, Central Thailand', description: 'Ancient capital with magnificent temple ruins and UNESCO World Heritage sites.', image_url: '/images/ayutthaya.jpg', rating: 4.4, category: 'destinations', details: 'Ayutthaya was once the thriving capital of Siam. Today, you can explore the UNESCO-listedHistorical Park by bicycle or boat.' },
  { id: 6, name: 'Koh Samui', location: 'Koh Samui, Surat Thani', description: 'Tropical paradise with palm-fringed beaches and luxury resorts.', image_url: '/images/kohsamui.jpg', rating: 4.5, category: 'destinations', details: 'Koh Samui combines natural beauty with luxury. Visit the Big Buddha, Na Muang waterfalls, and enjoy fresh seafood at beachfront restaurants.' },
]

const foodPlaces = [
  { id: 101, name: 'Jay Fai', location: '327 Mahachai Rd, Bangkok', description: 'Michelin-starred street food legendary for crab omelette and Pad Kee Mao.', image_url: '/images/jayfai.jpg', rating: 4.9, category: 'food', details: 'Jay Fai is a Bangkok street food institution. Famous for its fiery crab omelette, Pad Kee Mao, and other Thai classics cooked on a massive wok.' },
  { id: 102, name: 'Khao Soi Khun Yai', location: 'Chang Phueak, Chiang Mai', description: 'The best khao soi in Chiang Mai, a rich coconut curry noodle soup.', image_url: '/images/khaosoi.jpg', rating: 4.8, category: 'food', details: 'This family-run stall serves creamy, tangy khao soi with tender chicken, topped with crispy noodles, pickled mustard greens, and lime.' },
  { id: 103, name: 'Ta Khrai', location: 'Ao Nang, Krabi', description: 'Fresh grilled seafood on the beach with stunning sunset views.', image_url: '/images/takhrai.jpg', rating: 4.7, category: 'food', details: 'Enjoy freshly caught grilled fish, prawns, and squid right on the sand at Ao Nang Beach, with the sun setting behind the limestone cliffs.' },
  { id: 104, name: 'Roti Pairam', location: 'Ayutthaya Historical Park, Ayutthaya', description: 'Famous crispy roti with banana and condensed milk, an Ayutthaya specialty.', image_url: '/images/rotipairam.jpg', rating: 4.6, category: 'food', details: 'This legendary roti vendor has been serving crispy, flaky roti stuffed with banana and drizzled with condensed milk for decades.' },
]

const tourismSpots = [
  { id: 201, name: 'Doi Suthep', location: 'Doi Suthep, Chiang Mai', description: 'Sacred temple on a mountain with panoramic views of Chiang Mai city.', image_url: '/images/doisuthep.jpg', rating: 4.8, category: 'tourism', details: 'Wat Phra That Doi Suthep is one of northern Thailand\'s most sacred temples. The 306-step Naga staircase leads to golden chedis with stunning city views.' },
  { id: 202, name: 'Railay Beach', location: 'Railay, Krabi', description: 'A tropical paradise accessible only by boat, famous for rock climbing.', image_url: '/images/railay.jpg', rating: 4.9, category: 'tourism', details: 'Railay Beach is a secluded peninsula with towering limestone cliffs, turquoise waters, and some of the best rock climbing in the world.' },
  { id: 203, name: 'Big Buddha', location: 'Big Buddha Temple, Koh Samui', description: 'A 12-meter golden Buddha statue overlooking the island.', image_url: '/images/bigbuddha.jpg', rating: 4.7, category: 'tourism', details: 'The Big Buddha temple offers panoramic views and a serene atmosphere. The golden statue is visible from kilometers away and is a must-visit on Koh Samui.' },
  { id: 204, name: 'Wat Mahathat', location: 'Ayutthaya Historical Park, Ayutthaya', description: 'Famous for the iconic Buddha head entwined in tree roots.', image_url: '/images/watmahathat.jpg', rating: 4.6, category: 'tourism', details: 'The most photographed site in Ayutthaya, this ancient temple features a sandstone Buddha head nestled in the roots of a banyan tree.' },
]

const allPlaces = [...destinations, ...foodPlaces, ...tourismSpots]

export default function PlacesPage() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations()
        setPlaces(data)
      } catch {
        setPlaces(destinations)
      } finally {
        setLoading(false)
      }
    }
    fetchDestinations()
  }, [])

  const filteredPlaces = filter === 'all' ? allPlaces : allPlaces.filter(p => p.category === filter)

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Thailand</h1>
          <p className="text-xl text-gray-200">Discover destinations, food, and tourism spots</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[
            { key: 'all', label: 'All Places' },
            { key: 'destinations', label: 'Destinations' },
            { key: 'food', label: 'Food & Dining' },
            { key: 'tourism', label: 'Tourism Spots' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-brown text-white'
                  : 'bg-white text-dark-blue hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(filter === 'all' ? allPlaces : filteredPlaces).map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPlace(place)}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img src={place.image_url} alt={place.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-dark-blue">{place.name}</h3>
                  <span className="bg-brown text-white px-2 py-1 rounded text-sm">★ {place.rating}</span>
                </div>
                <p className="text-brown font-medium mb-2">{place.location}</p>
                <p className="text-gray-600">{place.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPlace.image_url} alt={selectedPlace.name} className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-dark-blue">{selectedPlace.name}</h2>
                  <span className="bg-brown text-white px-3 py-1 rounded">★ {selectedPlace.rating}</span>
                </div>
                <p className="text-brown font-medium mb-4">{selectedPlace.location}</p>
                <p className="text-gray-600 mb-6">{selectedPlace.details || selectedPlace.description}</p>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="bg-dark-blue hover:bg-light-blue text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
