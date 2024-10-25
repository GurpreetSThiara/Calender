"use client"

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, Plus, X } from 'lucide-react'
import { MonthView } from '@/components/Calender_large/Month'
import { WeekView } from '@/components/Calender_large/Week/Week'
import { YearView } from '@/components/Calender_large/Year/Year'
import { DayView } from '@/components/Calender_large/Day/Day'
import { SearchDialog } from '@/components/GlobalComponents/Dialog/SearchDialog'
import { EventDialog } from '@/components/GlobalComponents/Dialog/EventDialog'



export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('Month')
  const [events, setEvents] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showSearchDialog, setShowSearchDialog] = useState(false)

  const handleDateClick = (date) => {
    if (isSelecting) {
      setSelectedDates(prev => [...prev, date])
    } else {
      setSelectedDates([date])
      setShowEventDialog(true)
    }
  }
  const handleAddEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent])
    setShowEventDialog(false)
    setSelectedDates([])
  }

  const handleSearch = (searchTerm) => {
    // Implement search logic here
    console.log('Searching for:', searchTerm)
  }

  const toggleSelecting = () => {
    setIsSelecting(!isSelecting)
    if (isSelecting) {
      setSelectedDates([])
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
        <h1 className="text-xl font-bold">Calendar</h1>
        <div className="flex space-x-2">
          <button onClick={() => setShowSearchDialog(true)} className="p-2 rounded-full hover:bg-primary-foreground/20">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={toggleSelecting} className={`p-2 rounded-full ${isSelecting ? 'bg-primary-foreground/20' : 'hover:bg-primary-foreground/20'}`}>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <nav className="flex justify-between items-center p-2 bg-muted">
        <button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>

      <div className="flex justify-around p-2 bg-muted">
        {['Day', 'Week', 'Month', 'Year'].map(type => (
          <button
            key={type}
            onClick={() => setView(type)}
            className={`px-3 py-1 rounded ${view === type ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <main className="flex-grow overflow-y-auto">
        {view === 'Month' && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            selectedDates={selectedDates}
            isSelecting={isSelecting}
          />
        )}
        {view === 'Week' && <WeekView currentDate={currentDate} events={events} onDateClick={handleDateClick} />}
        {view === 'Day' && <DayView currentDate={currentDate} events={events} />}
        {view === 'Year' && <YearView currentDate={currentDate} events={events} onDateClick={handleDateClick} />}
      </main>

      {showEventDialog && (
        <EventDialog
          selectedDates={selectedDates}
          onClose={() => setShowEventDialog(false)}
          onAddEvent={handleAddEvent}
        />
      )}

      {showSearchDialog && (
        <SearchDialog
          onClose={() => setShowSearchDialog(false)}
          onSearch={handleSearch}
        />
      )}
    </div>
  )
}

