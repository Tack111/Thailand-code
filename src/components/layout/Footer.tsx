import { Link } from 'react-router-dom';
import { Plane, Shirt, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-500 rounded-xl">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Thailand<span className="text-emerald-400">Travel</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover the beauty of Thailand. From pristine beaches to ancient temples, your journey starts here.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">Explore</h4>
            <ul className="space-y-3">
              {['Destinations', 'Accommodations', 'Food & Dining', 'Travel Guides'].map((item) => (
                <li key={item}>
                  <Link to="/destinations" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <span className="text-slate-400 hover:text-white transition-colors text-sm cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-xl hover:bg-emerald-500 transition-colors">
                <Shirt className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-xl hover:bg-emerald-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-xl hover:bg-emerald-500 transition-colors">
                <Plane className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            Thailand Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
