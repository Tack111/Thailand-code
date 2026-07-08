import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, DollarSign, Users } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import GoogleMap from '@/components/map/GoogleMap';

interface Destination {
  id: number;
  name: string;
  region: string;
  type: string;
  image: string;
  short: string;
  description: string;
  howToGetThere: string;
  bestTime: string;
  cost: string;
  activities: string[];
  rating: number;
  reviewsCount: number;
  location: { lat: number; lng: number; address: string };
  gallery?: string[];
  tips?: string[];
}

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DestinationModal({ destination, isOpen, onClose }: DestinationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'reviews'>('overview');

  useEffect(() => {
    if (isOpen && destination) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, destination]);

  if (!destination) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={destination.name}>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-slate-500 text-sm">Loading details...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/40 to-transparent" />
            <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
              {destination.type}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-500" />
              {destination.region}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
              <span className="font-semibold text-slate-dark">{destination.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-emerald-500" />
              {destination.reviewsCount} reviews
            </div>
          </div>

          <div className="flex gap-2 border-b border-slate-100">
            {(['overview', 'gallery', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-dark mb-2">About</h3>
                <p className="text-slate-600 leading-relaxed">{destination.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-semibold text-slate-dark text-sm">Best Time to Visit</h4>
                  </div>
                  <p className="text-slate-600 text-sm">{destination.bestTime}</p>
                </div>
                <div className="p-4 bg-gold-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-gold-600" />
                    <h4 className="font-semibold text-slate-dark text-sm">Estimated Cost</h4>
                  </div>
                  <p className="text-slate-600 text-sm">{destination.cost}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-dark mb-2">How to Get There</h3>
                <p className="text-slate-600 leading-relaxed">{destination.howToGetThere}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-dark mb-3">Activities Available</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity) => (
                    <span key={activity} className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-2xl">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {destination.tips && (
                <div>
                  <h3 className="text-lg font-bold text-slate-dark mb-2">Travel Tips</h3>
                  <ul className="space-y-2">
                    {destination.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-dark mb-3">Location</h3>
                <GoogleMap locations={[destination.location]} height="240px" />
                <p className="mt-2 text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {destination.location.address}
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[destination.image, ...(destination.gallery || [])].map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden">
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {[
                { user: 'Alice', rating: 5, comment: 'Absolutely stunning place! The views are breathtaking.', date: '2026-06-15' },
                { user: 'Bob', rating: 4, comment: 'Great experience but a bit crowded during peak season.', date: '2026-05-20' },
              ].map((review, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-dark">{review.user}</span>
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold-500 text-gold-500' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </Modal>
  );
}
