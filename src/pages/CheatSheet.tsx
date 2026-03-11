import React from 'react';

export default function CheatSheet() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cheat Sheet</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Code block templates and XPath cheat sheet for Selenium.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">XPath Cheat Sheet for Selenium</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200">#</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Concept</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200">XPath Syntax</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Example & Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">1</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">By ID</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//input[@id='email']</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Find element by ID</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">2</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">By Name</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//input[@name='username']</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Find element by Name</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">3</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">By Text</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//button[text()='Login']</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Find element by Visible Text</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">4</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">Contains</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//input[contains(@id,'user')]</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Partial match in attribute</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">5</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">Starts-With</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//input[starts-with(@id,'user')]</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Starts with text</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">6</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">AND Condition</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//input[@id='email' and @name='userEmail']</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Multiple attributes</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">7</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">OR Condition</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//button[@id='loginBtn' or text()='Login']</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Either attribute or text</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">8</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">Parent</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//label[text()='Email']/parent::div</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Go to Parent</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">9</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">Following-Sibling</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//label[text()='Password']/following-sibling::input</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Next element</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">10</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">Ancestor</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//input[@name='email']/ancestor::div</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Go up to Ancestor</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">11</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">Descendant</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"><code className="px-2 py-1 bg-slate-900 rounded text-emerald-400">//div[@class='login']//input</code></td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Element inside div</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
            💡 Pro Tip: Try ➔ id ➔ name ➔ text() ➔ contains() ➔ parent/sibling
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">TestObject Code Block Template</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Copy and paste this template to quickly create a new TestObject in Katalon Studio.</p>
        </div>
        <div className="p-6 bg-slate-900">
          <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">
{`import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

def myElement = new TestObject()
myElement.addProperty('xpath', ConditionType.EQUALS, "//your/xpath/here")
WebUI.click(myElement)`}
          </pre>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Wait Conditions Template</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Common wait strategies to handle dynamic content.</p>
        </div>
        <div className="p-6 bg-slate-900">
          <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">
{`// Wait for element to be visible (timeout in seconds)
WebUI.waitForElementVisible(myElement, 10)

// Wait for element to be clickable
WebUI.waitForElementClickable(myElement, 10)

// Wait for element to be present in DOM
WebUI.waitForElementPresent(myElement, 10)`}
          </pre>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Dropdown Selection Template</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Different ways to select options from a dropdown menu.</p>
        </div>
        <div className="p-6 bg-slate-900">
          <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">
{`// Select by visible text
WebUI.selectOptionByLabel(myDropdown, 'Option Text', false)

// Select by value attribute
WebUI.selectOptionByValue(myDropdown, 'option_value', false)

// Select by index (0-based)
WebUI.selectOptionByIndex(myDropdown, 1)`}
          </pre>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Execute JavaScript Template</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Run custom JavaScript when standard WebUI clicks fail or for advanced interactions.</p>
        </div>
        <div className="p-6 bg-slate-900">
          <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap">
{`import org.openqa.selenium.WebElement
import com.kms.katalon.core.webui.common.WebUiCommonHelper

// Click an element using JavaScript
WebElement element = WebUiCommonHelper.findWebElement(myElement, 30)
WebUI.executeJavaScript("arguments[0].click();", Arrays.asList(element))

// Scroll to bottom of the page
WebUI.executeJavaScript("window.scrollTo(0, document.body.scrollHeight);", null)`}
          </pre>
        </div>
      </div>
    </div>
  );
}
