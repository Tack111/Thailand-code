import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const destinations = [
  { id: 1, name: 'Railay Beach', region: 'South', type: 'Beach', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', short: 'Crystal clear waters and towering limestone cliffs paradise.', description: 'Railay Beach is a small peninsula accessible only by boat due to the high limestone cliffs cutting it off from the mainland. It offers stunning beaches, rock climbing, and a relaxed atmosphere.', bestTime: 'November to April', cost: '$50-150/day', activities: ['Rock Climbing', 'Kayaking', 'Snorkeling', 'Sunset Views'], rating: 4.8, location: { lat: 8.0062, lng: 98.8355, address: 'Krabi, Thailand' } },
  { id: 2, name: 'Doi Inthanon', region: 'North', type: 'Mountain', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80', short: "Thailand's highest peak with stunning waterfalls and cool climate.", description: "Doi Inthanon is Thailand's highest mountain at 2,565 meters. It features lush forests, stunning waterfalls like Wachirathan, and the famous royal pagodas.", bestTime: 'December to February', cost: '$30-80/day', activities: ['Hiking', 'Waterfall Visits', 'Bird Watching', 'Cultural Tours'], rating: 4.7, location: { lat: 18.5865, lng: 98.4868, address: 'Chiang Mai, Thailand' } },
  { id: 3, name: 'Phi Phi Islands', region: 'South', type: 'Island', image: 'https://images.unsplash.com/photo-1589519160732-57fc835526d7?w=800&q=80', short: 'Tropical paradise with vibrant marine life and stunning sunsets.', description: 'The Phi Phi Islands are a group of six islands known for their stunning beaches, crystal-clear water, and vibrant nightlife. Maya Bay, featured in "The Beach," is a must-visit.', bestTime: 'November to April', cost: '$60-200/day', activities: ['Snorkeling', 'Scuba Diving', 'Island Hopping', 'Beach Relaxation'], rating: 4.9, location: { lat: 7.7407, lng: 98.7784, address: 'Krabi, Thailand' } },
  { id: 4, name: 'Erawan Falls', region: 'West', type: 'Waterfall', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cbaa5a07?w=800&q=80', short: 'Seven-tiered turquoise waterfall in lush jungle setting.', description: 'Erawan National Park is home to the famous seven-tiered Erawan Waterfall, named after the three-headed elephant of Hindu mythology. Each tier offers a unique emerald pool perfect for swimming.', bestTime: 'July to October', cost: '$25-60/day', activities: ['Swimming', 'Hiking', 'Wildlife Watching', 'Photography'], rating: 4.6, location: { lat: 14.2144, lng: 99.0547, address: 'Kanchanaburi, Thailand' } },
  { id: 5, name: 'Chiang Rai', region: 'North', type: 'Nature', image: 'https://images.unsplash.com/photo-1528183428842-22f1bd55c7ee?w=800&q=80', short: 'Cultural gem with the stunning White Temple and Golden Triangle.', description: 'Chiang Rai offers a mix of cultural experiences and natural beauty. Visit the White Temple (Wat Rong Khun), the Golden Triangle, and explore hill tribe villages.', bestTime: 'October to February', cost: '$35-90/day', activities: ['Temple Tours', 'River Cruises', 'Cultural Experiences', 'Shopping'], rating: 4.5, location: { lat: 19.9070, lng: 99.8310, address: 'Chiang Rai, Thailand' } },
  { id: 6, name: 'Koh Tao', region: 'South', type: 'Island', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80', short: 'Diver\'s paradise with crystal clear waters and vibrant coral reefs.', description: 'Koh Tao is a small island known for its excellent diving and snorkeling opportunities. It is one of the best places in the world to get certified as a diver.', bestTime: 'January to April', cost: '$40-120/day', activities: ['Scuba Diving', 'Snorkeling', 'Kayaking', 'Sunset Views'], rating: 4.7, location: { lat: 10.0995, lng: 99.8383, address: 'Surat Thani, Thailand' } },
];

export default function DestinationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

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
              <Link to={`/destinations/${dest.id}`} className="block">
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
                        Learn more →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No destinations found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}
