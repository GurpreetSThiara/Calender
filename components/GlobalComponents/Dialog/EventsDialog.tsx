import React from 'react'
import { Event } from "@/types/CalenderTypes"
import { X, Plus, Calendar } from "lucide-react"

interface EventDialogProps {
  events: Event[]
  onClose: () => void
  onAddEvent: () => void
}

export function EventDialog({ events, onClose, onAddEvent }: EventDialogProps) {
    console.log(events)
  return (
    <div className="fixed z-30 inset-0  flex justify-center items-center p-4 ">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-500" />
              <span>Events</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {events.length > 0 ? (
            <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
              {events.map((event) => (
                <li key={event.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div style={{
                    backgroundColor:event.color
                  }} className={`bg-[${event.color}] font-bold text-gray-100 rounded-full flex justify-center items-center p-2 dark:text-white mb-2`}>{event.title}</div>
                  <div className="text-gray-600 dark:text-gray-300 mb-2">{event.description}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.startDate).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No events scheduled</p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Add your first event to get started!</p>
              <button
                onClick={onAddEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                Add New Event
              </button>
            </div>
          )}
        </div>
        
        {events.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onAddEvent}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </button>
          </div>
        )}
      </div>
    </div>
  )
}