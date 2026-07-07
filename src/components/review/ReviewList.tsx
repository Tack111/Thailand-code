import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';

interface Review {
  id: number;
  user: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  photos?: string[];
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews.length) {
    return (
      <div className="bg-white rounded-3xl p-10 shadow-lg shadow-slate-100 text-center">
        <p className="text-slate-500">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, idx) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-bold text-slate-dark">{review.user}</h4>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-gold-500 text-gold-500' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              {review.date}
            </span>
          </div>
          <h5 className="font-semibold text-slate-dark mb-2">{review.title}</h5>
          <p className="text-slate-600 leading-relaxed mb-4">{review.comment}</p>
          {review.photos && review.photos.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {review.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt=""
                  className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
                />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
