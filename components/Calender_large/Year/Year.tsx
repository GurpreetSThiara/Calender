"use client"

export function YearView({ currentDate, events, onDateClick }) {
    const months = Array.from({ length: 12 }, (_, i) => new Date(currentDate.getFullYear(), i, 1))
  
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {months.map(month => (
          <div key={month.toISOString()} className="border border-muted-foreground/20 rounded">
            <div className="text-center font-semibold p-2 bg-muted">
              {month.toLocaleString('default', { month: 'long' })}
            </div>
            <div className="grid grid-cols-7 gap-px">
              {Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => (
                <div
                  key={day}
                  className="text-center p-1 text-sm cursor-pointer hover:bg-primary/20"
                  onClick={() => onDateClick(new Date(month.getFullYear(), month.getMonth(), day))}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
  