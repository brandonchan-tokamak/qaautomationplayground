import { useState, useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';

const initialData = [
  { id: 1, name: 'Apple iPhone 15', category: 'Electronics', price: '$999' },
  { id: 2, name: 'Samsung Galaxy S24', category: 'Electronics', price: '$899' },
  { id: 3, name: 'Sony WH-1000XM5', category: 'Audio', price: '$348' },
  { id: 4, name: 'MacBook Air M3', category: 'Computers', price: '$1099' },
  { id: 5, name: 'Dell XPS 15', category: 'Computers', price: '$1299' },
  { id: 6, name: 'iPad Pro', category: 'Tablets', price: '$799' },
  { id: 7, name: 'Nintendo Switch', category: 'Gaming', price: '$299' },
  { id: 8, name: 'PlayStation 5', category: 'Gaming', price: '$499' },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return initialData;
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialData.filter(item => 
      item.name.toLowerCase().includes(lowercasedTerm) ||
      item.category.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Search</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Practice searching and filtering populated tables.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="mb-6">
          <label htmlFor="search-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Search Products
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-slate-400" />
            </div>
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or category..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2" id="search-results-count">
            Showing {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="search-table">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-medium text-slate-900 dark:text-slate-200">ID</th>
                <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Name</th>
                <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Category</th>
                <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 dark:text-slate-400" id="no-results-message">
                    No products found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors search-row">
                    <td className="p-4 text-slate-700 dark:text-slate-300">{item.id}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{item.name}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{item.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
