import { motion } from 'framer-motion';

export default function ManageAccommodationsPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-dark">Manage Accommodations</h1>
            <p className="text-slate-500 mt-1">Add, edit, or remove accommodations</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Add Accommodation
          </button>
        </motion.div>
        <div className="bg-white rounded-3xl shadow-lg shadow-slate-100 p-12 text-center">
          <p className="text-slate-500">Accommodation management interface</p>
        </div>
      </div>
    </div>
  );
}
