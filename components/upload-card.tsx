"use client"

import type React from "react"

import { Upload, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useToastNotifications } from "@/hooks/use-toast-notifications"

export function UploadCard() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { success, error } = useToastNotifications()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    
    setUploadedFile(file)
    simulateUpload()
    success(`File "${file.name}" uploaded successfully!`)
    
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
    }, 2000)
  }

  const resetUpload = () => {
    setUploadedFile(null)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-8 cursor-pointer group ${
        isDragging ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {!uploadedFile ? (
          <>
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-1">Upload Lecture File</h3>
              <p className="text-sm text-muted-foreground mb-3">MP3, PDF, or other file formats</p>
              <input type="file" className="hidden" id="audio-upload" onChange={handleInputChange} />
              <label
                htmlFor="audio-upload"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Choose File
              </label>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
              {isUploading ? (
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-8 h-8 text-accent" />
              )}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {isUploading ? "Uploading..." : "Upload Complete"}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 truncate max-w-xs">{uploadedFile.name}</p>
              <button
                onClick={resetUpload}
                className="inline-block px-6 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                Upload Another
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
