import { useState } from 'react';

export default function Tables() {
  const [dynamicData, setDynamicData] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', role: 'Manager', status: 'Active' },
  ]);

  const addRow = () => {
    const newId = dynamicData.length > 0 ? Math.max(...dynamicData.map(d => d.id)) + 1 : 1;
    setDynamicData([...dynamicData, { id: newId, name: `User ${newId}`, role: 'Tester', status: 'Active' }]);
  };

  const deleteRow = (id: number) => {
    setDynamicData(dynamicData.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tables</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Practice interacting with static and dynamic tables.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Static Table */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Static Table</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">A simple table with fixed data.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="static-table">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">ID</th>
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Product</th>
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Price</th>
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-slate-700 dark:text-slate-300">101</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Laptop</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">$999.00</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">45</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-slate-700 dark:text-slate-300">102</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Smartphone</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">$699.00</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">120</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-slate-700 dark:text-slate-300">103</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">Headphones</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">$149.00</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold dark:text-white">Dynamic Table</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">A table where rows can be added or removed.</p>
            </div>
            <button 
              id="add-row-btn"
              onClick={addRow}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Add Row
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="dynamic-table">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">ID</th>
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Name</th>
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Role</th>
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Status</th>
                  <th className="p-4 font-medium text-slate-900 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {dynamicData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">
                      No data available. Add a row to get started.
                    </td>
                  </tr>
                ) : (
                  dynamicData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="p-4 text-slate-700 dark:text-slate-300">{row.id}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{row.name}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{row.role}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => deleteRow(row.id)}
                          className="text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 text-sm font-medium"
                          id={`delete-btn-${row.id}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
