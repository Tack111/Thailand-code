import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Flame } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  region: string;
  cuisine: string;
  spiceLevel: string;
  mustTry: string[];
  description: string;
  image: string;
  rating: number;
  reviews: number;
}

const restaurants: Restaurant[] = [
  { id: 1, name: 'Som Tum Der', location: 'Bangkok', region: 'Central', cuisine: 'Thai Street Food', spiceLevel: 'Medium', mustTry: ['Som Tam', 'Larb Moo', 'Sticky Rice'], description: 'Authentic Northeastern Thai cuisine with bold flavors and fresh ingredients.', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', rating: 4.7, reviews: 892 },
  { id: 2, name: 'Ban Mai Rice Terrace', location: 'Chiang Mai', region: 'North', cuisine: 'Northern Thai', spiceLevel: 'Mild', mustTry: ['Khao Soi', 'Sai Oua', 'Nam Prik Noom'], description: 'Traditional Northern Thai dishes served in a beautiful garden setting.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', rating: 4.5, reviews: 543 },
  { id: 3, name: 'The Beach Bar', location: 'Phuket', region: 'South', cuisine: 'Seafood & Thai', spiceLevel: 'Mild', mustTry: ['Pad Thai', 'Tom Yum Goong', 'Grilled Fish'], description: 'Fresh seafood with stunning ocean views and refreshing cocktails.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80', rating: 4.6, reviews: 667 },
  { id: 4, name: 'Jok Prince', location: 'Bangkok', region: 'Central', cuisine: 'Thai Breakfast', spiceLevel: 'Mild', mustTry: ['Jok (Rice Porridge)', 'Kai Jow', 'Dim Sum'], description: 'Famous for its creamy rice porridge and steamed dumplings. A local institution.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', rating: 4.8, reviews: 1204 },
  { id: 5, name: 'Pattaya Seafood Market', location: 'Pattaya', region: 'Central', cuisine: 'Seafood', spiceLevel: 'Medium', mustTry: ['Grilled Prawns', 'Oyster Omelet', 'Green Curry'], description: 'Fresh catch of the day grilled to perfection right on the beach.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', rating: 4.4, reviews: 320 },
  { id: 6, name: 'Chiang Rai Night Bazaar', location: 'Chiang Rai', region: 'North', cuisine: 'Street Food', spiceLevel: 'Hot', mustTry: ['Sai Oua', 'Nam Prik Ong', 'Mango Sticky Rice'], description: 'A vibrant night market offering some of the best Northern Thai street food.', image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80', rating: 4.6, reviews: 445 },
];

const spiceColors: Record<string, string> = {
  Mild: 'text-emerald-600 bg-emerald-50',
  Medium: 'text-gold-600 bg-gold-50',
  Hot: 'text-orange-600 bg-orange-50',
  VeryHot: 'text-red-600 bg-red-50',
};

export default function FoodPage() {
  const [regionFilter, setRegionFilter] = useState('All');
  const [spiceFilter, setSpiceFilter] = useState('All');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);

  const filtered = restaurants.filter((restaurant) => {
    const matchesRegion = regionFilter === 'All' || restaurant.region === regionFilter || restaurant.location === regionFilter;
    const matchesSpice = spiceFilter === 'All' || restaurant.spiceLevel === spiceFilter;
    return matchesRegion && matchesSpice;
  });

  const openModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRestaurant(null), 300);
  };
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=1600&q=80"
          alt="Thai Food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/50 to-slate-dark/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Food & Dining</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Savor the bold, vibrant flavors of authentic Thai cuisine
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>All Regions</option>
            <option>Bangkok</option>
            <option>Chiang Mai</option>
            <option>Phuket</option>
          </select>
          <select
            value={spiceFilter}
            onChange={(e) => setSpiceFilter(e.target.value)}
            className="px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>All Spice Levels</option>
            <option>Mild</option>
            <option>Medium</option>
            <option>Hot</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 hover:shadow-xl transition-all"
            >
              <button
                onClick={() => openModal(restaurant)}
                className="block text-left w-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-dark text-xs font-semibold rounded-full">
                    {restaurant.cuisine}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    {restaurant.location}
                  </div>
                  <h3 className="text-xl font-bold text-slate-dark mb-2">{restaurant.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{restaurant.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="w-4 h-4 text-gold-500" />
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${spiceColors[restaurant.spiceLevel]}`}
                    >
                      {restaurant.spiceLevel}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-dark mb-2">Must Try:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(restaurant.mustTry) ? (
                        restaurant.mustTry.map((dish) => (
                          <span key={dish} className="px-3 py-1 bg-gold-50 text-gold-700 text-xs font-medium rounded-xl">
                            {dish}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 bg-gold-50 text-gold-700 text-xs font-medium rounded-xl">
                          {restaurant.mustTry}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                      <span className="font-semibold text-slate-dark">{restaurant.rating}</span>
                      <span className="text-slate-400 text-sm">({restaurant.reviews})</span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedRestaurant?.name || ''}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-slate-500 text-sm">Loading details...</p>
            </div>
          ) : selectedRestaurant ? (
            <div className="space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
                  {selectedRestaurant.cuisine}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  {selectedRestaurant.location}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{selectedRestaurant.description}</p>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-gold-500" />
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${spiceColors[selectedRestaurant.spiceLevel]}`}>
                  {selectedRestaurant.spiceLevel}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-dark mb-3">Must Try Dishes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRestaurant.mustTry.map((dish) => (
                    <span key={dish} className="px-4 py-2 bg-gold-50 text-gold-700 text-sm font-medium rounded-2xl">
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
                  <span className="font-semibold text-slate-dark text-lg">{selectedRestaurant.rating}</span>
                  <span className="text-slate-400 text-sm">({selectedRestaurant.reviews} reviews)</span>
                </div>
              </div>
            </div>
          ) : null}
        </Modal>
      </section>
    </div>
  );
}
