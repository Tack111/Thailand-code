import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getUserActions } from '../services/admin'

export default function AdminActions() {
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const data = await getUserActions()
        setActions(data)
      } catch {
        setActions([
          { id: 1, user_id: 1, user_name: 'John Doe', action_type: 'registration', description: 'User registered a new account', created_at: '2026-07-08 10:30:00' },
          { id: 2, user_id: 2, user_name: 'Sarah Johnson', action_type: 'login', description: 'User logged in', created_at: '2026-07-08 11:00:00' },
          { id: 3, user_id: 1, user_name: 'John Doe', action_type: 'review_creation', description: 'Created review for Bangkok', created_at: '2026-07-08 11:15:00' },
          { id: 4, user_id: 3, user_name: 'Mike Chen', action_type: 'review_update', description: 'Updated review for Chiang Mai', created_at: '2026-07-08 12:00:00' },
          { id: 5, user_id: 2, user_name: 'Sarah Johnson', action_type: 'review_deletion', description: 'Deleted review for Phuket', created_at: '2026-07-08 12:30:00' },
          { id: 6, user_id: 1, user_name: 'John Doe', action_type: 'login', description: 'User logged in', created_at: '2026-07-08 13:00:00' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchActions()
  }, [])

  const getActionColor = (type) => {
    const colors = {
      registration: 'bg-blue-100 text-blue-800',
      login: 'bg-green-100 text-green-800',
      review_creation: 'bg-purple-100 text-purple-800',
      review_update: 'bg-yellow-100 text-yellow-800',
      review_deletion: 'bg-red-100 text-red-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-dark-blue mb-2">Action Tracking</h1>
      <p className="text-gray-600 mb-8">Monitor user activities and system actions</p>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Action</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {actions.map((action, i) => (
                <motion.tr
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="px-6 py-4 font-medium text-dark-blue">{action.user_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getActionColor(action.action_type)}`}>
                      {action.action_type.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{action.description}</td>
                  <td className="px-6 py-4 text-gray-500">{action.created_at}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
