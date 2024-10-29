"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function WeekView({ currentDate, events = [] }) {
  const [weekStart, setWeekStart] = useState(() => {
    const start = new Date(currentDate)
    start.setDate(currentDate.getDate() - currentDate.getDay())
    return start
  })

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    return date
  })

  const nextWeek = () => {
    const next = new Date(weekStart)
    next.setDate(weekStart.getDate() + 7)
    setWeekStart(next)
  }

  const prevWeek = () => {
    const prev = new Date(weekStart)
    prev.setDate(weekStart.getDate() - 7)
    setWeekStart(prev)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2">
        <button 
          onClick={prevWeek}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft />
        </button>
        <div className="font-semibold">
          {weekStart.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button 
          onClick={nextWeek}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next week"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-muted-foreground/20">
        {days.map(day => (
          <div 
            key={day.toISOString()} 
            className="text-center font-semibold p-1 bg-muted"
          >
            <div>{day.toLocaleDateString('default', { weekday: 'short' })}</div>
            <div className={`text-sm ${
              day.toDateString() === new Date().toDateString() ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-grow grid grid-cols-7 gap-px bg-muted-foreground/20">
        {days.map(day => (
          <div 
            key={day.toISOString()} 
            className="border border-muted-foreground/20 p-1 overflow-y-auto bg-background"
          >
            {events
              .filter(event => new Date(event.date).toDateString() === day.toDateString())
              .map((event, index) => (
                <div 
                  key={index} 
                  className="text-xs bg-primary text-primary-foreground rounded px-1 mb-1 p-1"
                >
                  {event.title}
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  )
}