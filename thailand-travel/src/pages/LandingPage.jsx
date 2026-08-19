import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-dark-blue to-light-blue">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/hero.jpg')] bg-cover bg-center"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Discover Thailand</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Explore breathtaking destinations, read authentic reviews, and plan your perfect trip to the Land of Smiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/places"
              className="bg-brown hover:bg-light-brown px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Explore Places
            </Link>
            <Link
              to="/reviews"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-dark-blue px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Read Reviews
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-dark-blue mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Curated Destinations', desc: 'Hand-picked places across Thailand with detailed guides and insider tips.' },
              { title: 'Authentic Reviews', desc: 'Real experiences from travelers who have explored these destinations.' },
              { title: 'Easy Planning', desc: 'Everything you need to plan your perfect Thai adventure in one place.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-brown mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
