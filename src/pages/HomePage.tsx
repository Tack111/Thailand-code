import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '@/data/destinations';
import type { Destination } from '@/data/destinations';
import DestinationModal from '@/components/destination/DestinationModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDestination(null), 300);
  };
  return (
    <div className="min-h-screen">
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/40 via-slate-dark/20 to-slate-dark/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1558005195-31b8e6d23f1d?w=1600&q=80"
          alt="Thailand beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Discover Thailand
            <span className="block text-emerald-400">Like Never Before</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Explore pristine beaches, ancient temples, vibrant cities, and breathtaking nature. Your dream vacation awaits.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-2 max-w-3xl mx-auto shadow-2xl"
          >
            <form action="/search" method="get" className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search destinations, activities, regions..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-dark placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-2xl shadow-lg transition-all"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark mb-4">
            Featured Destinations
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-500 text-lg max-w-2xl mx-auto">
            Handpicked places that will take your breath away
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <button
                onClick={() => openModal(dest)}
                className="block text-left w-full"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4 shadow-lg shadow-slate-200">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-2">
                      {dest.type}
                    </span>
                    <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {dest.region}
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold text-emerald-600 border-2 border-emerald-500 rounded-2xl hover:bg-emerald-50 transition-all"
          >
            View All Destinations
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark mb-4">
              Why Choose Us
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌴',
                title: 'Curated Experiences',
                desc: 'Hand-selected destinations and activities for unforgettable memories.',
              },
              {
                icon: '⭐',
                title: 'Verified Reviews',
                desc: 'Real traveler reviews and honest ratings you can trust.',
              },
              {
                icon: '🗺️',
                title: 'Interactive Maps',
                desc: 'Explore locations visually with our integrated map system.',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-dark mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
