"use client"

import { useState } from "react"
import { SummaryTab } from "./tabs/summary-tab"
import { FlashcardsTab } from "./tabs/flashcards-tab"
import { QuizTab } from "./tabs/quiz-tab"

interface StudyMaterialsTabsProps {
  lectureId: string | null
}

export function StudyMaterialsTabs({ lectureId }: StudyMaterialsTabsProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "quiz">("summary")

  const tabs = [
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "flashcards", label: "Flashcards", icon: "🎴" },
    { id: "quiz", label: "Quiz", icon: "❓" },
  ]

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">
        {activeTab === "summary" && <SummaryTab lectureId={lectureId} />}
        {activeTab === "flashcards" && <FlashcardsTab lectureId={lectureId} />}
        {activeTab === "quiz" && <QuizTab lectureId={lectureId} />}
      </div>
    </div>
  )
}
