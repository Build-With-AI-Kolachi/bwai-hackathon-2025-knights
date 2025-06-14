"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PerformanceChartProps {
  employeeId: string
}

export function PerformanceChart({ employeeId }: PerformanceChartProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Generate mock performance trend data
    const generateTrendData = () => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      return months.map((month) => ({
        month,
        adaptability: Math.floor(Math.random() * 20) + 70,
        learning: Math.floor(Math.random() * 20) + 65,
        skillRetention: Math.floor(Math.random() * 20) + 75,
        peerImpact: Math.floor(Math.random() * 20) + 70,
      }))
    }

    setData(generateTrendData())
  }, [employeeId])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="adaptability" stroke="#3b82f6" strokeWidth={2} name="Adaptability" />
          <Line type="monotone" dataKey="learning" stroke="#10b981" strokeWidth={2} name="Learning Rate" />
          <Line type="monotone" dataKey="skillRetention" stroke="#f59e0b" strokeWidth={2} name="Skill Retention" />
          <Line type="monotone" dataKey="peerImpact" stroke="#8b5cf6" strokeWidth={2} name="Peer Impact" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
