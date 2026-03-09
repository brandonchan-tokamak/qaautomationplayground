export default function IframeContent() {
  return (
    <div className="p-8 bg-indigo-50 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-900 mb-4">
        Iframe Content
      </h1>
      <p className="text-indigo-700 mb-6">
        This content is loaded inside an iframe.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="iframe-input"
            className="block text-sm font-medium text-indigo-800 mb-1"
          >
            Enter text here:
          </label>
          <input
            id="iframe-input"
            type="text"
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Type inside iframe..."
          />
        </div>

        <button
          id="iframe-button"
          onClick={() => alert("Button clicked inside iframe!")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Click Me
        </button>
      </div>
    </div>
  );
}
