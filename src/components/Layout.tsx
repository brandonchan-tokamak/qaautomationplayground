import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Home,
  Clock,
  Keyboard,
  MousePointer2,
  AppWindow,
  LayoutTemplate,
  FileText,
  UserCircle,
  Wand2,
  Menu,
  X,
  GraduationCap,
  Table,
  Search,
  Moon,
  Sun
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/tutorial", label: "Tutorial", icon: GraduationCap },
  { path: "/tables", label: "Tables", icon: Table },
  { path: "/search", label: "Search", icon: Search },
  { path: "/wait-conditions", label: "Wait Conditions", icon: Clock },
  { path: "/keyboard-actions", label: "Keyboard Actions", icon: Keyboard },
  { path: "/mouse-actions", label: "Mouse Actions", icon: MousePointer2 },
  { path: "/popup-windows", label: "Popup Windows", icon: AppWindow },
  { path: "/frames", label: "Frames", icon: LayoutTemplate },
  { path: "/forms", label: "Forms", icon: FileText },
  { path: "/sample-pages", label: "Sample Pages", icon: UserCircle },
  { path: "/advanced-ui", label: "Advanced UI", icon: Wand2 },
];

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row transition-colors duration-200">
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-600 dark:bg-indigo-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Automation Playground</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-1">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
        ${isMobileMenuOpen ? "block" : "hidden"} 
        md:flex flex-col w-full md:w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-shrink-0 transition-colors duration-200
      `}
      >
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Automation
            <br />
            Playground
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Practice your skills</p>
        </div>

        <div className="px-4 pt-2 pb-6 hidden md:block">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              {isDarkMode ? <Moon size={16} className="text-indigo-400" /> : <Sun size={16} className="text-amber-500" />}
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>

        <nav className="px-4 pb-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-8 max-w-5xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
