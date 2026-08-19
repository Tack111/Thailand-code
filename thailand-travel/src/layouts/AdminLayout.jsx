import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminNav from '../components/AdminNav'

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminNav />
      <main className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
