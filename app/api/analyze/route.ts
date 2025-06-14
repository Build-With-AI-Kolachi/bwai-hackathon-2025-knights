import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

const AnalysisSchema = z.object({
  adaptabilityIndex: z.number().min(0).max(100),
  learningUtilizationRate: z.number().min(0).max(100),
  skillRetentionRate: z.number().min(0).max(100),
  peerImpactScore: z.number().min(0).max(100),
  tags: z.array(z.string()).max(5),
  summary: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeData } = body

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    const prompt = `
    Analyze the following employee data and provide performance insights:
    
    Employee: ${employeeData.name}
    Role: ${employeeData.role}
    Department: ${employeeData.department}
    Project History: ${employeeData.projectHistory || "Not provided"}
    Learning Progress: ${employeeData.learningProgress || "Not provided"}
    Behavioral Signals: ${employeeData.behavioralSignals || "Not provided"}
    Years of Experience: ${employeeData.experience || "Not provided"}
    
    Please analyze this data and provide:
    1. Adaptability Index (0-100): How well the employee adapts to change
    2. Learning Utilization Rate (0-100): How effectively they apply new learning
    3. Skill Retention Rate (0-100): How well they retain and build upon skills
    4. Peer Impact Score (0-100): Their influence and collaboration with peers
    5. Up to 5 descriptive tags (e.g., "Emerging Leader", "High Collaboration Impact", "Retention Risk")
    6. A brief summary of their strengths and areas for development
    
    Base your analysis on the provided data, considering factors like project complexity, learning engagement, collaboration patterns, and career progression.
    `

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: AnalysisSchema,
      prompt,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("Error analyzing employee data:", error)
    return NextResponse.json({ error: "Failed to analyze employee data" }, { status: 500 })
  }
}
