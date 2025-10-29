"use client"

import React from "react"

import { Mic, Square, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useToastNotifications } from "@/hooks/use-toast-notifications"

export function RecordCard() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const { success, info } = useToastNotifications()

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    setHasRecording(false)
    info("Recording started...")
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setHasRecording(true)
    success("Recording saved successfully!")
  }

  const handleReset = () => {
    setRecordingTime(0)
    setHasRecording(false)
  }

  // Simulate recording timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/50 hover:bg-secondary transition-all duration-300 p-8 group">
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
            isRecording
              ? "bg-destructive/20 animate-pulse"
              : hasRecording
                ? "bg-accent/20"
                : "bg-accent/10 group-hover:bg-accent/20"
          }`}
        >
          {isRecording ? (
            <div className="w-8 h-8 bg-destructive rounded-full animate-pulse" />
          ) : hasRecording ? (
            <CheckCircle className="w-8 h-8 text-accent" />
          ) : (
            <Mic className="w-8 h-8 text-accent" />
          )}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {isRecording ? "Recording..." : hasRecording ? "Recording Complete" : "Record Lecture"}
          </h3>
          {isRecording && <p className="text-sm text-muted-foreground mb-3 font-mono">{formatTime(recordingTime)}</p>}
          {!isRecording && !hasRecording && (
            <p className="text-sm text-muted-foreground mb-3">Use your microphone to record directly</p>
          )}
          {!isRecording && hasRecording && (
            <p className="text-sm text-muted-foreground mb-3">Duration: {formatTime(recordingTime)}</p>
          )}
          <div className="flex gap-2 justify-center">
            {!isRecording && !hasRecording && (
              <button
                onClick={handleStartRecording}
                className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all"
              >
                Start Recording
              </button>
            )}
            {isRecording && (
              <button
                onClick={handleStopRecording}
                className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-all flex items-center gap-2"
              >
                <Square className="w-4 h-4" />
                Stop Recording
              </button>
            )}
            {hasRecording && (
              <>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-all"
                >
                  Record Again
                </button>
                <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all">
                  Process Recording
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
