"use client"

import { useEffect, useState } from "react"

interface HeatmapData {
  department: string
  avgScore: number
  employeeCount: number
}

export function TalentHeatmap() {
  const [data, setData] = useState<HeatmapData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await fetch("/api/employees")
        if (response.ok) {
          const employees = await response.json()

          // Group by department and calculate averages
          const departmentData: { [key: string]: { scores: number[]; count: number } } = {}

          employees.forEach((emp: any) => {
            if (!departmentData[emp.department]) {
              departmentData[emp.department] = { scores: [], count: 0 }
            }

            const avgScore =
              (emp.adaptabilityIndex + emp.learningUtilizationRate + emp.skillRetentionRate + emp.peerImpactScore) / 4

            departmentData[emp.department].scores.push(avgScore)
            departmentData[emp.department].count++
          })

          const heatmapData = Object.entries(departmentData).map(([dept, data]) => ({
            department: dept,
            avgScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
            employeeCount: data.count,
          }))

          setData(heatmapData)
        }
      } catch (error) {
        console.error("Error fetching heatmap data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeatmapData()
  }, [])

  if (loading) {
    return <div className="h-64 bg-gray-100 animate-pulse rounded"></div>
  }

  const getColorIntensity = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 70) return "bg-green-400"
    if (score >= 60) return "bg-yellow-400"
    if (score >= 50) return "bg-orange-400"
    return "bg-red-400"
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((item) => (
        <div key={item.department} className={`p-4 rounded-lg text-white ${getColorIntensity(item.avgScore)}`}>
          <div className="font-semibold text-sm">{item.department}</div>
          <div className="text-2xl font-bold">{item.avgScore}</div>
          <div className="text-xs opacity-90">{item.employeeCount} employees</div>
        </div>
      ))}
    </div>
  )
}
