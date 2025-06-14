import { type NextRequest, NextResponse } from "next/server"
import { getEmployees } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const role = searchParams.get("role")
    const search = searchParams.get("search")
    const minScore = searchParams.get("minScore")
    const tags = searchParams.get("tags")

    const filters = {
      department: department || undefined,
      role: role || undefined,
      search: search || undefined,
      minScore: minScore ? Number.parseInt(minScore) : undefined,
      tags: tags ? tags.split(",") : undefined,
    }

    const employees = await getEmployees(filters)
    return NextResponse.json(employees)
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}
