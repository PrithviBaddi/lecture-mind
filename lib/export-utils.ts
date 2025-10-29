export interface ExportData {
  lectureId: string | null
  title?: string
  timestamp: string
  content: Record<string, unknown>
}

export function downloadFile(content: string, filename: string, mimeType = "text/plain") {
  const element = document.createElement("a")
  element.setAttribute("href", `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`)
  element.setAttribute("download", filename)
  element.style.display = "none"
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export function exportAsJSON(data: ExportData, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, filename, "application/json")
}

export function exportAsCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          const stringValue = String(value || "")
          return stringValue.includes(",") ? `"${stringValue}"` : stringValue
        })
        .join(","),
    ),
  ].join("\n")

  downloadFile(csvContent, filename, "text/csv")
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function generateTimestamp(): string {
  return new Date().toISOString()
}
