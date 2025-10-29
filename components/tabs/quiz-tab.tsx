"use client"

import { useState } from "react"
import { Download, Copy, Check, CheckCircle, XCircle } from "lucide-react"

interface QuizTabProps {
  lectureId: string | null
}

const mockQuestions = [
  {
    id: "1",
    question: "What is the primary goal of machine learning?",
    options: [
      "To explicitly program all behaviors",
      "To enable systems to learn from data without explicit programming",
      "To replace all human decision-making",
      "To create artificial general intelligence",
    ],
    correct: 1,
  },
  {
    id: "2",
    question: "Which of the following is an example of supervised learning?",
    options: [
      "Clustering customer data",
      "Email spam detection with labeled examples",
      "Discovering patterns in unlabeled data",
      "Learning through trial and error",
    ],
    correct: 1,
  },
  {
    id: "3",
    question: "What does TensorFlow primarily do?",
    options: [
      "Manages databases",
      "Provides a framework for building machine learning models",
      "Handles web server requests",
      "Compresses image files",
    ],
    correct: 1,
  },
  {
    id: "4",
    question: 'In machine learning, what is a "feature"?',
    options: [
      "A bug in the code",
      "An input variable used by the model",
      "A type of algorithm",
      "A visualization tool",
    ],
    correct: 1,
  },
  {
    id: "5",
    question: "What is the purpose of a validation set?",
    options: [
      "To train the model",
      "To test the model on unseen data during development",
      "To store the final results",
      "To clean the data",
    ],
    correct: 1,
  },
]

export function QuizTab({ lectureId }: QuizTabProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (!showResults) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: optionIndex,
      }))
    }
  }

  const handleCheckAnswers = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
  }

  const correctCount = mockQuestions.filter((q) => answers[q.id] === q.correct).length

  const handleExport = (format: "txt" | "json") => {
    setIsExporting(true)
    setTimeout(() => {
      const results = mockQuestions.map((q) => ({
        question: q.question,
        userAnswer: q.options[answers[q.id]],
        correctAnswer: q.options[q.correct],
        isCorrect: answers[q.id] === q.correct,
      }))

      const content =
        format === "json"
          ? JSON.stringify({ lectureId, score: correctCount, total: mockQuestions.length, results }, null, 2)
          : `Quiz Results\nScore: ${correctCount}/${mockQuestions.length}\n\n${results.map((r) => `Q: ${r.question}\nYour Answer: ${r.userAnswer}\nCorrect: ${r.isCorrect ? "Yes" : "No"}`).join("\n\n")}`

      const element = document.createElement("a")
      element.setAttribute(
        "href",
        `data:text/${format === "json" ? "json" : "plain"};charset=utf-8,${encodeURIComponent(content)}`,
      )
      element.setAttribute("download", `quiz-results.${format}`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      setIsExporting(false)
    }, 500)
  }

  const handleCopy = (format: "txt" | "json") => {
    const results = mockQuestions.map((q) => ({
      question: q.question,
      userAnswer: q.options[answers[q.id]],
      correctAnswer: q.options[q.correct],
      isCorrect: answers[q.id] === q.correct,
    }))

    const content =
      format === "json"
        ? JSON.stringify({ lectureId, score: correctCount, total: mockQuestions.length, results }, null, 2)
        : `Quiz Results\nScore: ${correctCount}/${mockQuestions.length}\n\n${results.map((r) => `Q: ${r.question}\nYour Answer: ${r.userAnswer}\nCorrect: ${r.isCorrect ? "Yes" : "No"}`).join("\n\n")}`

    navigator.clipboard.writeText(content)
    setCopiedFormat(format)
    setTimeout(() => setCopiedFormat(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          {showResults && (
            <div className="text-lg font-semibold text-foreground">
              Score:{" "}
              <span className="text-accent">
                {correctCount}/{mockQuestions.length}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {showResults && (
            <>
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
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {mockQuestions.map((question) => (
          <div key={question.id} className="p-6 bg-card border border-border rounded-xl">
            <h3 className="font-semibold text-foreground mb-4">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, idx) => {
                const isSelected = answers[question.id] === idx
                const isCorrect = idx === question.correct
                const showCorrect = showResults && isCorrect
                const showIncorrect = showResults && isSelected && !isCorrect

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(question.id, idx)}
                    disabled={showResults}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                      showCorrect
                        ? "border-accent bg-accent/10"
                        : showIncorrect
                          ? "border-destructive bg-destructive/10"
                          : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">{option}</span>
                      {showCorrect && <CheckCircle className="w-5 h-5 text-accent" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-destructive" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center">
        {!showResults ? (
          <button
            onClick={handleCheckAnswers}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Check Answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
