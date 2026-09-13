import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌴</span>
            <span className="text-xl font-bold text-emerald-800">Thailand Travel</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Home</Link>
            <Link to="/places" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Places</Link>
            <Link to="/reviews" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Reviews</Link>
            {!user && (
              <>
                <Link to="/login" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Login</Link>
                <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">Sign Up</Link>
              </>
            )}
            {user && user.role === 'user' && (
              <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Dashboard</Link>
            )}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Admin</Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            )}
          </div>

          <button
            className="md:hidden text-gray-600 p-2"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-100 pt-4">
            <Link to="/" className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Home</Link>
            <Link to="/places" className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Places</Link>
            <Link to="/reviews" className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Reviews</Link>
            {!user && (
              <>
                <Link to="/login" className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Login</Link>
                <Link to="/register" className="block py-2 text-emerald-600 font-medium">Sign Up</Link>
              </>
            )}
            {user && user.role === 'user' && (
              <Link to="/dashboard" className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Dashboard</Link>
            )}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="block py-2 text-gray-600 hover:text-emerald-600 font-medium">Admin</Link>
            )}
            {user && (
              <button onClick={handleLogout} className="block py-2 text-red-600 font-medium">Logout</button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
