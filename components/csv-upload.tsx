"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react"

export function CSVUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setError("")
    } else {
      setError("Please select a valid CSV file")
    }
  }

  const parseCSV = (text: string) => {
    const lines = text.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim())
    const employees = []

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(",").map((v) => v.trim())
        const employee: any = {}

        headers.forEach((header, index) => {
          employee[header] = values[index] || ""
        })

        employees.push(employee)
      }
    }

    return employees
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError("")
    setResults([])

    try {
      const text = await file.text()
      const employees = parseCSV(text)

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employees }),
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data.results)
      } else {
        throw new Error("Upload failed")
      }
    } catch (err) {
      setError("Failed to upload and process CSV file")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="csv-file">CSV File</Label>
        <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} className="mt-1" />
        <p className="text-sm text-gray-500 mt-1">
          Upload a CSV file with employee data. Required columns: name, role, department, email
        </p>
      </div>

      {file && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-sm">{file.name}</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Upload and Analyze
          </>
        )}
      </Button>

      {results.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Upload Results</h3>
          {results.map((result, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded">
              {result.success ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Successfully processed {result.employee}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">
                    Failed to process {result.employee}: {result.error}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">CSV Format Example</h3>
        <pre className="text-xs text-gray-600 overflow-x-auto">
          {`name,role,department,email,experience,projectHistory,learningProgress,behavioralSignals
John Doe,Software Engineer,Engineering,john@company.com,3,Led 2 major projects,Completed React certification,High collaboration
Jane Smith,Product Manager,Product,jane@company.com,5,Managed 10+ features,MBA in progress,Strong leadership`}
        </pre>
      </div>
    </div>
  )
}
