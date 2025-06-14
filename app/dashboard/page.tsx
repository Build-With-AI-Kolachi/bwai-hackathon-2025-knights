import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployeeFilters } from "@/components/employee-filters"
import { EmployeeGrid } from "@/components/employee-grid"
import { TalentMetrics } from "@/components/talent-metrics"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Talent Dashboard</h1>
          <p className="text-gray-600">Analyze and manage your organization's talent intelligence</p>
        </div>

        {/* Metrics Overview */}
        <Suspense fallback={<div>Loading metrics...</div>}>
          <TalentMetrics />
        </Suspense>

        {/* Filters and Employee Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <EmployeeFilters />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading employees...</div>}>
              <EmployeeGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
