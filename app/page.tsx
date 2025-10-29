"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { UploadCard } from "@/components/upload-card"
import { RecordCard } from "@/components/record-card"
import { UploadHistory } from "@/components/upload-history"
import { StudyMaterialsTabs } from "@/components/study-materials-tabs"
import { ToastContainer } from "@/components/toast-container"
import { useToastNotifications } from "@/hooks/use-toast-notifications"

export default function Home() {
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null)
  const [showTabs, setShowTabs] = useState(false)
  const { toasts, removeToast, success } = useToastNotifications()

  const handleSelectLecture = (lectureId: string) => {
    setSelectedLecture(lectureId)
    setShowTabs(true)
    success("Lecture loaded successfully!")
  }

  const handleBack = () => {
    setSelectedLecture(null)
    setShowTabs(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        {!showTabs ? (
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">
                Welcome to LectureMind
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground text-pretty">
                Upload or record your lecture to get started with AI-powered study materials.
              </p>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <UploadCard />
              <RecordCard />
            </div>

            {/* Upload History */}
            <UploadHistory onSelectLecture={handleSelectLecture} />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={handleBack}
              className="mb-6 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              ← Back to Dashboard
            </button>
            <StudyMaterialsTabs lectureId={selectedLecture} />
          </div>
        )}
      </div>
    </main>
  )
}
