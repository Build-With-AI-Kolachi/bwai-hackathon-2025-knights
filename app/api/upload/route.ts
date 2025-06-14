import { type NextRequest, NextResponse } from "next/server"
import { addEmployee } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employees } = body

    if (!Array.isArray(employees)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    const results = []

    for (const employeeData of employees) {
      try {
        // Analyze employee data with Gemini
        const analysisResponse = await fetch(`${request.nextUrl.origin}/api/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeData }),
        })

        if (!analysisResponse.ok) {
          throw new Error("Failed to analyze employee data")
        }

        const analysis = await analysisResponse.json()

        // Create employee record with analysis
        const employee = {
          ...employeeData,
          ...analysis,
          id: `emp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        }

        await addEmployee(employee)
        results.push({ success: true, employee: employee.name })
      } catch (error) {
        console.error(`Error processing employee ${employeeData.name}:`, error)
        results.push({ success: false, employee: employeeData.name, error: error.message })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error uploading employees:", error)
    return NextResponse.json({ error: "Failed to upload employees" }, { status: 500 })
  }
}
