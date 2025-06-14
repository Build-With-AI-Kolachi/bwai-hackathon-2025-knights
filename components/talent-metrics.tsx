import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getEmployeeStats } from "@/lib/data"

export async function TalentMetrics() {
  const stats = await getEmployeeStats()

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Avg Adaptability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{stats.avgAdaptability}/100</div>
          <Progress value={stats.avgAdaptability} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Avg Learning Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{stats.avgLearningRate}/100</div>
          <Progress value={stats.avgLearningRate} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Avg Skill Retention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{stats.avgSkillRetention}/100</div>
          <Progress value={stats.avgSkillRetention} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Avg Peer Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{stats.avgPeerImpact}/100</div>
          <Progress value={stats.avgPeerImpact} className="h-2" />
        </CardContent>
      </Card>
    </div>
  )
}
