"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter, useSearchParams } from "next/navigation"

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

const commonTags = [
  "Emerging Leader",
  "High Collaboration Impact",
  "Technical Expert",
  "Innovation Driver",
  "Retention Risk",
  "High Potential",
  "Mentor",
  "Cross-functional Leader",
]

export function EmployeeFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [department, setDepartment] = useState(searchParams.get("department") || "All departments")
  const [role, setRole] = useState(searchParams.get("role") || "All roles")
  const [minScore, setMinScore] = useState(searchParams.get("minScore") || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(searchParams.get("tags")?.split(",").filter(Boolean) || [])

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (search) params.set("search", search)
    if (department !== "All departments") params.set("department", department)
    if (role !== "All roles") params.set("role", role)
    if (minScore) params.set("minScore", minScore)
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","))

    router.push(`/dashboard?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setDepartment("All departments")
    setRole("All roles")
    setMinScore("")
    setSelectedTags([])
    router.push("/dashboard")
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag])
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Department */}
      <div>
        <Label>Department</Label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All departments">All departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Role */}
      <div>
        <Label>Role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All roles">All roles</SelectItem>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Minimum Score */}
      <div>
        <Label htmlFor="minScore">Minimum Performance Score</Label>
        <Input
          id="minScore"
          type="number"
          min="0"
          max="100"
          placeholder="0-100"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div>
        <Label>Tags</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {commonTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
              />
              <Label htmlFor={tag} className="text-sm">
                {tag}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  )
}
