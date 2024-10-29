import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Edit2Icon, MinusIcon, PlusIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import { Event } from "@/types/CalenderTypes";
import ClockComponent from "../GlobalComponents/Clock";


interface MonthViewProps {
  currentDate?: Date;
  events?: { [key: string]: Event[] };
  onDateClick?: (date: Date) => void;
  selectedDates?: Date[];
  isSelecting?: boolean;
}

const DayCell: React.FC<{
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isHovered: boolean;
  events: Event[];
  onDateClick: (date: Date) => void;
  isSelecting: boolean;
}> = React.memo(function DayCell({ 
  day, 
  date, 
  isCurrentMonth,
  isSelected, 
  isToday, 
  isHovered, 
  events, 
  onDateClick, 
  isSelecting 
}) {
  return (
    <button
      type="button"
      className={`h-32 p-2 border border-gray-100 transition-all duration-200 cursor-pointer
        ${isSelected ? "bg-indigo-50" : "hover:bg-gray-50"}
        ${isToday ? "font-bold text-indigo-600 flex justify-center items-center flex-col w-full" : ""}
        ${isHovered ? "shadow-md" : ""}
        ${!isCurrentMonth ? "opacity-50" : ""}
      `}
      onClick={() => onDateClick(date)}
      onMouseEnter={() => {
        if (isSelecting) onDateClick(date);
      }}
    >
      <div
        className={`text-sm ${
          isToday
            ? "bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
            : ""
        }`}
      >
        {day}
      </div>
      <div className="mt-1 space-y-1 w-full">
        {events.slice(0, 2).map((event: Event, index: number) => (
          <div
            key={`event-${index}`}
            className="w-full rounded-full"
            style={{ backgroundColor: event.color || "indigo" }}
          >
            <div className="text-sm text-white p-1 truncate">{event.title}</div>
          </div>
        ))}
        {events.length > 2 && (
          <div className="text-xs text-gray-500">+{events.length - 2}</div>
        )}
      </div>
    </button>
  );
});

const MiniCalendarDay: React.FC<{
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onDateClick: (date: Date) => void;
}> = React.memo(function MiniCalendarDay({ day, date, isCurrentMonth, isSelected, isToday, onDateClick }) {
  return (
    <button
      className={`h-6 w-6 p-2 flex items-center justify-center text-xs rounded-full border
        ${isSelected ? "bg-indigo-600 text-white" : "hover:shadow-md transition-transform duration-300 transform hover:scale-125"}
        ${isToday ? "font-bold bg-indigo-600 text-white" : ""}
        ${!isCurrentMonth ? "opacity-50" : ""}
      `}
      onClick={() => onDateClick(date)}
    >
      {day}
    </button>
  );
});

