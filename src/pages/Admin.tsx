import React, { useEffect, useState } from 'react';
import { getStats, logoutAdmin, resetUserStats, resetPageStats, resetScriptStats } from '../utils/tracking';
import { Users, MousePointer2, BarChart3, LogOut, RotateCcw, AlertTriangle } from 'lucide-react';

const ALL_PAGES = [
  "Home", "Tutorial", "Tables", "Search", "Wait Conditions", 
  "Keyboard Actions", "Mouse Actions", "Popup Windows", 
  "Forms", "Upload & Download", "Sample Pages", "Advanced UI"
];

const SCRIPT_LESSONS = [
  { id: 'textbox', label: 'Challenge 1: Textbox' },
  { id: 'button-click', label: 'Challenge 2: Button Click' },
  { id: 'dropdown', label: 'Challenge 3: Dropdown' },
  { id: 'wait', label: 'Challenge 4: Wait' },
  { id: 'radio', label: 'Challenge 5: Radio' },
  { id: 'checkbox', label: 'Challenge 6: Checkbox' }
];

type ConfirmAction = {
  message: string;
  onConfirm: () => void;
} | null;

export default function Admin() {
  const [stats, setStats] = useState(getStats());
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getStats());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    window.location.href = '#/';
    window.dispatchEvent(new Event('storage'));
  };

  const handleResetUserStats = () => {
    setConfirmAction({
      message: 'Are you sure you want to reset User Visits? This cannot be undone.',
      onConfirm: () => {
        resetUserStats();
        setStats(getStats());
        window.dispatchEvent(new Event('storage'));
      }
    });
  };

  const handleResetPageStats = () => {
    setConfirmAction({
      message: 'Are you sure you want to reset Page Visit Stats and Total Engagement? This cannot be undone.',
      onConfirm: () => {
        resetPageStats();
        setStats(getStats());
        window.dispatchEvent(new Event('storage'));
      }
    });
  };

  const handleResetScriptStats = () => {
    setConfirmAction({
      message: 'Are you sure you want to reset Katalon Script Reveal Stats? This cannot be undone.',
      onConfirm: () => {
        resetScriptStats();
        setStats(getStats());
        window.dispatchEvent(new Event('storage'));
      }
    });
  };

  const pageStatsWithDefaults = ALL_PAGES.reduce((acc: any, page) => {
    acc[page] = stats.pageStats[page] || 0;
    return acc;
  }, {});

  const scriptStatsWithDefaults = SCRIPT_LESSONS.map(lesson => ({
    id: lesson.id,
    label: lesson.label,
    count: stats.scriptStats[lesson.id] || 0
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Custom Confirm Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Confirm Reset</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">{confirmAction.message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmAction.onConfirm();
                  setConfirmAction(null);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Website analytics and user engagement stats.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Users size={24} />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">User Visits</h2>
            </div>
            <button onClick={handleResetUserStats} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Reset User Visits">
              <RotateCcw size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Unique Users</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.userStats.unique}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Repeated Visits</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.userStats.repeated}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                <BarChart3 size={24} />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Total Engagement</h2>
            </div>
            <button onClick={handleResetPageStats} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Reset Total Engagement">
              <RotateCcw size={18} />
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Total Page Views</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              {Object.values(pageStatsWithDefaults).reduce((a: any, b: any) => a + b, 0)}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                <MousePointer2 size={24} />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Click Stats</h2>
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Total Clicks</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.clickStats}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Users size={24} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">IP Addresses</h2>
          </div>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          {stats.userStats.ips.length > 0 ? (
            <ul className="text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
              {stats.userStats.ips.map((ip: string) => <li key={ip}>{ip}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">No IP addresses recorded yet.</p>
          )}
        </div>
      </div>

      {/* Page Stats */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400">
              <BarChart3 size={24} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Page Visit Stats</h2>
          </div>
          <button onClick={handleResetPageStats} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Reset Page Visit Stats">
            <RotateCcw size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Page Name</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Visits</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pageStatsWithDefaults).map(([page, count]) => (
                <tr key={page} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">{page}</td>
                  <td className="py-3 px-4 text-slate-900 dark:text-white font-bold text-right">{count as number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Script Reveal Stats */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
              <MousePointer2 size={24} />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Katalon Script Reveal Stats</h2>
          </div>
          <button onClick={handleResetScriptStats} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title="Reset Script Reveal Stats">
            <RotateCcw size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scriptStatsWithDefaults.map(({ id, label, count }) => (
            <div key={id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold">{count as number} clicks</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}