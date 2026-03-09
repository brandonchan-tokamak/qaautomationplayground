import { useState, useEffect } from "react";

export default function WaitConditions() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [delayedText, setDelayedText] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger alert
  const triggerAlert = () => {
    setTimeout(() => {
      setAlertVisible(true);
    }, 3000);
  };

  // Delayed text
  const triggerDelayedText = () => {
    setDelayedText("");
    setTimeout(() => {
      setDelayedText("This text appeared after 5 seconds!");
    }, 5000);
  };

  // Enable button
  const triggerEnableButton = () => {
    setButtonEnabled(false);
    setTimeout(() => {
      setButtonEnabled(true);
    }, 4000);
  };

  // Progress bar
  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Wait Conditions</h1>
        <p className="text-slate-600 mt-2">
          Practice waiting for elements to appear, disappear, or change state.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delayed Alert */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Delayed Alert</h2>
          <p className="text-sm text-slate-500 mb-4">
            Click the button and wait 3 seconds for an alert to appear.
          </p>
          <button
            id="trigger-alert"
            onClick={triggerAlert}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Trigger Alert
          </button>
          {alertVisible && (
            <div
              id="delayed-alert"
              className="mt-4 p-4 bg-amber-100 border border-amber-300 text-amber-800 rounded-lg flex justify-between items-center"
            >
              <span>This is a delayed alert!</span>
              <button
                onClick={() => setAlertVisible(false)}
                className="text-amber-800 font-bold hover:text-amber-900"
              >
                &times;
              </button>
            </div>
          )}
        </div>

        {/* Delayed Text */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Delayed Text</h2>
          <p className="text-sm text-slate-500 mb-4">
            Click the button and wait 5 seconds for text to appear.
          </p>
          <button
            id="trigger-text"
            onClick={triggerDelayedText}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Trigger Text
          </button>
          {delayedText && (
            <p
              id="delayed-text"
              className="mt-4 font-medium text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200"
            >
              {delayedText}
            </p>
          )}
        </div>

        {/* Enable Button */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Enable Button</h2>
          <p className="text-sm text-slate-500 mb-4">
            Click the first button to enable the second button after 4 seconds.
          </p>
          <div className="flex gap-4">
            <button
              id="trigger-enable"
              onClick={triggerEnableButton}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Timer
            </button>
            <button
              id="target-button"
              disabled={!buttonEnabled}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                buttonEnabled
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {buttonEnabled ? "Enabled!" : "Disabled"}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Progress Bar</h2>
          <p className="text-sm text-slate-500 mb-4">
            Wait for the progress bar to reach 100%.
          </p>
          <button
            id="start-progress"
            onClick={startProgress}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mb-4"
          >
            Start Progress
          </button>
          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div
              id="progress-bar"
              className="bg-purple-600 h-4 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <p
            id="progress-text"
            className="mt-2 text-sm font-medium text-slate-700 text-right"
          >
            {progress}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}
