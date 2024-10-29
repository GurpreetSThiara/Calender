"use client"
import { Event } from "@/types/CalenderTypes";
import { validateMaxlength } from "@/utils/validations/Validations"
import { X } from "lucide-react"
import { useState } from "react"

interface NewEventDialogProps {
  selectedDates: Date[];
  onClose: () => void;
  onAddEvent: (event: Event) => void;
}

export function NewEventDialog({ selectedDates, onClose, onAddEvent }: NewEventDialogProps) {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#6366F1');

  const validateForm = (): boolean => {
    return validateMaxlength(title, 20)?.result ?? false;
  }

  const handleSubmit = () => {
 
    if (validateForm()) {
      selectedDates.forEach(date => {
        const [hours, minutes] = isAllDay ? [0, 0] : time.split(':').map(Number);
        const eventDate = new Date(date);
        eventDate.setHours(hours, minutes);

        const newEvent: Event = {
          id: crypto.randomUUID(),
          title,
          description,
          startDate: eventDate.toISOString(),
          endDate: eventDate.toISOString(), // Assuming endDate is the same as startDate for all-day events
          isAllDay,
          color,
          createdAt: new Date().toISOString(),
          status: 'confirmed'
        };

        onAddEvent(newEvent);
      });
      onClose();
    }
  }

  return (
    <div className="z-50 fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Event</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form>
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
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-input bg-background text-foreground rounded"
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
              disabled={isAllDay}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isAllDay"
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isAllDay" className="text-sm font-medium text-muted-foreground">
              All Day
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block text-sm font-medium text-muted-foreground mb-1">
              Event Color
            </label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border border-input bg-background text-foreground rounded"
            />
          </div>
          <button type="button" className="w-full bg-primary text-primary-foreground rounded p-2" onClick={handleSubmit}>
            Add Event
          </button>
        </form>
      </div>
    </div>
  )
}
