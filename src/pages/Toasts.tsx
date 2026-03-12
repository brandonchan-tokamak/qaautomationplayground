import { useState, useEffect } from "react";
import { Bell, X, AlertCircle, CheckCircle, Info } from "lucide-react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  duration: number;
};

export default function Toasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastCount, setToastCount] = useState(0);

  const addToast = (type: "success" | "error" | "info", duration: number = 3000) => {
    const id = Date.now();
    const newToast: Toast = {
      id,
      type,
      duration,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} message ${toastCount + 1}`,
    };
    
    setToasts((prev) => [...prev, newToast]);
    setToastCount((prev) => prev + 1);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Toasts & Notifications</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Practice automating ephemeral elements that appear and disappear automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Trigger Notifications</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Click the buttons below to trigger different types of toast notifications. Your automation script should wait for them to appear, verify their text, and optionally close them.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              id="btn-success-toast"
              onClick={() => addToast("success", 3000)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle size={18} />
              Success (3s)
            </button>
            <button
              id="btn-error-toast"
              onClick={() => addToast("error", 5000)}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-2"
            >
              <AlertCircle size={18} />
              Error (5s)
            </button>
            <button
              id="btn-info-toast"
              onClick={() => addToast("info", 0)} // 0 means it won't auto-close
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Info size={18} />
              Sticky Info
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`
              flex items-center justify-between p-4 rounded-lg shadow-lg border min-w-[300px] animate-in slide-in-from-right-8 fade-in duration-300
              ${toast.type === "success" ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200" : ""}
              ${toast.type === "error" ? "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200" : ""}
              ${toast.type === "info" ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200" : ""}
            `}
            role="alert"
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />}
              {toast.type === "error" && <AlertCircle size={20} className="text-rose-600 dark:text-rose-400" />}
              {toast.type === "info" && <Info size={20} className="text-blue-600 dark:text-blue-400" />}
              <span className="font-medium toast-message">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors close-toast-btn"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
