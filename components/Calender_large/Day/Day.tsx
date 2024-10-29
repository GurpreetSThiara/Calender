"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, } from 'lucide-react';

export function DayView({ currentDate, events = {}}) {
  const [date , setDate] = useState<Date>(currentDate)
  const [calenderEvents , setEvents] = useState([])
  console.log(events)
  console.log(calenderEvents)
  console.log("calenderEvents")
  console.log(currentDate.toISOString().split('T')[0])
  console.log(date)

    const hours = Array.from({ length: 24 }, (_, i) => i)

    const nextDate = () => {
      const next = new Date(date)
      next.setDate(date.getDate() + 1)
      setDate(next)
    }
  
    const prevDate = () => {
      const prev = new Date(date)
      prev.setDate(date.getDate() - 1)
      setDate(prev)
    }
   useEffect(()=>{
    setEvents(events[date.toISOString().split('T')[0]]?? []);
   },[date])
    return (
      <div className="flex flex-col h-full">
    <div className="flex justify-center items-center gap-2" >
      <div className="">
        <button onClick={prevDate}>
          <ChevronLeft />{""}
        </button>
      </div>
    <div className=" font-semibold ">
          {date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <div className="">
        <button onClick={nextDate}>
          <ChevronRight />{""}
        </button>
      </div>
        
    </div>
        <div className="flex-grow overflow-y-auto">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-muted-foreground/20">
              <div className="w-16 p-2 text-right text-sm text-muted-foreground">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-grow p-1">
              {calenderEvents
                  .filter(event => {
                    const eventDate = new Date(event.date)
                    return eventDate.getDate() === currentDate.getDate() && 
                           eventDate.getMonth() === currentDate.getMonth() && 
                           eventDate.getFullYear() === currentDate.getFullYear() && 
                           eventDate.getHours() === hour
                  })
                  .map((event, index) => (
                    <div key={index} className="text-sm bg-primary text-primary-foreground rounded px-1 mb-1">
                      {event.title}
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  