import { motion } from 'framer-motion';

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', joined: '2026-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user', joined: '2026-02-20' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'admin', joined: '2026-01-10' },
];

export default function UsersManagementPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-dark mb-2">User Management</h1>
          <p className="text-slate-500">View and manage all registered users</p>
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
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Joined</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-dark text-sm">{user.name}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${user.role === 'admin' ? 'bg-gold-50 text-gold-600' : 'bg-slate-100 text-slate-600'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{user.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                        Remove
                      </button>
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
