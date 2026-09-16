import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌴</span>
              <span className="text-xl font-bold">Thailand Travel</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted guide to discovering the real Thailand. Curated places, honest reviews, and insider tips from real travelers.
            </p>
            <div className="flex gap-4">
              <span className="text-gray-500 text-sm">Verified Information</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-500 text-sm">Real Reviews</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-500 text-sm">Updated Daily</span>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/places" className="text-gray-400 hover:text-emerald-400 transition-colors">All Places</Link></li>
              <li><Link to="/food" className="text-gray-400 hover:text-emerald-400 transition-colors">Food Guide</Link></li>
              <li><Link to="/places?category=restaurant" className="text-gray-400 hover:text-emerald-400 transition-colors">Restaurants</Link></li>
              <li><Link to="/places?category=attraction" className="text-gray-400 hover:text-emerald-400 transition-colors">Attractions</Link></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-emerald-400 transition-colors">Traveler Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Join Us</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-400 hover:text-emerald-400 transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-emerald-400 transition-colors">Login</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 Thailand Travel. All rights reserved. Made with ❤️ for travelers.</p>
        </div>
      </div>
    </footer>
  )
}
