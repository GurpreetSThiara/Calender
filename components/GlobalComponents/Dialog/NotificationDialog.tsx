"use client"

import { X } from "lucide-react"


export function NotificationDialog({ onClose }) {
    // const [searchTerm, setSearchTerm] = useState('')
  
  
  
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5  h-5" />{""}
            </button>
          </div>
     
        </div>
      </div>
    )
  }