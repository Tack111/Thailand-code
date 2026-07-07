import { motion } from 'framer-motion';
import { MapPin, Star, Heart, User, Settings, Clock } from 'lucide-react';
import { useState } from 'react';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('favorites');

  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Railay Beach', type: 'Beach', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80' },
    { id: 2, name: 'Doi Inthanon', type: 'Mountain', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&q=80' },
  ]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const reviewHistory = [
    { id: 1, place: 'Phi Phi Islands', rating: 5, date: '2026-06-15', comment: 'Absolutely stunning! The water was crystal clear.' },
    { id: 2, place: 'Railay Bay Resort', rating: 4, date: '2026-05-20', comment: 'Beautiful resort with amazing views.' },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-lg shadow-slate-100 p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                  JD
                </div>
                <div>
                  <h2 className="font-bold text-slate-dark">John Doe</h2>
                  <p className="text-sm text-slate-500">john@example.com</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { tab: 'favorites', label: 'Favorites', icon: Heart },
                  { tab: 'reviews', label: 'Review History', icon: Star },
                  { tab: 'profile', label: 'Profile', icon: User },
                  { tab: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      activeTab === item.tab
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-slate-dark mb-6">Your Favorites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((fav) => (
                    <div key={fav.id} className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 relative group">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={fav.image} alt={fav.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleFavorite(fav.id)}
                          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                        >
                          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-slate-dark">{fav.name}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {fav.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-slate-dark mb-6">Review History</h2>
                <div className="space-y-4">
                  {reviewHistory.map((review) => (
                    <div key={review.id} className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-slate-dark">{review.place}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-gold-500 text-gold-500' : 'text-slate-200'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-sm text-slate-400">
                          <Clock className="w-4 h-4" /> {review.date}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-dark mb-6">Edit Profile</h2>
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-white text-3xl font-bold">
                    JD
                  </div>
                </div>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button className="w-full py-3.5 text-white font-semibold bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl shadow-lg shadow-gold-500/20 hover:shadow-xl transition-all">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-dark mb-6">Settings</h2>
                <div className="space-y-6 max-w-md">
                  <div className="flex items-center justify-between py-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-medium text-slate-dark">Email Notifications</h3>
                      <p className="text-sm text-slate-500">Receive updates about new reviews</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-medium text-slate-dark">Public Profile</h3>
                      <p className="text-sm text-slate-500">Make your profile visible to others</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <button className="w-full py-3.5 text-white font-semibold bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl shadow-lg shadow-rose-500/20 hover:shadow-xl transition-all">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
