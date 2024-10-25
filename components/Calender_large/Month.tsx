"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface Event {
    date: string
    title: string
    description:string
  }
  
  interface MonthViewProps {
    currentDate?: Date
    events?: Event[]
    onDateClick?: (date: Date) => void
    selectedDates?: Date[]
    isSelecting?: boolean
  }
  
  export  function MonthView({
    currentDate = new Date(),
    events = [],
    onDateClick = () => {},
    selectedDates = [],
    isSelecting = false
  }: Readonly<MonthViewProps>) {
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>)
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isSelected = selectedDates.some(selectedDate => 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() && 
        selectedDate.getFullYear() === currentDate.getFullYear()
      )
      const isToday = new Date().toDateString() === date.toDateString()
      const isHovered = hoveredDate && hoveredDate.toDateString() === date.toDateString()
  
      const dayEvents = events.filter(event => new Date(event.date).getDate() === day)
  
      days.push(
        <button
         type="button"
          key={day}
          className={`h-24 p-2 border border-gray-100 transition-all duration-200 cursor-pointer
            ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}
            ${isToday ? 'font-bold text-indigo-600' : ''}
            ${isHovered ? 'shadow-md' : ''}
          `}
          onClick={() => onDateClick(date)}
          onMouseEnter={() => {
            setHoveredDate(date)
            if (isSelecting) onDateClick(date)
          }}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <div className={`text-sm ${isToday ? 'bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="w-full bg-indigo-400 rounded-full">
                <div className="text-sm text-white p-1">{event.title}</div>
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2}</div>
            )}
          </div>
          
        </button>
      )
    }
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button
         
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />   {""}
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />   {""}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-medium text-center text-sm text-gray-500">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </div>
    )
  }