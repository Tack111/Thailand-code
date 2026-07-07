import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="inline-block"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Plane className="w-12 h-12 text-emerald-500 rotate-45" />
          </div>
        </motion.div>
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-dark mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-dark mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Looks like you've wandered off the beaten path. Let's get you back to exploring Thailand's beautiful destinations.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
