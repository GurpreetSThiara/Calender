"use client"
import { validateMaxlength } from "@/utils/validations/Validations"
import { X } from "lucide-react"
import { useState } from "react"

export function EventDialog({ selectedDates, onClose, onAddEvent }) {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const validateForm = () => {
      console.log("first")
       const res = validateMaxlength(title, 20);
       return res?.result;
    }
    const handleSubmit = (e) => {
    
      const r = validateForm();
      console.log(r)
      console.log(r)
      console.log(r)
      console.log(r)
      if(r){
      selectedDates.forEach(date => {
        const [hours, minutes] = time.split(':')
        const eventDate = new Date(date)
        eventDate.setHours(parseInt(hours), parseInt(minutes))
        onAddEvent({ title, date: eventDate })
      })
      onClose()
      }
    }
  
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Event</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" /> {""}
            </button>
          </div>
          <form >
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-input bg-background text-foreground rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-muted-foreground mb-1">
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-input bg-background text-foreground rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Selected Dates
              </label>
              <div className="text-sm text-muted-foreground">
                {selectedDates.map(date => date.toLocaleDateString()).join(', ')}
              </div>
            </div>
            <button type="button" className="w-full bg-primary text-primary-foreground rounded p-2" onClick={handleSubmit} >
              Add Event
            </button>
          </form>
        </div>
      </div>
    )
  }
  