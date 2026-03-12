import { useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { ChevronRight, ChevronDown, Code } from 'lucide-react';
import { trackScriptReveal } from '../utils/tracking';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../ag-grid-theme.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const agGridLessons = [
  {
    id: 'ag-grid-sort',
    title: 'Challenge 1: Sort a Column',
    description: 'Learn how to click a column header to sort the grid and verify the first row.',
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/ag-grid')
WebUI.maximizeWindow()

// Click the "Price" column header to sort ascending
def priceHeader = new TestObject()
priceHeader.addProperty('xpath', ConditionType.EQUALS, "//div[contains(@class, 'ag-header-cell')]//span[text()='Price']")
WebUI.click(priceHeader)

WebUI.delay(2)

// Verify the first row's Make is "Fiat" (lowest price)
def firstRowMake = new TestObject()
firstRowMake.addProperty('xpath', ConditionType.EQUALS, "//div[@row-index='0']//div[@col-id='make']")
WebUI.verifyElementText(firstRowMake, 'Fiat')

WebUI.closeBrowser()`
  },
  {
    id: 'ag-grid-filter',
    title: 'Challenge 2: Filter the Grid',
    description: 'Learn how to type into a floating filter and verify the grid updates.',
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/ag-grid')
WebUI.maximizeWindow()

// Type "Tesla" into the Make floating filter
def makeFilter = new TestObject()
makeFilter.addProperty('xpath', ConditionType.EQUALS, "//div[@col-id='make' and contains(@class, 'ag-floating-filter')]//input")
WebUI.setText(makeFilter, 'Tesla')

WebUI.delay(2)

// Verify that the first row is now a Tesla
def firstRowMake = new TestObject()
firstRowMake.addProperty('xpath', ConditionType.EQUALS, "//div[@row-index='0']//div[@col-id='make']")
WebUI.verifyElementText(firstRowMake, 'Tesla')

WebUI.closeBrowser()`
  },
  {
    id: 'ag-grid-pagination',
    title: 'Challenge 3: Navigate Pagination',
    description: 'Learn how to click the "Next" button in the pagination panel.',
    script: `import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

WebUI.openBrowser('https://brandonchan-tokamak.github.io/qaautomationplayground/#/ag-grid')
WebUI.maximizeWindow()

// Click the "Next Page" button
def nextBtn = new TestObject()
nextBtn.addProperty('xpath', ConditionType.EQUALS, "//button[@aria-label='Next Page']")
WebUI.click(nextBtn)

WebUI.delay(2)

// Verify the page changed (e.g., row-index 10 is now visible)
def row10 = new TestObject()
row10.addProperty('xpath', ConditionType.EQUALS, "//div[@row-index='10']")
WebUI.verifyElementPresent(row10, 5)

WebUI.closeBrowser()`
  }
];

export default function AGGridPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(agGridLessons[0].id);
  const [revealedScripts, setRevealedScripts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Initial check
    checkDarkMode();

    // Setup observer to watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const toggleLesson = (id: string) => {
    setExpandedLesson(expandedLesson === id ? null : id);
  };

  const toggleScript = (id: string) => {
    if (!revealedScripts[id]) {
      trackScriptReveal(id);
    }
    setRevealedScripts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Honda", model: "Civic", price: 25050, electric: false },
    { make: "Chevrolet", model: "Silverado", price: 36800, electric: false },
    { make: "BMW", model: "i4", price: 52200, electric: true },
    { make: "Audi", model: "e-tron", price: 70800, electric: true },
    { make: "Hyundai", model: "Ioniq 5", price: 41650, electric: true },
    { make: "Kia", model: "EV6", price: 42600, electric: true },
    { make: "Volkswagen", model: "ID.4", price: 38995, electric: true },
    { make: "Subaru", model: "Outback", price: 28895, electric: false },
    { make: "Mazda", model: "CX-5", price: 26700, electric: false },
    { make: "Porsche", model: "Taycan", price: 86700, electric: true },
    { make: "Lexus", model: "RX", price: 48600, electric: false },
    { make: "Volvo", model: "XC40", price: 40100, electric: true },
    { make: "Jeep", model: "Wrangler", price: 31895, electric: false },
    { make: "Land Rover", model: "Defender", price: 53500, electric: false },
    { make: "Polestar", model: "2", price: 49900, electric: true },
    { make: "Lucid", model: "Air", price: 77400, electric: true },
    { make: "Rivian", model: "R1T", price: 73000, electric: true },
    { make: "Genesis", model: "GV60", price: 59290, electric: true },
    { make: "Acura", model: "MDX", price: 49550, electric: false },
    { make: "Infiniti", model: "QX60", price: 49200, electric: false },
    { make: "Lincoln", model: "Aviator", price: 53340, electric: false },
    { make: "Cadillac", model: "Lyriq", price: 58590, electric: true },
    { make: "GMC", model: "Hummer EV", price: 98845, electric: true },
    { make: "Mini", model: "Cooper SE", price: 30900, electric: true },
    { make: "Alfa Romeo", model: "Giulia", price: 43320, electric: false },
    { make: "Maserati", model: "Grecale", price: 63500, electric: false },
    { make: "Jaguar", model: "I-PACE", price: 71300, electric: true },
    { make: "Aston Martin", model: "DBX", price: 192086, electric: false },
    { make: "Bentley", model: "Bentayga", price: 191000, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef[]>([
    { field: "make", filter: true, floatingFilter: true, checkboxSelection: true, headerCheckboxSelection: true },
    { field: "model", filter: true, floatingFilter: true },
    { field: "price", filter: "agNumberColumnFilter", valueFormatter: p => "$" + p.value.toLocaleString() },
    { field: "electric", filter: true }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AG Grid</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Practice interacting with complex data grids using AG Grid. Test sorting, filtering, and cell interactions.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Car Inventory Grid</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          A standard AG Grid implementation with sorting, filtering, and pagination enabled.
        </p>

        {/* The AG Grid component */}
        <div 
          className={isDarkMode ? "ag-theme-quartz-dark custom-theme" : "ag-theme-quartz custom-theme"} 
          style={{ height: 500, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
          AG Grid Automation Challenges
        </h2>
        
        {agGridLessons.map((lesson) => (
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
                <p className="text-slate-600 dark:text-slate-400 mb-6">{lesson.description}</p>
                
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
