import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function DatePickers() {
  const [standardDate, setStandardDate] = useState("");
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    setCustomDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setIsCalendarOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select a date";
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getValidationResult = (dateInput: Date | string | null) => {
    if (!dateInput) return { text: "None", color: "text-slate-500 dark:text-slate-400" };
    
    let date: Date;
    if (typeof dateInput === 'string') {
      const parts = dateInput.split('-');
      if (parts.length !== 3) return { text: "None", color: "text-slate-500 dark:text-slate-400" };
      const [year, month, day] = parts.map(Number);
      date = new Date(year, month - 1, day);
      date.setFullYear(year);
    } else {
      date = dateInput;
    }
    
    if (isNaN(date.getTime())) return { text: "None", color: "text-slate-500 dark:text-slate-400" };

    const year = date.getFullYear();
    if (year < 1900 || year > 2100) {
      return { text: "Not valid", color: "text-rose-600 dark:text-rose-400" };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const isFuture = checkDate >= today;

    if (isFuture) {
      return { text: "Valid date", color: "text-emerald-600 dark:text-emerald-400" };
    }
    return { text: "Not valid", color: "text-rose-600 dark:text-rose-400" };
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Date Pickers</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Practice automating different types of date selection inputs, from standard HTML5 to complex custom calendars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard HTML5 Date Picker */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Standard HTML5 Date Input</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            A native browser date picker. Usually automated by directly sending keys to the input field.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="standard-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Select Date
              </label>
              <input
                type="date"
                id="standard-date"
                value={standardDate}
                onChange={(e) => setStandardDate(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
              />
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Validation: <span id="standard-date-result" className={getValidationResult(standardDate).color}>{getValidationResult(standardDate).text}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                * Valid dates must be today or in the future, and have a year between 1900 and 2100.
              </p>
            </div>
          </div>
        </div>

        {/* Custom React Date Picker */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Custom UI Date Picker</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            A custom-built calendar component. Requires clicking the input to open, navigating months, and clicking a specific day element.
          </p>

          <div className="space-y-4 relative">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Appointment Date
              </label>
              <div 
                id="custom-date-trigger"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-colors"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                <span className={customDate ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                  {formatDate(customDate)}
                </span>
                <CalendarIcon size={20} className="text-slate-400 dark:text-slate-500" />
              </div>
            </div>

            {isCalendarOpen && (
              <div id="custom-calendar" className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10 p-4">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    id="prev-month"
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div id="current-month-year" className="font-semibold text-slate-900 dark:text-white">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <button 
                    id="next-month"
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-xs font-medium text-slate-400 dark:text-slate-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = customDate?.getDate() === day && 
                                       customDate?.getMonth() === currentMonth.getMonth() && 
                                       customDate?.getFullYear() === currentMonth.getFullYear();
                    
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className={`
                          p-2 text-sm rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors
                          ${isSelected ? 'bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600' : 'text-slate-700 dark:text-slate-300'}
                        `}
                        data-day={day}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 mt-8">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Validation: <span id="custom-date-result" className={getValidationResult(customDate).color}>{getValidationResult(customDate).text}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                * Valid dates must be today or in the future, and have a year between 1900 and 2100.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
