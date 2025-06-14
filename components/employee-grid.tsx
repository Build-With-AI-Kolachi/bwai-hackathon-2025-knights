"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Employee {
  id: string
  name: string
  role: string
  department: string
  email: string
  adaptabilityIndex: number
  learningUtilizationRate: number
  skillRetentionRate: number
  peerImpactScore: number
  tags: string[]
}

export function EmployeeGrid() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()

        // Add search parameters
        searchParams.forEach((value, key) => {
          if (value) params.append(key, value)
        })

        const response = await fetch(`/api/employees?${params.toString()}`)
        if (response.ok) {
          const data = await response.json()
          setEmployees(data)
        }
      } catch (error) {
        console.error("Error fetching employees:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [searchParams])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{employee.name}</CardTitle>
            <p className="text-sm text-gray-600">
              {employee.role} • {employee.department}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Performance Metrics */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Adaptability</span>
                  <span>{employee.adaptabilityIndex}/100</span>
                </div>
                <Progress value={employee.adaptabilityIndex} className="h-1" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Learning Rate</span>
                  <span>{employee.learningUtilizationRate}/100</span>
                </div>
                <Progress value={employee.learningUtilizationRate} className="h-1" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {employee.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {employee.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{employee.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2">
                <Link href={`/profile/${employee.id}`}>
                  <Button size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
