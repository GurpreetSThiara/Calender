"use client"


export function DayView({ currentDate, events }) {
    const hours = Array.from({ length: 24 }, (_, i) => i)
  
    return (
      <div className="flex flex-col h-full">
        <div className="text-center font-semibold p-2 bg-muted">
          {currentDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <div className="flex-grow overflow-y-auto">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-muted-foreground/20">
              <div className="w-16 p-2 text-right text-sm text-muted-foreground">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-grow p-1">
                {events
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
  