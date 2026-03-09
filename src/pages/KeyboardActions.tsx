import { useState, KeyboardEvent } from "react";

export default function KeyboardActions() {
  const [typedText, setTypedText] = useState("");
  const [specialKey, setSpecialKey] = useState("");
  const [shortcut, setShortcut] = useState("");

  const handleSpecialKey = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter") setSpecialKey("Enter key pressed");
    else if (e.key === "Escape") setSpecialKey("Escape key pressed");
    else if (e.key === "Tab") setSpecialKey("Tab key pressed");
    else if (e.key === "ArrowUp") setSpecialKey("Up Arrow pressed");
    else if (e.key === "ArrowDown") setSpecialKey("Down Arrow pressed");
    else setSpecialKey(`Key pressed: ${e.key}`);
  };

  const handleShortcut = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.ctrlKey && e.key === "c") setShortcut("Ctrl + C pressed");
    else if (e.ctrlKey && e.key === "v") setShortcut("Ctrl + V pressed");
    else if (e.altKey && e.key === "s") setShortcut("Alt + S pressed");
    else if (e.shiftKey && e.key === "A") setShortcut("Shift + A pressed");
    else
      setShortcut(
        `Shortcut: ${e.ctrlKey ? "Ctrl+" : ""}${e.altKey ? "Alt+" : ""}${e.shiftKey ? "Shift+" : ""}${e.key}`,
      );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Keyboard Actions</h1>
        <p className="text-slate-600 mt-2">
          Test typing, special keys, and keyboard shortcuts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simple Typing */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Simple Typing</h2>
          <p className="text-sm text-slate-500 mb-4">
            Type text into the input field and verify the output below.
          </p>
          <input
            id="simple-typing"
            type="text"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Type something here..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          />
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 min-h-[3rem]">
            <p id="typing-output" className="text-slate-700 font-medium">
              {typedText || "Output will appear here"}
            </p>
          </div>
        </div>

        {/* Special Keys */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">Special Keys</h2>
          <p className="text-sm text-slate-500 mb-4">
            Press special keys (Enter, Esc, Tab, Arrows) in the input field.
          </p>
          <input
            id="special-keys"
            type="text"
            onKeyDown={handleSpecialKey}
            placeholder="Press a special key..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 min-h-[3rem]">
            <p id="special-key-output" className="text-blue-700 font-medium">
              {specialKey || "Output will appear here"}
            </p>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
          <p className="text-sm text-slate-500 mb-4">
            Try combinations like Ctrl+C, Ctrl+V, Alt+S, or Shift+A.
          </p>
          <input
            id="keyboard-shortcuts"
            type="text"
            onKeyDown={handleShortcut}
            placeholder="Press a keyboard shortcut..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
          />
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200 min-h-[3rem]">
            <p id="shortcut-output" className="text-purple-700 font-medium">
              {shortcut || "Output will appear here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
