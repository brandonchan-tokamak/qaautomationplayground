import { useState } from 'react';
import { ChevronDown, MousePointer2, Code, Search, CheckCircle2 } from 'lucide-react';

const topics = [
  { id: 'textbox', label: 'Textbox' }
];

export default function Learn() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].id);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  const handleCheckAnswer = () => {
    if (answer.trim() === 'practice-textbox') {
      setFeedback({ message: 'You are correct!', isCorrect: true });
    } else {
      setFeedback({ message: 'Try again!', isCorrect: false });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Learn Automation</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Select a topic below to learn how to identify elements and interact with them.
        </p>
        
        <div className="relative inline-block w-64">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="block w-full appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {topics.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {selectedTopic === 'textbox' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Practice Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-indigo-50 dark:bg-indigo-900/20">
              <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">Practice Area</h2>
              <p className="text-indigo-700 dark:text-indigo-300 mt-2">
                Try inspecting the textbox below using the steps you learned.
              </p>
            </div>
            <div className="p-6">
              <div className="max-w-md mx-auto">
                <label htmlFor="practice-textbox" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Practice Textbox
                </label>
                <input 
                  id="practice-textbox" 
                  name="practice-input"
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white" 
                  placeholder="Type something here..." 
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Hint: Right-click this input field and select "Inspect" to find its ID and Name.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Inspect a Textbox</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Follow these steps to find the ID, Name, or XPath of a textbox so you can interact with it in your automation scripts.
              </p>
            </div>
            
            <div className="p-6 space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                  1
                </div>
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <MousePointer2 className="w-5 h-5" /> Right-Click the Element
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Hover your mouse over the textbox you want to interact with. Right-click on it and select <strong>"Inspect"</strong> (or "Inspect Element" depending on your browser) from the context menu.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <img 
                      src="https://picsum.photos/seed/inspect/800/400" 
                      alt="Right click and inspect" 
                      className="rounded shadow-sm w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <p className="text-xs text-slate-500 mt-2 text-center italic">Example: Right-clicking a textbox to open the context menu.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                  2
                </div>
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Code className="w-5 h-5" /> Locate the HTML Tag
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    The Developer Tools panel will open, highlighting the HTML code for the textbox. Look for the <code>&lt;input&gt;</code> tag.
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <img 
                      src="https://picsum.photos/seed/devtools/800/400" 
                      alt="Developer tools highlighting the input element" 
                      className="rounded shadow-sm w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <p className="text-xs text-slate-500 mt-2 text-center italic">The highlighted line shows the exact element in the DOM.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                  3
                </div>
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Search className="w-5 h-5" /> Find the ID or XPath
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Inside the highlighted <code>&lt;input&gt;</code> tag, look for attributes like <code>id="..."</code> or <code>name="..."</code>. These are the best selectors to use.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    If there is no ID or Name, you can right-click the highlighted HTML line in the Developer Tools, select <strong>Copy</strong>, and then <strong>Copy XPath</strong>.
                  </p>
                  <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-emerald-400 overflow-x-auto">
                    {`<!-- Example HTML -->\n<input id="username" name="user" type="text" class="input-field" />\n\n// Best Selector: id="username"\n// Fallback XPath: //input[@id='username']`}
                  </div>
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                  4
                </div>
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Test Your Knowledge
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    What is the best selector option (the ID) for the "Practice Textbox" above?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="text" 
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="flex-grow px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white" 
                      placeholder="Enter the ID here..." 
                    />
                    <button 
                      onClick={handleCheckAnswer}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
                    >
                      Check Answer
                    </button>
                  </div>
                  {feedback && (
                    <div className={`p-4 rounded-lg font-medium ${feedback.isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800'}`}>
                      {feedback.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
