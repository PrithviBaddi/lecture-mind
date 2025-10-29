"use client"

import { Clock, FileText, Zap, HelpCircle } from "lucide-react"

interface Lecture {
  id: string
  title: string
  date: string
  duration: string
}

interface UploadHistoryProps {
  onSelectLecture: (lectureId: string) => void
}

const mockLectures: Lecture[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    date: "Oct 20, 2025",
    duration: "45 min",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    date: "Oct 19, 2025",
    duration: "60 min",
  },
  {
    id: "3",
    title: "Database Design Fundamentals",
    date: "Oct 18, 2025",
    duration: "50 min",
  },
]

export function UploadHistory({ onSelectLecture }: UploadHistoryProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Upload History</h2>
      <div className="space-y-3">
        {mockLectures.map((lecture) => (
          <div
            key={lecture.id}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{lecture.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lecture.date}
                  </span>
                  <span>{lecture.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectLecture(lecture.id)}
                className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors opacity-0 group-hover:opacity-100"
              >
                <FileText className="w-4 h-4 inline mr-1" />
                View Summary
              </button>
              <button
                onClick={() => onSelectLecture(lecture.id)}
                className="px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Zap className="w-4 h-4 inline mr-1" />
                Flashcards
              </button>
              <button
                onClick={() => onSelectLecture(lecture.id)}
                className="px-3 py-1.5 text-sm border border-border text-foreground rounded-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
              >
                <HelpCircle className="w-4 h-4 inline mr-1" />
                Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
