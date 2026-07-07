import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Star, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewForm from '@/components/review/ReviewForm';
import ReviewList from '@/components/review/ReviewList';
import GoogleMap from '@/components/map/GoogleMap';

const destinations: Record<string, any> = {
  1: {
    id: 1,
    name: 'Railay Beach',
    region: 'South',
    type: 'Beach',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
      'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80',
    ],
    description: 'Railay Beach is a small peninsula accessible only by boat due to the high limestone cliffs cutting it off from the mainland. It offers stunning beaches, rock climbing, and a relaxed atmosphere that attracts visitors from around the world.',
    howToGetThere: 'Take a ferry from Krabi Town or Ao Nang (approximately 15 minutes) to Railay Beach.',
    bestTime: 'November to April is the ideal time to visit with sunny days and calm seas.',
    cost: 'Budget: $30-50/day | Mid-range: $60-120/day | Luxury: $150+/day',
    activities: ['Rock Climbing', 'Kayaking', 'Snorkeling', 'Sunset Views', 'Beach Relaxation'],
    rating: 4.8,
    reviewsCount: 324,
    location: { lat: 8.0062, lng: 98.8355, address: 'Railay Beach, Krabi, Thailand' },
    reviews: [
      { id: 1, user: 'alice@example.com', rating: 5, title: 'Paradise on Earth', comment: 'Absolutely stunning beach with crystal clear water. The limestone cliffs create a magical backdrop.', date: '2026-06-15' },
      { id: 2, user: 'bob@example.com', rating: 4, title: 'Beautiful but crowded', comment: 'Gorgeous place but get here early to avoid crowds. The rock climbing is amazing!', date: '2026-05-20' },
    ],
  },
  2: {
    id: 2,
    name: 'Doi Inthanon',
    region: 'North',
    type: 'Mountain',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1200&q=80',
    description: "Thailand's highest mountain at 2,565 meters. It features lush forests, stunning waterfalls like Wachirathan, and the famous royal pagodas.",
    howToGetThere: 'Take a 1.5-hour drive from Chiang Mai city center. Tours are available or rent a car for flexibility.',
    bestTime: 'December to February for the coolest weather and clearest views.',
    cost: 'Budget: $20-40/day | Mid-range: $50-80/day | Luxury: $100+/day',
    activities: ['Hiking', 'Waterfall Visits', 'Bird Watching', 'Cultural Tours', 'Photography'],
    rating: 4.7,
    reviewsCount: 256,
    location: { lat: 18.5865, lng: 98.4868, address: 'Chiang Mai, Thailand' },
    reviews: [
      { id: 3, user: 'charlie@example.com', rating: 5, title: 'Breathtaking views', comment: 'The king and queen pagodas are stunning. Cool weather and beautiful nature.', date: '2026-04-10' },
    ],
  },
};

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dest = destinations[id || '1'] || destinations['1'];

  const handleReviewSubmit = (rating: number, title: string, comment: string) => {
    console.log('Review submitted:', { rating, title, comment });
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/70 via-slate-dark/20 to-transparent" />
        <Link
          to="/destinations"
          className="absolute top-6 left-4 sm:left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-3">
            {dest.type}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">{dest.name}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{dest.region}, Thailand</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              <span className="text-sm font-semibold">{dest.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100"
            >
              <h2 className="text-2xl font-bold text-slate-dark mb-4">About This Destination</h2>
              <p className="text-slate-600 leading-relaxed text-base">{dest.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100"
            >
              <h2 className="text-2xl font-bold text-slate-dark mb-6">Essential Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-dark mb-1">Best Time to Visit</h4>
                    <p className="text-slate-500 text-sm">{dest.bestTime}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-gold-50 rounded-2xl">
                    <DollarSign className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-dark mb-1">Estimated Cost</h4>
                    <p className="text-slate-500 text-sm">{dest.cost}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-teal-50 rounded-2xl">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-dark mb-1">How to Get There</h4>
                    <p className="text-slate-500 text-sm">{dest.howToGetThere}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-dark mb-1">Reviews</h4>
                    <p className="text-slate-500 text-sm">{dest.reviewsCount} traveler reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100"
            >
              <h2 className="text-2xl font-bold text-slate-dark mb-6">Activities Available</h2>
              <div className="flex flex-wrap gap-3">
                {dest.activities.map((activity: string) => (
                  <span
                    key={activity}
                    className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-2xl"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-slate-dark mb-6">Reviews</h2>
              <ReviewList reviews={dest.reviews} />
              <div className="mt-8">
                <ReviewForm onSubmit={handleReviewSubmit} />
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100 sticky top-24"
            >
              <h3 className="text-xl font-bold text-slate-dark mb-4">Location</h3>
              <GoogleMap locations={[dest.location]} height="240px" />
              <div className="flex items-start gap-2 text-slate-600 mt-4">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{dest.location.address}</p>
              </div>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${dest.location.lat},${dest.location.lng}`}
                target="_blank"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white font-medium rounded-2xl hover:bg-emerald-600 transition-colors text-sm"
              >
                Open in Google Maps
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
