"use client"

import { Search, X } from "lucide-react"
import { useState } from "react"

export function SearchDialog({ onClose, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSearch(searchTerm)
      onClose()
    }
  
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search Events</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5  h-5" />{""}
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-input bg-background text-foreground rounded"
                placeholder="Search events..."
                required
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground rounded p-2 mt-4">
              Search
            </button>
          </form>
        </div>
      </div>
    )
  }