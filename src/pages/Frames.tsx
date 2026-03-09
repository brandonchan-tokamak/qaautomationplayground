export default function Frames() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Frames</h1>
        <p className="text-slate-600 mt-2">
          Switch contexts to interact with elements inside iframes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Iframe Container */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Iframe Container</h2>
          <p className="text-sm text-slate-500 mb-4">
            The content below is loaded inside an iframe. You must switch to the
            iframe context to interact with its elements.
          </p>

          <div className="border-4 border-dashed border-indigo-200 rounded-xl overflow-hidden h-[400px]">
            <iframe
              id="test-iframe"
              src="/iframe-content"
              title="Test Iframe"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
