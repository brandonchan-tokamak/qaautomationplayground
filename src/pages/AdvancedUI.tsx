import { useState, useEffect } from "react";

export default function AdvancedUI() {
  const [dynamicId, setDynamicId] = useState("dynamic-id-123");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Change ID every 3 seconds
    const interval = setInterval(() => {
      setDynamicId(`dynamic-id-${Math.floor(Math.random() * 10000)}`);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Advanced UI Features
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Tackle complex scenarios like dynamic IDs and custom components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dynamic ID */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Dynamic ID</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The ID of the button below changes every 3 seconds. Use CSS
            selectors or XPath to find it.
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg mb-4">
            <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
              Current ID:{" "}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{dynamicId}</span>
            </p>
          </div>

          <button
            id={dynamicId}
            className="dynamic-button px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => alert(`Clicked button with ID: ${dynamicId}`)}
          >
            Click Me (Dynamic ID)
          </button>
        </div>

        {/* Star Rating (Custom Component) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Star Rating</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Interact with a custom UI component that doesn't use standard
            inputs.
          </p>

          <div className="flex items-center gap-2 mb-4" id="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-button w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-colors ${
                  star <= rating
                    ? "text-amber-400"
                    : "text-slate-300 dark:text-slate-600 hover:text-amber-200"
                }`}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 min-h-[3rem]">
            <p id="rating-result" className="text-slate-700 dark:text-slate-300 font-medium">
              {rating > 0
                ? `You rated: ${rating} star${rating > 1 ? "s" : ""}`
                : "No rating yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
