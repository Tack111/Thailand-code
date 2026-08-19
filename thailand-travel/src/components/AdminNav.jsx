import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-dark-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/admin" className="text-2xl font-bold text-brown">
            Admin Panel
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/admin" className="hover:text-brown transition-colors">Dashboard</Link>
            <Link to="/admin/users" className="hover:text-brown transition-colors">Users</Link>
            <Link to="/admin/actions" className="hover:text-brown transition-colors">Actions</Link>
            <Link to="/admin/reviews" className="hover:text-brown transition-colors">Reviews</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-brown hover:bg-light-brown px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
