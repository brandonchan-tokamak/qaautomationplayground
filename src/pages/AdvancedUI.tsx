import { useState, useEffect } from "react";

export default function AdvancedUI() {
  const [dynamicId, setDynamicId] = useState("dynamic-id-123");
  const [shadowContent, setShadowContent] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Change ID every 3 seconds
    const interval = setInterval(() => {
      setDynamicId(`dynamic-id-${Math.floor(Math.random() * 10000)}`);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Create shadow DOM
    const host = document.getElementById("shadow-host");
    if (host && !host.shadowRoot) {
      const shadow = host.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
        .shadow-container {
          padding: 1rem;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-family: system-ui, sans-serif;
        }
        .shadow-input {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.5rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.25rem;
        }
        .shadow-button {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }
      `;

      const container = document.createElement("div");
      container.className = "shadow-container";

      const label = document.createElement("label");
      label.textContent = "Enter text in Shadow DOM:";

      const input = document.createElement("input");
      input.id = "shadow-input";
      input.className = "shadow-input";
      input.type = "text";

      const button = document.createElement("button");
      button.id = "shadow-button";
      button.className = "shadow-button";
      button.textContent = "Submit";
      button.onclick = () => {
        setShadowContent(input.value);
      };

      container.appendChild(label);
      container.appendChild(input);
      container.appendChild(button);

      shadow.appendChild(style);
      shadow.appendChild(container);
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Advanced UI Features
        </h1>
        <p className="text-slate-600 mt-2">
          Tackle complex scenarios like Shadow DOM, dynamic IDs, and custom
          components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dynamic ID */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Dynamic ID</h2>
          <p className="text-sm text-slate-500 mb-4">
            The ID of the button below changes every 3 seconds. Use CSS
            selectors or XPath to find it.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4">
            <p className="text-sm font-mono text-slate-700">
              Current ID:{" "}
              <span className="font-bold text-indigo-600">{dynamicId}</span>
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

        {/* Shadow DOM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Shadow DOM</h2>
          <p className="text-sm text-slate-500 mb-4">
            Interact with elements hidden inside a Shadow Root.
          </p>

          <div id="shadow-host" className="mb-4"></div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 min-h-[3rem]">
            <p id="shadow-result" className="text-slate-700 font-medium">
              {shadowContent
                ? `Submitted: ${shadowContent}`
                : "Result will appear here"}
            </p>
          </div>
        </div>

        {/* Star Rating (Custom Component) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Star Rating</h2>
          <p className="text-sm text-slate-500 mb-4">
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
                    : "text-slate-300 hover:text-amber-200"
                }`}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 min-h-[3rem]">
            <p id="rating-result" className="text-slate-700 font-medium">
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
