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
    <nav className="bg-dark-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-brown">
            Thailand Travel
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-brown transition-colors">Home</Link>
            <Link to="/places" className="hover:text-brown transition-colors">Places</Link>
            <Link to="/reviews" className="hover:text-brown transition-colors">Reviews</Link>
            {!user && (
              <>
                <Link to="/login" className="hover:text-brown transition-colors">Login</Link>
                <Link to="/register" className="hover:text-brown transition-colors">Register</Link>
              </>
            )}
            {user && user.role === 'user' && (
              <Link to="/dashboard" className="hover:text-brown transition-colors">Dashboard</Link>
            )}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="hover:text-brown transition-colors">Admin</Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <button
                onClick={handleLogout}
                className="bg-brown hover:bg-light-brown px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-brown">Home</Link>
            <Link to="/places" className="block py-2 hover:text-brown">Places</Link>
            <Link to="/reviews" className="block py-2 hover:text-brown">Reviews</Link>
            {!user && (
              <>
                <Link to="/login" className="block py-2 hover:text-brown">Login</Link>
                <Link to="/register" className="block py-2 hover:text-brown">Register</Link>
              </>
            )}
            {user && user.role === 'user' && (
              <Link to="/dashboard" className="block py-2 hover:text-brown">Dashboard</Link>
            )}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="block py-2 hover:text-brown">Admin</Link>
            )}
            {user && (
              <button onClick={handleLogout} className="block py-2 text-brown">Logout</button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
