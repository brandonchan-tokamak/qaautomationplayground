import { useState, KeyboardEvent } from "react";
import { Keyboard, Command, History, Trash2, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ActionHistory {
  id: string;
  type: "special" | "shortcut";
  value: string;
  timestamp: Date;
}

export default function KeyboardActions() {
  const [specialKey, setSpecialKey] = useState("");
  const [shortcut, setShortcut] = useState("");
  const [history, setHistory] = useState<ActionHistory[]>([]);

  const addToHistory = (type: "special" | "shortcut", value: string) => {
    const newAction: ActionHistory = {
      id: Math.random().toString(36).substring(7),
      type,
      value,
      timestamp: new Date(),
    };
    setHistory((prev) => [newAction, ...prev].slice(0, 5));
  };

  const handleSpecialKey = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let msg = "";
    if (e.key === "Enter") msg = "Enter key pressed";
    else if (e.key === "Escape") msg = "Escape key pressed";
    else if (e.key === "Tab") msg = "Tab key pressed";
    else if (e.key === "ArrowUp") msg = "Up Arrow pressed";
    else if (e.key === "ArrowDown") msg = "Down Arrow pressed";
    else if (e.key === "ArrowLeft") msg = "Left Arrow pressed";
    else if (e.key === "ArrowRight") msg = "Right Arrow pressed";
    else msg = `Key pressed: ${e.key}`;
    
    setSpecialKey(msg);
    addToHistory("special", msg);
  };

  const handleShortcut = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const parts = [];
    if (e.ctrlKey) parts.push("Ctrl");
    if (e.altKey) parts.push("Alt");
    if (e.shiftKey) parts.push("Shift");
    if (e.metaKey) parts.push("Meta");
    
    // Only add the key if it's not just a modifier key
    if (!["Control", "Alt", "Shift", "Meta"].includes(e.key)) {
      parts.push(e.key);
    }

    if (parts.length > 0) {
      const msg = parts.join(" + ");
      setShortcut(msg);
      addToHistory("shortcut", msg);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
            <Keyboard size={24} />
            <span className="text-sm font-bold uppercase tracking-wider">Interactive Test</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Keyboard Actions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
            A specialized environment for testing event listeners, key codes, and complex keyboard interactions.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Special Keys Card */}
          <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Keyboard size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">Special Keys</h2>
                  <p className="text-xs text-slate-500">Detects non-character keys</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="special-keys" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Input Field
                </label>
                <input
                  id="special-keys"
                  type="text"
                  onKeyDown={handleSpecialKey}
                  placeholder="Press Enter, Esc, Tab, or Arrows..."
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg font-medium dark:text-white"
                />
              </div>
              <div className="p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 min-h-[80px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={specialKey}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-blue-700 dark:text-blue-300 font-bold text-xl text-center"
                  >
                    {specialKey || "Waiting for input..."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts Card */}
          <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Command size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h2>
                  <p className="text-xs text-slate-500">Detects modifier combinations</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="keyboard-shortcuts" className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Input Field
                </label>
                <input
                  id="keyboard-shortcuts"
                  type="text"
                  onKeyDown={handleShortcut}
                  placeholder="Try Ctrl+C, Alt+S, Shift+A..."
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all text-lg font-medium dark:text-white"
                />
              </div>
              <div className="p-6 bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/50 min-h-[80px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={shortcut}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-purple-700 dark:text-purple-300 font-bold text-xl text-center"
                  >
                    {shortcut || "Waiting for shortcut..."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar / History */}
        <aside className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <History size={18} className="text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold">Action History</h3>
              </div>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {history.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto">
                      <Info size={20} className="text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">No actions recorded yet</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl flex items-center justify-between group"
                    >
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-bold uppercase tracking-tighter ${item.type === 'special' ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          {item.type}
                        </span>
                        <span className="text-sm font-medium truncate max-w-[140px]">{item.value}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

