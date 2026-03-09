import { useState } from 'react';
import { ChevronRight, ChevronDown, Code } from 'lucide-react';

const lessons = [
  {
    id: 'textbox',
    title: 'Lesson 1: Filling a Simple Textbox',
    description: 'Learn how to locate a text input field and type text into it using Katalon Studio.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white">
        <label htmlFor="tutorial-name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
        <input id="tutorial-name" type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter your name" />
      </div>
    ),
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')

WebUI.maximizeWindow()

WebDriver driver = com.kms.katalon.core.webui.driver.DriverFactory.getWebDriver()
driver.findElement(By.id('tutorial-name')).sendKeys('John Doe')

WebUI.delay(3)

WebUI.closeBrowser()`
  },
  {
    id: 'button-click',
    title: 'Lesson 2: Clicking a Button',
    description: 'Learn how to locate a button and perform a click action.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white">
        <button id="tutorial-button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" onClick={() => alert('Button clicked!')}>
          Click Me
        </button>
      </div>
    ),
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

WebUI.openBrowser('')
WebUI.maximizeWindow()
WebUI.navigateToUrl('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')

WebDriver driver = com.kms.katalon.core.webui.driver.DriverFactory.getWebDriver()

driver.findElement(By.xpath('//h2[text()="Lesson 2: Clicking a Button"]')).click()
driver.findElement(By.id('tutorial-button')).click()

WebUI.delay(3)

WebUI.closeBrowser()`
  },
  {
    id: 'dropdown',
    title: 'Lesson 3: Selecting from a Dropdown',
    description: 'Learn how to select an option from a dropdown menu by its visible text.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white">
        <label htmlFor="tutorial-dropdown" className="block text-sm font-medium text-slate-700 mb-1">Select an option</label>
        <select id="tutorial-dropdown" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
          <option value="">Choose...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
    ),
    script: `import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

// Navigate to the page
WebUI.navigateToUrl('http://localhost:3000/tutorial')

// Select option by visible text
WebUI.selectOptionByLabel(findTestObject('Object Repository/Tutorial/select_Dropdown'), 'Option 2', false)

// Verify the selected option
WebUI.verifyOptionSelectedByLabel(findTestObject('Object Repository/Tutorial/select_Dropdown'), 'Option 2', false, 5)`
  },
  {
    id: 'wait',
    title: 'Lesson 4: Waiting for an Element',
    description: 'Learn how to wait for an element to become visible before interacting with it.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white">
        <button 
          id="tutorial-wait-btn" 
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          onClick={(e) => {
            const btn = e.target as HTMLButtonElement;
            btn.disabled = true;
            btn.innerText = 'Loading...';
            setTimeout(() => {
              const msg = document.createElement('div');
              msg.id = 'tutorial-success-msg';
              msg.className = 'mt-4 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-medium';
              msg.innerText = 'Action completed successfully!';
              btn.parentElement?.appendChild(msg);
              btn.innerText = 'Done';
            }, 3000);
          }}
        >
          Start Action (3s)
        </button>
      </div>
    ),
    script: `import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

// Navigate to the page
WebUI.navigateToUrl('http://localhost:3000/tutorial')

// Click the button to start action
WebUI.click(findTestObject('Object Repository/Tutorial/btn_StartAction'))

// Wait for the success message to be visible (up to 10 seconds)
WebUI.waitForElementVisible(findTestObject('Object Repository/Tutorial/msg_Success'), 10)

// Verify the message text
WebUI.verifyElementText(findTestObject('Object Repository/Tutorial/msg_Success'), 'Action completed successfully!')`
  }
];

export default function Tutorial() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(lessons[0].id);
  const [revealedScripts, setRevealedScripts] = useState<Record<string, boolean>>({});

  const toggleLesson = (id: string) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  const toggleScript = (id: string) => {
    setRevealedScripts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tutorial</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Step-by-step guides to automate common UI elements using Katalon Studio.</p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <button 
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              onClick={() => toggleLesson(lesson.id)}
            >
              <h2 className="text-lg font-semibold text-slate-900">{lesson.title}</h2>
              {expandedLesson === lesson.id ? <ChevronDown size={20} className="text-slate-500" /> : <ChevronRight size={20} className="text-slate-500" />}
            </button>
            
            {expandedLesson === lesson.id && (
              <div className="p-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
                <p className="text-slate-600 mb-4">{lesson.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Practice Element</h3>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    {lesson.element}
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => toggleScript(lesson.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <Code size={18} />
                    {revealedScripts[lesson.id] ? 'Hide Script' : 'Reveal Katalon Script'}
                  </button>

                  {revealedScripts[lesson.id] && (
                    <div className="mt-4 p-4 bg-slate-900 rounded-xl overflow-x-auto animate-in fade-in slide-in-from-top-2">
                      <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">
                        {lesson.script}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
