import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Star, MapPin, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, bg: 'bg-emerald-100', text: 'text-emerald-600' },
    { label: 'Reviews', value: '5,678', icon: Star, bg: 'bg-gold-100', text: 'text-gold-600' },
    { label: 'Destinations', value: '89', icon: MapPin, bg: 'bg-teal-100', text: 'text-teal-600' },
    { label: 'Monthly Visits', value: '12.5K', icon: TrendingUp, bg: 'bg-emerald-100', text: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-dark mb-2">Admin Dashboard</h1>
          <p className="text-slate-500">Manage your platform and monitor activity</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.text}`} />
              </div>
              <p className="text-2xl font-bold text-slate-dark">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-dark mb-6">Management</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Destinations', to: '/admin/destinations', icon: MapPin, bg: 'bg-emerald-50 hover:bg-emerald-100', text: 'text-emerald-600' },
                { title: 'Reviews', to: '/admin/reviews', icon: Star, bg: 'bg-gold-50 hover:bg-gold-100', text: 'text-gold-600' },
                { title: 'Users', to: '#', icon: Users, bg: 'bg-teal-50 hover:bg-teal-100', text: 'text-teal-600' },
                { title: 'Analytics', to: '#', icon: TrendingUp, bg: 'bg-emerald-50 hover:bg-emerald-100', text: 'text-emerald-600' },
              ].map((action) => (
                <Link
                  key={action.title}
                  to={action.to}
                  className={`p-6 ${action.bg} rounded-3xl transition-all group flex flex-col items-center text-center gap-3`}
                >
                  <action.icon className={`w-8 h-8 ${action.text} group-hover:scale-110 transition-transform`} />
                  <p className="font-medium text-slate-dark text-sm">{action.title}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-dark mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { event: 'New review on Phi Phi Islands', user: 'alice@example.com', time: '2 min ago' },
                { event: 'User registered', user: 'bob@example.com', time: '15 min ago' },
                { event: 'Review approved', user: 'Railay Beach', time: '1 hour ago' },
                { event: 'New destination added', user: 'Doi Inthanon', time: '3 hours ago' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-slate-dark text-sm">{item.event}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.user}</p>
                  </div>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
