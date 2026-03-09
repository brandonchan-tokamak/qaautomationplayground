import { useState, MouseEvent } from "react";

export default function MouseActions() {
  const [clickResult, setClickResult] = useState("");
  const [hoverState, setHoverState] = useState(false);
  const [dragState, setDragState] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickResult("Single Clicked!");
  };

  const handleDoubleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickResult("Double Clicked!");
  };

  const handleRightClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickResult("Right Clicked!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mouse Actions</h1>
        <p className="text-slate-600 mt-2">
          Practice clicks, double-clicks, right-clicks, and hover effects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Click Types */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Click Types</h2>
          <p className="text-sm text-slate-500 mb-4">
            Test different types of mouse clicks.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              id="single-click"
              onClick={handleClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Single Click
            </button>
            <button
              id="double-click"
              onDoubleClick={handleDoubleClick}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Double Click
            </button>
            <button
              id="right-click"
              onContextMenu={handleRightClick}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Right Click
            </button>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 min-h-[3rem]">
            <p id="click-result" className="text-slate-700 font-medium">
              {clickResult || "Result will appear here"}
            </p>
          </div>
        </div>

        {/* Hover Action */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Hover Action</h2>
          <p className="text-sm text-slate-500 mb-4">
            Hover over the element to reveal hidden content.
          </p>
          <div
            id="hover-target"
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            className="w-full h-32 bg-indigo-100 border-2 border-dashed border-indigo-300 rounded-xl flex items-center justify-center cursor-pointer transition-colors hover:bg-indigo-200"
          >
            <span className="text-indigo-600 font-medium">Hover me!</span>
          </div>
          {hoverState && (
            <div
              id="hover-content"
              className="mt-4 p-4 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200 font-medium animate-in fade-in slide-in-from-top-2"
            >
              You found the hidden content!
            </div>
          )}
        </div>

        {/* Drag and Drop (Simple) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Simple Drag & Drop</h2>
          <p className="text-sm text-slate-500 mb-4">
            Drag the item into the drop zone.
          </p>
          <div className="flex gap-8 items-center">
            <div
              id="draggable-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "dragged-item");
              }}
              className="w-24 h-24 bg-rose-500 text-white rounded-xl flex items-center justify-center font-medium cursor-move shadow-md hover:shadow-lg transition-shadow"
            >
              Drag Me
            </div>
            <div
              id="drop-zone"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add(
                  "bg-slate-100",
                  "border-rose-400",
                );
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove(
                  "bg-slate-100",
                  "border-rose-400",
                );
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove(
                  "bg-slate-100",
                  "border-rose-400",
                );
                if (e.dataTransfer.getData("text/plain") === "dragged-item") {
                  setDragState(true);
                }
              }}
              className={`w-48 h-48 border-2 border-dashed rounded-xl flex items-center justify-center transition-colors ${
                dragState ? "bg-rose-50 border-rose-500" : "border-slate-300"
              }`}
            >
              {dragState ? (
                <span id="drop-success" className="text-rose-600 font-bold">
                  Dropped Successfully!
                </span>
              ) : (
                <span className="text-slate-400 font-medium">Drop Zone</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
