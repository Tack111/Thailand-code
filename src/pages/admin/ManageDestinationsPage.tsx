import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const sampleData = [
  { id: 1, name: 'Railay Beach', type: 'Beach', region: 'South', status: 'active', rating: 4.8 },
  { id: 2, name: 'Doi Inthanon', type: 'Mountain', region: 'North', status: 'active', rating: 4.7 },
  { id: 3, name: 'Phi Phi Islands', type: 'Island', region: 'South', status: 'active', rating: 4.9 },
  { id: 4, name: 'Erawan Falls', type: 'Waterfall', region: 'West', status: 'active', rating: 4.6 },
];

export default function ManageDestinationsPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-dark">Manage Destinations</h1>
            <p className="text-slate-500 mt-1">Add, edit, or remove destinations</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5" />
            Add Destination
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg shadow-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Region</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Rating</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-500">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-dark">{item.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{item.region}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{item.rating}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
