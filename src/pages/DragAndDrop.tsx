import { useState, useRef } from "react";
import { GripHorizontal } from "lucide-react";

export default function DragAndDrop() {
  const [list1, setList1] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [list2, setList2] = useState(["Item A", "Item B", "Item C"]);
  
  const [sliderValue, setSliderValue] = useState(50);
  
  const dragItem = useRef<string | null>(null);
  const dragSourceList = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, item: string, sourceList: number) => {
    dragItem.current = item;
    dragSourceList.current = sourceList;
    e.dataTransfer.effectAllowed = "move";
    // Required for Firefox
    e.dataTransfer.setData("text/plain", item);
    
    // Add a slight delay before hiding the original element to allow the drag image to generate
    setTimeout(() => {
      const target = e.target as HTMLElement;
      target.classList.add("opacity-50");
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.classList.remove("opacity-50");
    dragItem.current = null;
    dragSourceList.current = null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetList: number) => {
    e.preventDefault();
    const item = dragItem.current;
    const sourceList = dragSourceList.current;

    if (!item || sourceList === null || sourceList === targetList) return;

    if (sourceList === 1) {
      setList1(list1.filter(i => i !== item));
    } else {
      setList2(list2.filter(i => i !== item));
    }

    if (targetList === 1) {
      setList1([...list1, item]);
    } else {
      setList2([...list2, item]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Drag and Drop</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Practice automating drag and drop interactions, including moving elements between lists and adjusting sliders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HTML5 Drag and Drop Lists */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Drag Items Between Lists</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Use HTML5 Drag and Drop actions to move items from List 1 to List 2.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* List 1 */}
            <div 
              id="list-1"
              className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 min-h-[200px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 1)}
            >
              <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-4 text-center">List 1</h3>
              <div className="space-y-2">
                {list1.map((item) => (
                  <div
                    key={item}
                    id={`drag-item-${item.replace(' ', '-').toLowerCase()}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, 1)}
                    onDragEnd={handleDragEnd}
                    className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3 cursor-grab active:cursor-grabbing text-slate-700 dark:text-slate-300"
                  >
                    <GripHorizontal size={16} className="text-slate-400" />
                    {item}
                  </div>
                ))}
                {list1.length === 0 && (
                  <p className="text-center text-slate-400 dark:text-slate-500 text-sm py-4">Empty</p>
                )}
              </div>
            </div>

            {/* List 2 */}
            <div 
              id="list-2"
              className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 min-h-[200px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 2)}
            >
              <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-4 text-center">List 2</h3>
              <div className="space-y-2">
                {list2.map((item) => (
                  <div
                    key={item}
                    id={`drag-item-${item.replace(' ', '-').toLowerCase()}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, 2)}
                    onDragEnd={handleDragEnd}
                    className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3 cursor-grab active:cursor-grabbing text-slate-700 dark:text-slate-300"
                  >
                    <GripHorizontal size={16} className="text-slate-400" />
                    {item}
                  </div>
                ))}
                {list2.length === 0 && (
                  <p className="text-center text-slate-400 dark:text-slate-500 text-sm py-4">Empty</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Range Slider</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Automate dragging a slider handle to a specific value.
          </p>

          <div className="max-w-md mx-auto space-y-6">
            <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>0</span>
              <span id="slider-value" className="text-indigo-600 dark:text-indigo-400 text-lg font-bold">{sliderValue}</span>
              <span>100</span>
            </div>
            
            <input
              id="range-slider"
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
