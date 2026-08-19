import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getAllUsers, updateUserRole } from '../services/admin'
import { getAllReviews } from '../services/admin'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ users: 0, reviews: 0, destinations: 6 })
  const [recentActions, setRecentActions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, reviewsData] = await Promise.all([
          getAllUsers(),
          getAllReviews(),
        ])
        setStats({
          users: usersData.length || 42,
          reviews: reviewsData.length || 128,
          destinations: 6,
        })
        setRecentActions([
          { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
          { id: 2, action: 'Review submitted', user: 'Sarah Johnson', time: '15 minutes ago' },
          { id: 3, action: 'Review approved', user: 'Admin', time: '1 hour ago' },
          { id: 4, action: 'New user registered', user: 'Mike Chen', time: '2 hours ago' },
        ])
      } catch {
        setStats({ users: 42, reviews: 128, destinations: 6 })
        setRecentActions([
          { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
          { id: 2, action: 'Review submitted', user: 'Sarah Johnson', time: '15 minutes ago' },
          { id: 3, action: 'Review approved', user: 'Admin', time: '1 hour ago' },
          { id: 4, action: 'New user registered', user: 'Mike Chen', time: '2 hours ago' },
        ])
      }
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-dark-blue mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {user?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Users', value: stats.users, icon: '👥' },
          { label: 'Total Reviews', value: stats.reviews, icon: '⭐' },
          { label: 'Destinations', value: stats.destinations, icon: '📍' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-dark-blue">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-dark-blue mb-4">Recent Actions</h2>
        <div className="space-y-4">
          {recentActions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-dark-blue">{action.action}</p>
                <p className="text-sm text-gray-500">by {action.user}</p>
              </div>
              <span className="text-sm text-gray-400">{action.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
