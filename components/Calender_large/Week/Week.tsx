"use client"

export function WeekView({ currentDate, events, onDateClick }) {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
  
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
  
    return (
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-7 gap-px bg-muted-foreground/20">
          {days.map(day => (
            <div key={day.toISOString()} className="text-center font-semibold p-1 bg-muted">
              {day.toLocaleDateString('default', { weekday: 'short' })}
              <div>{day.getDate()}</div>
            </div>
          ))}
        </div>
        <div className="flex-grow grid grid-cols-7 gap-px bg-muted-foreground/20">
          {days.map(day => (
            <div key={day.toISOString()} className="border border-muted-foreground/20 p-1 overflow-y-auto">
              {events
                .filter(event => new Date(event.date).toDateString() === day.toDateString())
                .map((event, index) => (
                  <div key={index} className="text-xs bg-primary text-primary-foreground rounded px-1 mb-1">
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