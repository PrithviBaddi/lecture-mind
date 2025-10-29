"use client"

import { useState } from "react"
import { Download, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react"

interface FlashcardsTabProps {
  lectureId: string | null
}

const mockFlashcards = [
  {
    id: "1",
    front: "What is Machine Learning?",
    back: "A subset of AI that enables systems to learn and improve from experience without being explicitly programmed.",
  },
  {
    id: "2",
    front: "What are the three main types of ML?",
    back: "Supervised Learning, Unsupervised Learning, and Reinforcement Learning.",
  },
  {
    id: "3",
    front: "What is supervised learning?",
    back: "Learning from labeled data where the model learns to map inputs to known outputs.",
  },
  {
    id: "4",
    front: "Name three popular ML frameworks.",
    back: "TensorFlow, PyTorch, and scikit-learn.",
  },
  {
    id: "5",
    front: "What is the purpose of data preparation?",
    back: "To clean, transform, and organize raw data into a format suitable for model training.",
  },
  {
    id: "6",
    front: "What is model evaluation?",
    back: "The process of assessing how well a trained model performs on unseen data using metrics like accuracy and precision.",
  },
]

export function FlashcardsTab({ lectureId }: FlashcardsTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  const currentCard = mockFlashcards[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockFlashcards.length)
    setIsFlipped(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length)
    setIsFlipped(false)
  }

  const handleExport = (format: "txt" | "json") => {
    setIsExporting(true)
    setTimeout(() => {
      const content =
        format === "json"
          ? JSON.stringify({ lectureId, flashcards: mockFlashcards }, null, 2)
          : mockFlashcards.map((card) => `Q: ${card.front}\nA: ${card.back}`).join("\n\n")

      const element = document.createElement("a")
      element.setAttribute(
        "href",
        `data:text/${format === "json" ? "json" : "plain"};charset=utf-8,${encodeURIComponent(content)}`,
      )
      element.setAttribute("download", `flashcards.${format}`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      setIsExporting(false)
    }, 500)
  }

  const handleCopy = (format: "txt" | "json") => {
    const content =
      format === "json"
        ? JSON.stringify({ lectureId, flashcards: mockFlashcards }, null, 2)
        : mockFlashcards.map((card) => `Q: ${card.front}\nA: ${card.back}`).join("\n\n")
    navigator.clipboard.writeText(content)
    setCopiedFormat(format)
    setTimeout(() => setCopiedFormat(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-end">
        <button
          onClick={() => handleCopy("txt")}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          {copiedFormat === "txt" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedFormat === "txt" ? "Copied!" : "Copy as TXT"}
        </button>
        <button
          onClick={() => handleExport("txt")}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export as TXT
        </button>
        <button
          onClick={() => handleExport("json")}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export as JSON
        </button>
      </div>

      {/* Flashcard */}
      <div className="flex flex-col items-center gap-8">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full max-w-2xl h-80 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary rounded-2xl cursor-pointer flex items-center justify-center p-8 transition-all duration-500 hover:shadow-lg"
          style={{
            perspective: "1000px",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-4">{isFlipped ? "Answer" : "Question"}</p>
            <p className="text-2xl font-semibold text-foreground">{isFlipped ? currentCard.back : currentCard.front}</p>
            <p className="text-xs text-muted-foreground mt-6">Click to flip</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {mockFlashcards.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Grid View */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockFlashcards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => {
                setCurrentIndex(idx)
                setIsFlipped(false)
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                idx === currentIndex ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <p className="text-sm font-medium text-foreground truncate">{card.front}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
