import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { destinations } from '@/data/destinations';
import type { Destination } from '@/data/destinations';
import DestinationModal from '@/components/destination/DestinationModal';

export default function DestinationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = destinations.filter((dest) => {
    const matchesSearch =
      !searchQuery ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === 'All' || dest.region === regionFilter;
    const matchesType = typeFilter === 'All' || dest.type === typeFilter;
    return matchesSearch && matchesRegion && matchesType;
  });

  const openModal = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDestination(null), 300);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&q=80"
          alt="Destinations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/50 to-slate-dark/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Destinations</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Explore Thailand's most beautiful places across every region
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations..."
            className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>All Regions</option>
            <option>North</option>
            <option>South</option>
            <option>Central</option>
            <option>Northeast</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>All Types</option>
            <option>Beach</option>
            <option>Mountain</option>
            <option>Waterfall</option>
            <option>Island</option>
            <option>Nature</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <button
                onClick={() => openModal(dest)}
                className="block text-left w-full"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/30 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {dest.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      {dest.region}
                    </div>
                    <h3 className="text-xl font-bold text-slate-dark mb-2 group-hover:text-emerald-600 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{dest.short}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                        <span className="font-semibold text-slate-dark text-sm">{dest.rating}</span>
                      </div>
                      <span className="text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all">
                        View details →
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No destinations found matching your criteria.</p>
          </div>
        )}
      </section>

      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