const EventItem: React.FC<{ event: Event }> = React.memo(function EventItem({ event }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex justify-between items-center">
      <div>
        <h4 className="font-medium">{event.title}</h4>
        <p className="text-sm text-gray-500">{formatEventDate(event.startDate, event.endDate, event.isAllDay)}</p>
      </div>
      <div className="flex space-x-2">
        <button className="text-blue-500 hover:text-blue-600">
          <Edit2Icon className="h-4 w-4" />
        </button>
        <button className="text-red-500 hover:text-red-600">
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

export const MonthView: React.FC<MonthViewProps> = function MonthView({
  currentDate = new Date(),
  events = {},
  onDateClick = () => {},
  selectedDates = [],
  isSelecting = false,
}) {
  const [zoom, setZoom] = useState(1);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(300); // Initial sidebar width
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const { daysInMonth, firstDayOfMonth, prevMonthDays, nextMonthDays } = useMemo(() => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const totalDays = 42; // 6 rows * 7 days
    const nextMonthDays = totalDays - daysInMonth - firstDayOfMonth;
    return { daysInMonth, firstDayOfMonth, prevMonthDays, nextMonthDays };
  }, [currentDate]);

  const handleZoom = useCallback((newZoom: number) => {
    setZoom(Math.max(0.5, Math.min(newZoom, 2)));
  }, []);

  const days = useMemo(() => {
    const days = [];
    
    // Previous month days
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i);
      days.push(
        <DayCell
          key={`prev-${i}`}
          day={i}
          date={date}
          isCurrentMonth={false}
          isSelected={false}
          isToday={false}
          isHovered={false}
          events={[]}
          onDateClick={onDateClick}
          isSelecting={isSelecting}
        />
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDates.some((selectedDate) =>
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
      );
      const isToday = new Date().toDateString() === date.toDateString();
      const isHovered = hoveredDate && hoveredDate.toDateString() === date.toDateString();
      const eventKey = date.toISOString().split('T')[0];
      const dayEvents = events[eventKey] || [];

      days.push(
        <DayCell
          key={`current-${day}`}
          day={day}
          date={date}
          isCurrentMonth={true}
          isSelected={isSelected}
          isToday={isToday}
          isHovered={isHovered}
          events={dayEvents}
          onDateClick={onDateClick}
          isSelecting={isSelecting}
        />
      );
    }

    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      days.push(
        <DayCell
          key={`next-${i}`}
          day={i}
          date={date}
          isCurrentMonth={false}
          isSelected={false}
          isToday={false}
          isHovered={false}
          events={[]}
          onDateClick={onDateClick}
          isSelecting={isSelecting}
        />
      );
    }

    return days;
  }, [currentDate, daysInMonth, firstDayOfMonth, prevMonthDays, nextMonthDays, selectedDates, events, hoveredDate, onDateClick, isSelecting]);

  const miniCalendarDays = useMemo(() => {
    const miniDays = [];
    const totalDays = 42; // 6 rows * 7 days
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // Previous month days
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i);
      miniDays.push(
        <MiniCalendarDay
          key={`mini-prev-${i}`}
          day={i}
          date={date}
          isCurrentMonth={false}
          isSelected={false}
          isToday={false}
          onDateClick={onDateClick}
        />
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDates.some((selectedDate) =>
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
      );
      const isToday = new Date().toDateString() === date.toDateString();

      miniDays.push(
        <MiniCalendarDay
          key={`mini-current-${day}`}
          day={day}
          date={date}
          isCurrentMonth={true}
          isSelected={isSelected}
          isToday={isToday}
          onDateClick={onDateClick}
        />
      );
    }

    // Next month days
    const remainingDays = totalDays - miniDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      miniDays.push(
        <MiniCalendarDay
          key={`mini-next-${i}`}
          day={i}
          date={date}
          isCurrentMonth={false}
          isSelected={false}
          isToday={false}
          onDateClick={onDateClick}
        />
      );
    }

    return miniDays;
  }, [currentDate, daysInMonth, firstDayOfMonth, selectedDates, onDateClick]);

  const allEvents = useMemo(() => Object.values(events).flat(), [events]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = containerRect.right - e.clientX;
    setSidebarWidth(Math.max(200, Math.min(newWidth, containerRect.width - 200)));
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="flex-col flex lg:flex-row h-screen overflow-hidden">
      <div className="bg-white  p-4  flex-grow overflow-auto" style={{ width: `calc(100% - ${sidebarWidth}px)` }}>
     
        <div
          className="gap-2 transition-transform duration-300 ease-in-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="grid grid-cols-7 gap-2 mb-2 p-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-medium text-center text-sm text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">{days}</div>
        </div>
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => handleZoom(zoom - 0.1)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Zoom out"
          >
            <MinusIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleZoom(1)}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full  shadow-lg transition-colors duration-200"
            aria-label="Reset zoom"
          >
            <RefreshCwIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleZoom(zoom + 0.1)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            aria-label="Zoom in"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div
        className="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-300 transition-colors duration-200"
        onMouseDown={handleMouseDown}
      ></div>
      <div className="bg-gray-50 overflow-auto" style={{ width: `${sidebarWidth}px` }}>
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Mini Calendar</h3>
            <div className="bg-white rounded-lg shadow p-2">
              <div className="grid grid-cols-7 gap-1 mb-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div key={`day-label-${index}`} className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 place-items-center">
                {miniCalendarDays}
              </div>
            </div>
          </div>
          {/* events */}
        <div className="border p-2 rounded-lg ">
        <div className="h-[20rem] overflow-y-auto rounded-scrollbar-container  "   >
            <h3 className="text-lg font-semibold mb-2">Events This Month</h3>
            <div className="space-y-2">
              {allEvents.map((event, index) => (
                <EventItem key={`event-${index}`} event={event} />
              ))}
            </div>
          </div>
        </div>

          <div className="">
            <ClockComponent/>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatEventDate(startDate: Date, endDate: Date, isAllDay?: boolean): string {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric',
    hour: isAllDay ? undefined : 'numeric',
    minute: isAllDay ? undefined : '2-digit'
  };
  
  if (isAllDay) {
    return `${new Date(startDate).toLocaleDateString(undefined, options)} - All day`;
  }
  
  if (new Date(startDate).toDateString() === new Date(endDate).toDateString()) {
    return `${new Date(startDate).toLocaleDateString(undefined, options)} - ${new Date(endDate).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`;
  }
  
  return `${new Date(startDate).toLocaleDateString(undefined, options)} - ${new Date(endDate).toLocaleDateString(undefined, options)}`;
}