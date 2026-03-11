import { Link } from "react-router-dom";
import {
  Clock,
  Keyboard,
  MousePointer2,
  AppWindow,
  LayoutTemplate,
  FileText,
  UserCircle,
  Wand2,
  ArrowRight,
  Trophy,
  BookOpen,
  Table,
  Search
} from "lucide-react";

const categories = [
  {
    path: "/learn",
    label: "Learn",
    description: "Learn how to identify elements and interact with them.",
    icon: BookOpen,
    color: "bg-purple-500",
  },
  {
    path: "/tutorial",
    label: "Challenge",
    description: "Step-by-step guides to automate common UI elements.",
    icon: Trophy,
    color: "bg-indigo-500",
  },
  {
    path: "/tables",
    label: "Tables",
    description: "Practice interacting with static and dynamic tables.",
    icon: Table,
    color: "bg-blue-500",
  },
  {
    path: "/search",
    label: "Search",
    description: "Practice searching and filtering populated tables.",
    icon: Search,
    color: "bg-emerald-500",
  },
  {
    path: "/wait-conditions",
    label: "Wait Conditions",
    description:
      "Practice waiting for elements to appear, disappear, or change state.",
    icon: Clock,
    color: "bg-amber-500",
  },
  {
    path: "/keyboard-actions",
    label: "Keyboard Actions",
    description: "Test typing, special keys, and keyboard shortcuts.",
    icon: Keyboard,
    color: "bg-purple-500",
  },
  {
    path: "/mouse-actions",
    label: "Mouse Actions",
    description:
      "Practice clicks, double-clicks, right-clicks, and hover effects.",
    icon: MousePointer2,
    color: "bg-pink-500",
  },
  {
    path: "/popup-windows",
    label: "Popup Windows",
    description: "Handle multiple browser windows and tabs.",
    icon: AppWindow,
    color: "bg-cyan-500",
  },
  {
    path: "/frames",
    label: "Frames",
    description: "Switch contexts to interact with elements inside iframes.",
    icon: LayoutTemplate,
    color: "bg-rose-500",
  },
  {
    path: "/forms",
    label: "Forms",
    description: "Fill out complex forms with various input types.",
    icon: FileText,
    color: "bg-orange-500",
  },
  {
    path: "/sample-pages",
    label: "Sample Pages",
    description: "Complete end-to-end flows like login and registration.",
    icon: UserCircle,
    color: "bg-teal-500",
  },
  {
    path: "/advanced-ui",
    label: "Advanced UI",
    description: "Tackle drag and drop, shadow DOM, and dynamic elements.",
    icon: Wand2,
    color: "bg-fuchsia-500",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          QA's Playground
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
          practice practice practice practice practice practice practice practice practice practice practice practice practice practice practice 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.path}
              to={category.path}
              className="group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 transition-all flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 ${category.color}`}
              >
                <Icon size={24} />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {category.label}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 flex-grow mb-4 transition-colors">
                {category.description}
              </p>
              <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-auto transition-colors">
                Start practice{" "}
                <ArrowRight
                  size={16}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
