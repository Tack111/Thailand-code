import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';

const allDestinations = [
  { id: 1, name: 'Railay Beach', region: 'South', type: 'Beach', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', short: 'Crystal clear waters and towering limestone cliffs.', rating: 4.8 },
  { id: 2, name: 'Doi Inthanon', region: 'North', type: 'Mountain', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80', short: "Thailand's highest peak with stunning waterfalls.", rating: 4.7 },
  { id: 3, name: 'Phi Phi Islands', region: 'South', type: 'Island', image: 'https://images.unsplash.com/photo-1589519160732-57fc835526d7?w=800&q=80', short: 'Tropical paradise with vibrant marine life.', rating: 4.9 },
  { id: 4, name: 'Erawan Falls', region: 'West', type: 'Waterfall', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cbaa5a07?w=800&q=80', short: 'Seven-tiered turquoise waterfall in lush jungle.', rating: 4.6 },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filtered = useMemo(() => {
    if (!query.trim()) return allDestinations;
    const lower = query.toLowerCase();
    return allDestinations.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.type.toLowerCase().includes(lower) ||
        item.region.toLowerCase().includes(lower) ||
        item.short.toLowerCase().includes(lower)
    );
  }, [query]);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Search className="w-6 h-6 text-emerald-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-dark">
            {query ? `Results for "${query}"` : 'Search Results'}
          </h1>
          <span className="text-slate-500 text-sm">({filtered.length} found)</span>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 shadow-lg shadow-slate-100 text-center">
            <p className="text-slate-500">No destinations match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 text-white text-xs font-semibold rounded-full">
                    {item.type}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    {item.region}
                  </div>
                  <h3 className="text-lg font-bold text-slate-dark mb-2">{item.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.short}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                    <span className="font-semibold text-slate-dark text-sm">{item.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
