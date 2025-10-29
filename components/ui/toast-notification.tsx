"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

export interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
  duration?: number
}

interface ToastNotificationProps {
  toast: Toast
  onClose: (id: string) => void
}

export function ToastNotification({ toast, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => onClose(toast.id), toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast, onClose])

  const bgColor = {
    success: "bg-accent/10 border-accent text-accent",
    error: "bg-destructive/10 border-destructive text-destructive",
    info: "bg-primary/10 border-primary text-primary",
  }[toast.type]

  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 rounded-lg border ${bgColor} animate-in fade-in slide-in-from-top-2 duration-300`}
    >
      <p className="text-sm font-medium">{toast.message}</p>
      <button onClick={() => onClose(toast.id)} className="p-1 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
