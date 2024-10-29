"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react';
import { MonthView } from '@/components/Calender_large/Month';
import { WeekView } from '@/components/Calender_large/Week/Week';
import { YearView } from '@/components/Calender_large/Year/Year';
import { DayView } from '@/components/Calender_large/Day/Day';
import { SearchDialog } from '@/components/GlobalComponents/Dialog/SearchDialog';
import { NewEventDialog } from '@/components/GlobalComponents/Dialog/NewEventDialog';
import { EventDialog } from '@/components/GlobalComponents/Dialog/EventsDialog';
import { Event } from '@/types/CalenderTypes';
import CalendarTypeDropdown from '@/components/GlobalComponents/Dropdown/CalenderType';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  const [events, setEvents] = useState<{ [key: string]: Event[] }>({
    "2024-10-29": [
      {
        id: "5c6b6bd2-af4a-471c-a7cb-0de88ede9bf3",
        title: "Diwali celebration",
        description: "Diwali is a festival of lights.",
        startDate: "2024-10-29T18:30:00.000Z",
        endDate: "2024-10-29T18:30:00.000Z",
        isAllDay: true,
        color: "#be9b3c",
        createdAt: "2024-10-28T06:34:58.185Z",
        status: "confirmed",
      }
    ],
    "2024-10-28": [
      {
        id: "7b1c6025-490d-4214-affe-c6a816779b0b",
        title: "Client meeting",
        description: "Client meeting is very important",
        startDate: "2024-10-28T18:30:00.000Z",
        endDate: "2024-10-28T18:30:00.000Z",
        isAllDay: true,
        color: "#0f6b6a",
        createdAt: "2024-10-28T06:35:38.039Z",
        status: "confirmed",
      }
    ],
   "2024-10-07" :[
      {
          "id": "ee3a6c49-07ea-45cf-bcca-d15005052110",
          "title": "svds",
          "description": "sdvsd",
          "startDate": "2024-10-07T11:26:00.000Z",
          "endDate": "2024-10-07T11:26:00.000Z",
          "isAllDay": false,
          "color": "#6366F1",
          "createdAt": "2024-10-28T09:26:46.866Z",
          "status": "confirmed"
      }
  ]
  });

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState();
  const [isSelecting, setIsSelecting] = useState(false);
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const handleDateClick = (date: Date) => {
    if (isSelecting) {
      setSelectedDates(prev => [...prev, date]);
    } else {
      const d = date.toISOString().split('T')[0];
      setSelectedDate(d)
      setSelectedDates([date]);
      setShowEventDialog(true);
    }
  };

  const handleAddEvent = (newEvent: Event) => {
    const eventDate = new Date(newEvent.startDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    setEvents(prev => {
      const updatedEvents = { ...prev };
      if (!updatedEvents[eventDate]) {
        updatedEvents[eventDate] = [];
      }
      updatedEvents[eventDate].push(newEvent);
      return updatedEvents;
    });
    setShowNewEventDialog(false);
    setSelectedDates([]);
  };

  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
  };

  const toggleSelecting = () => {
    setIsSelecting(!isSelecting);
    if (isSelecting) {
      setSelectedDates([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
        <h1 className="text-xl font-bold">Calendar</h1>
        <div className="flex space-x-2">
          <button onClick={() => setShowSearchDialog(true)} className="p-2 rounded-full hover:bg-primary-foreground/20">
            <Search className="w-5 h-5" />{""}
          </button>
          <button onClick={toggleSelecting} className={`p-2 rounded-full ${isSelecting ? 'bg-primary-foreground/20' : 'hover:bg-primary-foreground/20'}`}>
            <Plus className="w-5 h-5" />{""}
          </button>
        </div>
      </header>

      <nav className="flex  items-center justify-between p-2 bg-muted">
      <div className="flex  items-center p-2 bg-muted">
      <button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
          <ChevronLeft className="w-5 h-5" />{""}
        </button>
        <h2 className="text-2xl font-bold ">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
          <ChevronRight className="w-5 h-5" />{""}
        </button>
      </div>
      <CalendarTypeDropdown view={view} setView={setView}/>
      </nav>
      


      {/* <div className="flex justify-around p-2 bg-muted">
        {['Day', 'Week', 'Month', 'Year'].map(type => (
          <button
            key={type}
            onClick={() => setView(type)}
            className={`px-3 py-1 rounded ${view === type ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
          >
            {type}
          </button>
        ))}
      </div> */}

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

      {showNewEventDialog && selectedDates &&(
        <NewEventDialog
          selectedDates={selectedDates}
          onClose={() => setShowNewEventDialog(false)}
          onAddEvent={handleAddEvent}
        />
      )}

      {showEventDialog && selectedDate && (
        <EventDialog
           onAddEvent={() => setShowNewEventDialog(true)}
          onClose={() => setShowEventDialog(false)}
          events={events[selectedDate] || []}
     
        />
      )}

      {showSearchDialog && (
        <SearchDialog
          onClose={() => setShowSearchDialog(false)}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}
