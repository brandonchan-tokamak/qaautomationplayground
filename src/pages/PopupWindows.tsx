import { useState } from "react";

export default function PopupWindows() {
  const [popupMessage, setPopupMessage] = useState("");

  const openNewTab = () => {
    window.open("https://example.com", "_blank");
  };

  const openNewWindow = () => {
    window.open("https://example.com", "newwindow", "width=600,height=400");
  };

  const triggerAlert = () => {
    window.alert("This is a native browser alert!");
    setPopupMessage("Alert accepted");
  };

  const triggerConfirm = () => {
    const result = window.confirm("Do you accept the terms and conditions?");
    setPopupMessage(result ? "Confirm accepted" : "Confirm dismissed");
  };

  const triggerPrompt = () => {
    const result = window.prompt("Please enter your name:");
    setPopupMessage(result ? `Prompt entered: ${result}` : "Prompt cancelled");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Popup Windows & Alerts
        </h1>
        <p className="text-slate-600 mt-2">
          Handle multiple browser windows, tabs, and native dialogs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Browser Windows */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Browser Windows</h2>
          <p className="text-sm text-slate-500 mb-4">
            Open links in new tabs or windows.
          </p>
          <div className="flex flex-col gap-4">
            <button
              id="open-tab"
              onClick={openNewTab}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full text-left"
            >
              Open New Tab
            </button>
            <button
              id="open-window"
              onClick={openNewWindow}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors w-full text-left"
            >
              Open New Window
            </button>
          </div>
        </div>

        {/* Native Dialogs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Native Dialogs</h2>
          <p className="text-sm text-slate-500 mb-4">
            Interact with browser alerts, confirms, and prompts.
          </p>
          <div className="flex flex-col gap-4 mb-6">
            <button
              id="trigger-alert"
              onClick={triggerAlert}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors w-full text-left"
            >
              Trigger Alert
            </button>
            <button
              id="trigger-confirm"
              onClick={triggerConfirm}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors w-full text-left"
            >
              Trigger Confirm
            </button>
            <button
              id="trigger-prompt"
              onClick={triggerPrompt}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors w-full text-left"
            >
              Trigger Prompt
            </button>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 min-h-[3rem]">
            <p id="dialog-result" className="text-slate-700 font-medium">
              {popupMessage || "Result will appear here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
