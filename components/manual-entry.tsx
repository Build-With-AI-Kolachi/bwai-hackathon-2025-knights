"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

const departments = ["Engineering", "Product", "Design", "Marketing", "Sales", "HR", "Finance", "Operations"]

const roles = [
  "Software Engineer",
  "Senior Software Engineer",
  "Product Manager",
  "Designer",
  "Marketing Manager",
  "Sales Representative",
  "HR Specialist",
  "Financial Analyst",
]

export function ManualEntry() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    experience: "",
    projectHistory: "",
    learningProgress: "",
    behavioralSignals: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employees: [formData] }),
      })

      if (response.ok) {
        const data = await response.json()
        const uploadResult = data.results[0]

        if (uploadResult.success) {
          setResult({ success: true, message: `Successfully added ${formData.name} to the system` })
          setFormData({
            name: "",
            role: "",
            department: "",
            email: "",
            phone: "",
            experience: "",
            projectHistory: "",
            learningProgress: "",
            behavioralSignals: "",
          })
        } else {
          setResult({ success: false, message: uploadResult.error })
        }
      } else {
        throw new Error("Submission failed")
      }
    } catch (err) {
      setResult({ success: false, message: "Failed to submit employee data" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Department *</Label>
          <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Role *</Label>
          <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            type="number"
            value={formData.experience}
            onChange={(e) => handleInputChange("experience", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="projectHistory">Project History</Label>
        <Textarea
          id="projectHistory"
          placeholder="Describe key projects, achievements, and responsibilities..."
          value={formData.projectHistory}
          onChange={(e) => handleInputChange("projectHistory", e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="learningProgress">Learning Progress</Label>
        <Textarea
          id="learningProgress"
          placeholder="Describe certifications, training, skill development..."
          value={formData.learningProgress}
          onChange={(e) => handleInputChange("learningProgress", e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="behavioralSignals">Behavioral Signals</Label>
        <Textarea
          id="behavioralSignals"
          placeholder="Describe collaboration style, leadership qualities, communication skills..."
          value={formData.behavioralSignals}
          onChange={(e) => handleInputChange("behavioralSignals", e.target.value)}
          rows={3}
        />
      </div>

      {result && (
        <Alert variant={result.success ? "default" : "destructive"}>
          {result.success ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Analyzing and Adding Employee...
          </>
        ) : (
          "Add Employee"
        )}
      </Button>
    </form>
  )
}
