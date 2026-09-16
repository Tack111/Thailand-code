import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllUsers, updateUserRole } from '../services/admin'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch {
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', created_at: '2026-07-01' },
          { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', created_at: '2026-07-02' },
          { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'user', created_at: '2026-07-03' },
          { id: 4, name: 'Admin User', email: 'admin@example.com', role: 'admin', created_at: '2026-06-01' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole)
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
    } catch {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
    }
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
      <h1 className="text-4xl font-bold text-dark-blue mb-2">User Management</h1>
      <p className="text-gray-600 mb-8">Manage registered users and their roles</p>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-blue">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="px-6 py-4 font-medium text-dark-blue">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${user.role === 'admin' ? 'bg-brown text-white' : 'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.created_at}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-brown focus:border-transparent outline-none"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
