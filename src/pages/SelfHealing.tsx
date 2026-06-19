import { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SelfHealing() {
  const [clickCount, setClickCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonClick = () => {
    setClickCount((prev) => prev + 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
            <Sparkles size={24} />
            <span className="text-sm font-bold uppercase tracking-wider">Self Healing Automation</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Self Healing
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Interactive element designated for self-healing test automation scripts. Target this page using modern locator discovery methods.
          </p>
        </div>
      </header>

      {/* Main interactive area (1-column layout) */}
      <div className="space-y-6">
        <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">Target Element</h2>
                <p className="text-xs text-slate-500">Interactive test button with ID: button1</p>
              </div>
            </div>
          </div>
          
          <div className="p-12 flex flex-col items-center justify-center min-h-[300px] space-y-6 bg-slate-50/50 dark:bg-slate-900/30">
            <button
              id="button1"
              onClick={handleButtonClick}
              data-qa="healing-btn"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-indigo-500/20"
            >
              Baseline Button
            </button>

            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-semibold"
                >
                  <CheckCircle size={16} />
                  <span>Click Handled! (Total clicks: {clickCount})</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}
