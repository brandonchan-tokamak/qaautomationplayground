import { useState } from 'react';
import { ChevronRight, ChevronDown, Code } from 'lucide-react';
import { trackScriptReveal } from '../utils/tracking';

const Lesson2Element = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="my-4 p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 flex items-center gap-4">
      <button 
        id="tutorial-button" 
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" 
        onClick={() => {
          setClicked(true);
          alert('Button clicked!');
        }}
      >
        Click Me
      </button>
      {clicked && (
        <span className="text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in duration-300">
          You did it! Now our boss Kelvin will buy you a meal!
        </span>
      )}
    </div>
  );
};

const lessons = [
  {
    id: 'textbox',
    title: 'Challenge 1: Filling a Simple Textbox',
    description: 'Learn how to locate a text input field and type text into it using Katalon Studio.',
    element: (
      <div className="flex flex-col md:flex-row gap-6 items-start my-4">
        <div className="p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 w-full md:w-1/2">
          <label htmlFor="tutorial-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">How much do you want 财神爷 to bless you with?</label>
          <input id="tutorial-name" type="text" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-900 dark:text-white" placeholder="Huat ah!" />
        </div>
        <div className="w-full md:w-1/2">
          <img src="https://drive.google.com/thumbnail?id=1RLO5OPyNgbNM_hbLDqYKFcFeejQploB6&sz=w800" alt="财神爷" className="rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 w-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    ),
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')

WebUI.maximizeWindow()

WebDriver driver = com.kms.katalon.core.webui.driver.DriverFactory.getWebDriver()
driver.findElement(By.id('tutorial-name')).sendKeys('$88888888')

WebUI.delay(3)

WebUI.closeBrowser()`
  },
  {
    id: 'button-click',
    title: 'Challenge 2: Clicking a Button',
    description: 'Learn how to locate a button and perform a click action.',
    element: <Lesson2Element />,
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')
WebUI.maximizeWindow()

WebDriver driver = com.kms.katalon.core.webui.driver.DriverFactory.getWebDriver()

driver.findElement(By.xpath('//h2[text()="Challenge 2: Clicking a Button"]')).click()
driver.findElement(By.id('tutorial-button')).click()

WebUI.delay(3)

WebUI.closeBrowser()`
  },
  {
    id: 'dropdown',
    title: 'Challenge 3: Selecting from a Dropdown',
    description: 'Learn how to select an option from a dropdown menu by its visible text.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700">
        <label htmlFor="tutorial-dropdown" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Who do you think will be taking MC this week?</label>
        <select id="tutorial-dropdown" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
          <option value="">Choose...</option>
          <option value="brandon">Brandon</option>
          <option value="kai-ting">Kai Ting</option>
          <option value="kelvin">Kelvin</option>
          <option value="kenneth">Kenneth</option>
          <option value="pei-ru">Pei Ru</option>
          <option value="perry">Perry</option>
        </select>
      </div>
    ),
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')
WebUI.maximizeWindow()

def challenge3 = new TestObject()
challenge3.addProperty('xpath', ConditionType.EQUALS, "//h2[contains(text(), 'Challenge 3: Selecting from a Dropdown')]")
WebUI.click(challenge3)

def dropdown = new TestObject()
dropdown.addProperty('xpath', ConditionType.EQUALS, "//select[@id='tutorial-dropdown']")
WebUI.selectOptionByValue(dropdown, 'brandon', false)

WebUI.delay(3)

WebUI.closeBrowser()`
  },
  {
    id: 'wait',
    title: 'Challenge 4: Waiting for an Element',
    description: 'Learn how to wait for an element to become visible before interacting with it.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700">
        <button 
          id="tutorial-wait-btn" 
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
          onClick={(e) => {
            const btn = e.target as HTMLButtonElement;
            btn.disabled = true;
            btn.innerText = 'Loading...';
            setTimeout(() => {
              const msg = document.createElement('div');
              msg.id = 'tutorial-success-msg';
              msg.className = 'mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg font-medium';
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
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')
WebUI.maximizeWindow()

def challenge4 = new TestObject()
challenge4.addProperty('xpath', ConditionType.EQUALS, "//h2[contains(text(), 'Challenge 4: Waiting for an Element')]")
WebUI.click(challenge4)

def startBtn = new TestObject()
startBtn.addProperty('xpath', ConditionType.EQUALS, "//*[@id='tutorial-wait-btn']")
WebUI.click(startBtn)

def successMsg = new TestObject()
successMsg.addProperty('xpath', ConditionType.EQUALS, "//*[contains(text(), 'Action completed successfully!')]")
WebUI.waitForElementVisible(successMsg, 10)

WebUI.verifyElementText(successMsg, 'Action completed successfully!')

WebUI.closeBrowser()`
  },
  {
    id: 'radio',
    title: 'Challenge 5: Selecting Radio Buttons',
    description: 'Learn how to interact with radio buttons and verify their selection state.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700">
        <p className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">What is your preferred time to knock off from work?</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="radio" id="radio-9am" name="knockoff" value="9am" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="radio-9am" className="ml-2 text-sm text-slate-700 dark:text-slate-300">9am</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="radio-1pm" name="knockoff" value="1pm" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="radio-1pm" className="ml-2 text-sm text-slate-700 dark:text-slate-300">1pm</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="radio-6pm" name="knockoff" value="6pm" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="radio-6pm" className="ml-2 text-sm text-slate-700 dark:text-slate-300">6pm</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="radio-never" name="knockoff" value="never" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="radio-never" className="ml-2 text-sm text-slate-700 dark:text-slate-300">I do not even want to turn up for work</label>
          </div>
        </div>
      </div>
    ),
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')
WebUI.maximizeWindow()

def challenge5 = new TestObject()
challenge5.addProperty('xpath', ConditionType.EQUALS, "//h2[contains(text(), 'Challenge 5: Selecting Radio Buttons')]")
WebUI.click(challenge5)

def radioNever = new TestObject()
radioNever.addProperty('xpath', ConditionType.EQUALS, "//input[@id='radio-never']")
WebUI.click(radioNever)

WebUI.verifyElementChecked(radioNever, 5)

WebUI.delay(3)

WebUI.closeBrowser()`
  },
  {
    id: 'checkbox',
    title: 'Challenge 6: Selecting Checkboxes',
    description: 'Learn how to interact with checkboxes and verify their selection state.',
    element: (
      <div className="my-4 p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700">
        <p className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">What illness(es) do you think you will suffer this week?</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="checkbox-arteritis" name="illness" value="arteritis" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="checkbox-arteritis" className="ml-2 text-sm text-slate-700 dark:text-slate-300">Arteritis</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox-cancer" name="illness" value="cancer" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="checkbox-cancer" className="ml-2 text-sm text-slate-700 dark:text-slate-300">Cancer</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox-covid" name="illness" value="covid" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="checkbox-covid" className="ml-2 text-sm text-slate-700 dark:text-slate-300">Covid</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox-flu" name="illness" value="flu" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="checkbox-flu" className="ml-2 text-sm text-slate-700 dark:text-slate-300">Flu</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox-pregnancy" name="illness" value="pregnancy" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="checkbox-pregnancy" className="ml-2 text-sm text-slate-700 dark:text-slate-300">Pregnancy</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox-tinea-pedis" name="illness" value="tinea-pedis" className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:bg-slate-900" />
            <label htmlFor="checkbox-tinea-pedis" className="ml-2 text-sm text-slate-700 dark:text-slate-300">Tinea Pedis</label>
          </div>
        </div>
      </div>
    ),
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/tutorial')
WebUI.maximizeWindow()

def challenge6 = new TestObject()
challenge6.addProperty('xpath', ConditionType.EQUALS, "//h2[contains(text(), 'Challenge 6: Selecting Checkboxes')]")
WebUI.click(challenge6)

def checkboxCovid = new TestObject()
checkboxCovid.addProperty('xpath', ConditionType.EQUALS, "//input[@id='checkbox-covid']")
WebUI.check(checkboxCovid)
WebUI.verifyElementChecked(checkboxCovid, 5)

def checkboxPregnancy = new TestObject()
checkboxPregnancy.addProperty('xpath', ConditionType.EQUALS, "//input[@id='checkbox-pregnancy']")
WebUI.check(checkboxPregnancy)
WebUI.verifyElementChecked(checkboxPregnancy, 5)

WebUI.delay(3)

WebUI.closeBrowser()`
  }
];

export default function Tutorial() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(lessons[0].id);
  const [revealedScripts, setRevealedScripts] = useState<Record<string, boolean>>({});

  const toggleLesson = (id: string) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  const toggleScript = (id: string) => {
    if (!revealedScripts[id]) {
      trackScriptReveal(id);
    }
    setRevealedScripts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Automation Challenge</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Step-by-step guides to automate common UI elements using Katalon Studio. All scripts must be written using Katalon Studio</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Forms</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  onClick={() => toggleLesson(lesson.id)}
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{lesson.title}</h3>
                  {expandedLesson === lesson.id ? <ChevronDown size={20} className="text-slate-500 dark:text-slate-400" /> : <ChevronRight size={20} className="text-slate-500 dark:text-slate-400" />}
                </button>
                
                {expandedLesson === lesson.id && (
                  <div className="p-6 border-t border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{lesson.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2">Practice Element</h4>
                      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
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
      </div>
    </div>
  );
}
