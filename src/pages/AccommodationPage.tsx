import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Accommodation {
  id: number;
  name: string;
  type: string;
  price: string;
  priceLevel: string;
  rating: number;
  reviews: number;
  location: string;
  amenities: string[];
  image: string;
  description?: string;
  gallery?: string[];
}

const accommodations: Accommodation[] = [
  {
    id: 1,
    name: 'Railay Bay Resort',
    type: 'Resort',
    price: '$120-250',
    priceLevel: 'mid',
    rating: 4.8,
    reviews: 256,
    location: 'Railay Beach, Krabi',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    description: 'Luxurious beachfront resort with stunning views of the limestone cliffs. Enjoy world-class amenities and direct beach access.',
  },
  {
    id: 2,
    name: 'Chiang Mai Mountain Retreat',
    type: 'Hotel',
    price: '$60-120',
    priceLevel: 'mid',
    rating: 4.6,
    reviews: 189,
    location: 'Chiang Mai',
    amenities: ['WiFi', 'Breakfast', 'Garden', 'Yoga'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    description: 'A peaceful mountain retreat surrounded by lush greenery. Perfect for wellness and relaxation.',
  },
  {
    id: 3,
    name: 'Phi Phi Island Hostel',
    type: 'Hostel',
    price: '$15-40',
    priceLevel: 'budget',
    rating: 4.4,
    reviews: 412,
    location: 'Phi Phi Islands, Krabi',
    amenities: ['WiFi', 'Bar', 'Tours', 'AC'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e264d5d3?w=800&q=80',
    description: 'Friendly backpacker hostel in the heart of Phi Phi. Social atmosphere with organized activities.',
    gallery: [
      'https://images.unsplash.com/photo-1555854877-bab0e264d5d3?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    ],
  },
  {
    id: 4,
    name: 'Bangkok Riverside Hotel',
    type: 'Hotel',
    price: '$80-180',
    priceLevel: 'mid',
    rating: 4.7,
    reviews: 328,
    location: 'Bangkok',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    description: 'Modern hotel with beautiful river views. Easy access to Bangkok\'s top attractions.',
  },
  {
    id: 5,
    name: 'Phuket Luxury Villa',
    type: 'Resort',
    price: '$250-500',
    priceLevel: 'luxury',
    rating: 4.9,
    reviews: 156,
    location: 'Phuket',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    description: 'Exclusive private villas with personal butler service and stunning ocean views.',
  },
  {
    id: 6,
    name: 'Sukhumvit Budget Inn',
    type: 'Guesthouse',
    price: '$20-45',
    priceLevel: 'budget',
    rating: 4.2,
    reviews: 520,
    location: 'Bangkok',
    amenities: ['WiFi', 'AC', 'Breakfast'],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    description: 'Clean, comfortable budget accommodation in a convenient location near BTS.',
  },
];

export default function AccommodationPage() {
  const [priceFilter, setPriceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false);

  const filtered = accommodations.filter((item) => {
    const matchesPrice = priceFilter === 'All' || item.priceLevel === priceFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    return matchesPrice && matchesType;
  });

  const openModal = (acc: Accommodation) => {
    setSelectedAccommodation(acc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAccommodation(null), 300);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
          alt="Accommodations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/50 to-slate-dark/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Accommodations</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            From luxury resorts to cozy hostels, find the perfect place to stay
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>All Prices</option>
            <option value="budget">Budget</option>
            <option value="mid">Mid-range</option>
            <option value="luxury">Luxury</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>All Types</option>
            <option>Hotel</option>
            <option>Resort</option>
            <option>Hostel</option>
            <option>Guesthouse</option>
          </select>
          <select className="px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Sort by Rating</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((acc) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 hover:shadow-xl transition-all"
            >
              <button
                onClick={() => openModal(acc)}
                className="block text-left w-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-dark text-xs font-semibold rounded-full">
                    {acc.type}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    {acc.location}
                  </div>
                  <h3 className="text-xl font-bold text-slate-dark mb-3">{acc.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {acc.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-xl"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-lg font-bold text-emerald-600">{acc.price}</span>
                      <span className="text-slate-400 text-sm"> /night</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                      <span className="font-semibold text-slate-dark">{acc.rating}</span>
                      <span className="text-slate-400 text-sm">({acc.reviews})</span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No accommodations match your filters.</p>
          </div>
        )}
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedAccommodation?.name || ''}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-slate-500 text-sm">Loading details...</p>
          </div>
        ) : selectedAccommodation ? (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={selectedAccommodation.image}
                alt={selectedAccommodation.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
                {selectedAccommodation.type}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-500" />
                {selectedAccommodation.location}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">{selectedAccommodation.description}</p>
            {selectedAccommodation.gallery && selectedAccommodation.gallery.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-dark mb-3">Photos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedAccommodation.gallery.map((photo, idx) => (
                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden">
                      <img src={photo} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-slate-dark mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAccommodation.amenities.map((amenity) => (
                  <span key={amenity} className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-medium rounded-2xl">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-2xl font-bold text-emerald-600">{selectedAccommodation.price}</span>
                <span className="text-slate-400 text-sm"> /night</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
                <span className="font-semibold text-slate-dark text-lg">{selectedAccommodation.rating}</span>
                <span className="text-slate-400 text-sm">({selectedAccommodation.reviews} reviews)</span>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
