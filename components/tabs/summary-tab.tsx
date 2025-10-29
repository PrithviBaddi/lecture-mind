"use client"

import { Download, Copy, Check } from "lucide-react"
import { useState } from "react"

interface SummaryTabProps {
  lectureId: string | null
}

const mockSummary = `Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves. The field has evolved significantly over the past decades, with applications ranging from recommendation systems to autonomous vehicles.

The fundamental concepts of machine learning include supervised learning, where models learn from labeled data, and unsupervised learning, where patterns are discovered in unlabeled data. Reinforcement learning represents another paradigm where agents learn through interaction with their environment. Understanding these core concepts is essential for building effective machine learning solutions.

Modern machine learning frameworks and tools have democratized the field, making it accessible to developers and researchers worldwide. Libraries like TensorFlow, PyTorch, and scikit-learn provide robust implementations of various algorithms. The key to success in machine learning is understanding both the theory and practical implementation, combined with careful data preparation and model evaluation.`

export function SummaryTab({ lectureId }: SummaryTabProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  const handleExport = (format: "txt" | "json") => {
    setIsExporting(true)
    setTimeout(() => {
      const content = format === "json" ? JSON.stringify({ lectureId, summary: mockSummary }, null, 2) : mockSummary

      const element = document.createElement("a")
      element.setAttribute(
        "href",
        `data:text/${format === "json" ? "json" : "plain"};charset=utf-8,${encodeURIComponent(content)}`,
      )
      element.setAttribute("download", `summary.${format}`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      setIsExporting(false)
    }, 500)
  }

  const handleCopy = (format: "txt" | "json") => {
    const content = format === "json" ? JSON.stringify({ lectureId, summary: mockSummary }, null, 2) : mockSummary
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
        
      </div>

      <div className="space-y-4">
        {mockSummary.split("\n\n").map((paragraph, idx) => (
          <div
            key={idx}
            className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
          >
            <p className="text-foreground leading-relaxed">{paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
