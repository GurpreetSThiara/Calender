import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CalendarViewDropdown = ({view, setView}) => {

  const [isOpen, setIsOpen] = useState(false);
  const viewOptions = ['Day', 'Week', 'Month', 'Year'];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (type) => {
    setView(type);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center p-4 bg-muted rounded-lg">
      <div className="relative w-48">
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center w-full justify-between bg-primary px-4 py-2 rounded-lg text-xs font-medium uppercase text-white  transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:outline-none active:bg-primary-600 dark:shadow-black/30"
        >
          {view}
          <span className="ml-2 text-white">
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul
            className="absolute z-50 mt-2 w-full rounded-lg bg-white text-base shadow-lg dark:bg-surface-dark"
          >
            {viewOptions.map((type) => (
              <li key={type}>
                <button
                  onClick={() => handleSelect(type)}
                  className="block w-full text-left px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200 dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800"
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarViewDropdown;
