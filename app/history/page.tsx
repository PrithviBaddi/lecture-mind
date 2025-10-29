"use client"

import { Navbar } from "@/components/navbar"
import { Trash2, Download, Eye } from "lucide-react"
import { useState } from "react"

interface HistoryItem {
  id: string
  title: string
  date: string
  duration: string
  type: "upload" | "record"
  size: string
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    date: "Oct 20, 2025",
    duration: "45 min",
    type: "upload",
    size: "125 MB",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    date: "Oct 19, 2025",
    duration: "60 min",
    type: "record",
    size: "89 MB",
  },
  {
    id: "3",
    title: "Database Design Fundamentals",
    date: "Oct 18, 2025",
    duration: "50 min",
    type: "upload",
    size: "156 MB",
  },
  {
    id: "4",
    title: "Web Development Best Practices",
    date: "Oct 17, 2025",
    duration: "55 min",
    type: "record",
    size: "102 MB",
  },
  {
    id: "5",
    title: "Cloud Architecture Overview",
    date: "Oct 16, 2025",
    duration: "40 min",
    type: "upload",
    size: "98 MB",
  },
]

export default function HistoryPage() {
  const [items, setItems] = useState(mockHistory)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(items.map((item) => item.id)))
    }
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    selectedItems.delete(id)
    setSelectedItems(new Set(selectedItems))
  }

  const handleDeleteSelected = () => {
    setItems(items.filter((item) => !selectedItems.has(item.id)))
    setSelectedItems(new Set())
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">History</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              View and manage all your uploaded and recorded lectures
            </p>
          </div>

          {/* Controls */}
          {items.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2 items-center">
              <label className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.size === items.length && items.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
                Select All
              </label>
              {selectedItems.size > 0 && (
                <>
                  <span className="text-sm text-muted-foreground">{selectedItems.size} selected</span>
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Selected
                  </button>
                </>
              )}
            </div>
          )}

          {/* History List */}
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                      <span>{item.date}</span>
                      <span>{item.duration}</span>
                      <span>{item.size}</span>
                      <span className="capitalize px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="View">
                      <Eye className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Download">
                      <Download className="w-4 h-4 text-foreground" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No history yet. Start by uploading or recording a lecture.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
