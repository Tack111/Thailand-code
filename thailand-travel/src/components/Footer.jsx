import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark-blue text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-brown mb-4">Thailand Travel</h3>
            <p className="text-gray-300">Discover the beauty of Thailand through our curated travel guides and community reviews.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/places" className="text-gray-300 hover:text-brown transition-colors">Destinations</Link></li>
              <li><Link to="/reviews" className="text-gray-300 hover:text-brown transition-colors">Reviews</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-brown transition-colors">Join Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">Email: info@thailandtravel.com</p>
            <p className="text-gray-300">Phone: +66 2 123 4567</p>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Thailand Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
