import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  { id: 1, user: 'alice@example.com', place: 'Phi Phi Islands', rating: 5, status: 'approved', date: '2026-06-15' },
  { id: 2, user: 'bob@example.com', place: 'Railay Beach', rating: 4, status: 'pending', date: '2026-06-14' },
  { id: 3, user: 'charlie@example.com', place: 'Chiang Mai Temple', rating: 5, status: 'approved', date: '2026-06-13' },
  { id: 4, user: 'diana@example.com', place: 'Erawan Falls', rating: 3, status: 'rejected', date: '2026-06-12' },
  { id: 5, user: 'evan@example.com', place: 'Doi Inthanon', rating: 4, status: 'pending', date: '2026-06-11' },
];

export default function ReviewModerationPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-dark mb-2">Review Moderation</h1>
          <p className="text-slate-500">Approve or reject user reviews</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg shadow-slate-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">User</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Place</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Rating</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-dark text-sm">{review.user}</div>
                        <div className="text-xs text-slate-400 mt-0.5">Reviewed {review.place}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{review.place}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? 'fill-gold-500 text-gold-500' : 'text-slate-200'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{review.date}</td>
                    <td className="px-6 py-4">
                      {review.status === 'approved' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Approved
                        </span>
                      )}
                      {review.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-50 text-gold-600 text-xs font-medium rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      )}
                      {review.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-full">
                          <XCircle className="w-3.5 h-3.5" />
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {review.status === 'pending' && (
                          <>
                            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
