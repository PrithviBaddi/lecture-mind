"use client"

import { Navbar } from "@/components/navbar"

export default function QuizzesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Quizzes</h1>
          <p className="text-lg text-muted-foreground mb-8">Test your knowledge with quizzes from your lectures.</p>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Select a lecture from Home to take a quiz.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
