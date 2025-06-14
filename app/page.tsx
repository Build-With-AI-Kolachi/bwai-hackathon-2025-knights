import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Award, Target } from "lucide-react"
import Link from "next/link"
import { StatsOverview } from "@/components/stats-overview"
import { TalentHeatmap } from "@/components/talent-heatmap"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TalentCanvas</h1>
          <p className="text-xl text-gray-600 mb-8">AI-Powered Internal Talent Intelligence Platform</p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Dashboard
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="lg" variant="outline">
                Upload Data
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <Suspense fallback={<div>Loading stats...</div>}>
          <StatsOverview />
        </Suspense>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Leverage Gemini AI to analyze employee data and generate intelligent performance insights
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto text-green-600 mb-2" />
              <CardTitle>Performance Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track Adaptability Index, Learning Utilization Rate, and Peer Impact Scores
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Award className="w-12 h-12 mx-auto text-purple-600 mb-2" />
              <CardTitle>Smart Tagging</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically generate descriptive tags like "Emerging Leader" and "High Collaboration Impact"
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Target className="w-12 h-12 mx-auto text-orange-600 mb-2" />
              <CardTitle>Talent Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualize talent distribution and identify high-potential employees across departments
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Talent Heatmap Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Talent Distribution Heatmap</CardTitle>
            <CardDescription>Overview of talent performance across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading heatmap...</div>}>
              <TalentHeatmap />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
