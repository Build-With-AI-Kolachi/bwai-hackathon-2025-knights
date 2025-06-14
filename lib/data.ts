// Mock database using in-memory storage
// In production, this would connect to a real database

interface Employee {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  experience: number
  projectHistory: string
  learningProgress: string
  behavioralSignals: string
  adaptabilityIndex: number
  learningUtilizationRate: number
  skillRetentionRate: number
  peerImpactScore: number
  tags: string[]
  summary: string
  createdAt: string
}

// Mock data storage
const employees: Employee[] = [
  {
    id: "emp_001",
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    department: "Engineering",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    experience: 5,
    projectHistory: "Led development of microservices architecture, mentored 3 junior developers",
    learningProgress: "Completed AWS Solutions Architect certification, learning Kubernetes",
    behavioralSignals: "Strong technical leadership, excellent cross-team collaboration",
    adaptabilityIndex: 88,
    learningUtilizationRate: 92,
    skillRetentionRate: 85,
    peerImpactScore: 90,
    tags: ["Technical Expert", "Emerging Leader", "High Collaboration Impact"],
    summary:
      "Sarah demonstrates exceptional technical leadership and adaptability. Her strong learning utilization and peer impact make her a valuable mentor and technical contributor.",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "emp_002",
    name: "Marcus Johnson",
    role: "Product Manager",
    department: "Product",
    email: "marcus.johnson@company.com",
    phone: "+1 (555) 234-5678",
    experience: 7,
    projectHistory: "Managed 15+ product features, increased user engagement by 40%",
    learningProgress: "Completed Product Management certification, studying data analytics",
    behavioralSignals: "Strategic thinker, excellent stakeholder management",
    adaptabilityIndex: 85,
    learningUtilizationRate: 78,
    skillRetentionRate: 88,
    peerImpactScore: 92,
    tags: ["Strategic Leader", "High Collaboration Impact", "Innovation Driver"],
    summary:
      "Marcus excels in strategic product thinking and stakeholder management. His high peer impact score reflects his ability to drive cross-functional initiatives.",
    createdAt: "2024-01-16T11:30:00Z",
  },
  {
    id: "emp_003",
    name: "Emily Rodriguez",
    role: "UX Designer",
    department: "Design",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    experience: 3,
    projectHistory: "Redesigned core user flows, improved conversion rates by 25%",
    learningProgress: "Learning Figma advanced features, completed UX research course",
    behavioralSignals: "Creative problem solver, user-focused approach",
    adaptabilityIndex: 82,
    learningUtilizationRate: 95,
    skillRetentionRate: 80,
    peerImpactScore: 75,
    tags: ["High Potential", "Innovation Driver", "User Advocate"],
    summary:
      "Emily shows exceptional learning utilization and creative problem-solving skills. Her user-focused approach drives significant improvements in product usability.",
    createdAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "emp_004",
    name: "David Kim",
    role: "Software Engineer",
    department: "Engineering",
    email: "david.kim@company.com",
    phone: "+1 (555) 456-7890",
    experience: 2,
    projectHistory: "Contributed to 5 major features, fixed critical performance issues",
    learningProgress: "Learning React Native, completed JavaScript advanced course",
    behavioralSignals: "Detail-oriented, reliable team player",
    adaptabilityIndex: 70,
    learningUtilizationRate: 85,
    skillRetentionRate: 75,
    peerImpactScore: 65,
    tags: ["Reliable Contributor", "Technical Growth"],
    summary:
      "David is a reliable contributor with strong technical fundamentals. His learning progress shows potential for increased impact as he gains more experience.",
    createdAt: "2024-01-18T14:20:00Z",
  },
  {
    id: "emp_005",
    name: "Lisa Thompson",
    role: "Marketing Manager",
    department: "Marketing",
    email: "lisa.thompson@company.com",
    phone: "+1 (555) 567-8901",
    experience: 6,
    projectHistory: "Led 10+ campaigns, increased brand awareness by 60%",
    learningProgress: "Studying digital marketing trends, completed Google Analytics certification",
    behavioralSignals: "Creative strategist, excellent communication skills",
    adaptabilityIndex: 90,
    learningUtilizationRate: 88,
    skillRetentionRate: 92,
    peerImpactScore: 85,
    tags: ["Creative Leader", "High Collaboration Impact", "Brand Champion"],
    summary:
      "Lisa demonstrates exceptional adaptability and creative leadership in marketing initiatives. Her strong skill retention and collaboration make her a key driver of brand success.",
    createdAt: "2024-01-19T16:45:00Z",
  },
  {
    id: "emp_006",
    name: "James Wilson",
    role: "Sales Representative",
    department: "Sales",
    email: "james.wilson@company.com",
    phone: "+1 (555) 678-9012",
    experience: 4,
    projectHistory: "Exceeded sales targets by 30%, closed 50+ deals",
    learningProgress: "Completed advanced sales training, learning CRM optimization",
    behavioralSignals: "Persistent, relationship-focused, competitive drive",
    adaptabilityIndex: 75,
    learningUtilizationRate: 80,
    skillRetentionRate: 85,
    peerImpactScore: 78,
    tags: ["Results Driver", "Client Champion", "Competitive Spirit"],
    summary:
      "James consistently exceeds targets through strong relationship building and persistent effort. His competitive drive and client focus make him a valuable sales contributor.",
    createdAt: "2024-01-20T13:10:00Z",
  },
  {
    id: "emp_007",
    name: "Rachel Green",
    role: "HR Specialist",
    department: "HR",
    email: "rachel.green@company.com",
    phone: "+1 (555) 789-0123",
    experience: 8,
    projectHistory: "Implemented new onboarding process, reduced turnover by 20%",
    learningProgress: "Pursuing SHRM certification, studying employee engagement strategies",
    behavioralSignals: "Empathetic, process-oriented, strong interpersonal skills",
    adaptabilityIndex: 88,
    learningUtilizationRate: 85,
    skillRetentionRate: 90,
    peerImpactScore: 95,
    tags: ["People Champion", "Process Optimizer", "High Collaboration Impact", "Mentor"],
    summary:
      "Rachel excels in people management and process optimization. Her exceptional peer impact score reflects her ability to support and develop team members across the organization.",
    createdAt: "2024-01-21T08:30:00Z",
  },
  {
    id: "emp_008",
    name: "Alex Chen",
    role: "Financial Analyst",
    department: "Finance",
    email: "alex.chen@company.com",
    phone: "+1 (555) 890-1234",
    experience: 3,
    projectHistory: "Built financial models for 5 major initiatives, improved forecasting accuracy",
    learningProgress: "Learning advanced Excel and Python for data analysis",
    behavioralSignals: "Analytical, detail-oriented, methodical approach",
    adaptabilityIndex: 72,
    learningUtilizationRate: 88,
    skillRetentionRate: 85,
    peerImpactScore: 70,
    tags: ["Analytical Expert", "Data Driven", "Methodical Thinker"],
    summary:
      "Alex demonstrates strong analytical capabilities and attention to detail. His high learning utilization rate shows potential for expanded impact in financial strategy.",
    createdAt: "2024-01-22T12:00:00Z",
  },
]

interface EmployeeFilters {
  department?: string
  role?: string
  search?: string
  minScore?: number
  tags?: string[]
}

export async function getEmployees(filters?: EmployeeFilters): Promise<Employee[]> {
  let filteredEmployees = [...employees]

  if (filters) {
    if (filters.department) {
      filteredEmployees = filteredEmployees.filter((emp) => emp.department === filters.department)
    }

    if (filters.role) {
      filteredEmployees = filteredEmployees.filter((emp) => emp.role === filters.role)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredEmployees = filteredEmployees.filter(
        (emp) => emp.name.toLowerCase().includes(searchLower) || emp.email.toLowerCase().includes(searchLower),
      )
    }

    if (filters.minScore) {
      filteredEmployees = filteredEmployees.filter((emp) => {
        const avgScore =
          (emp.adaptabilityIndex + emp.learningUtilizationRate + emp.skillRetentionRate + emp.peerImpactScore) / 4
        return avgScore >= filters.minScore!
      })
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredEmployees = filteredEmployees.filter((emp) => filters.tags!.some((tag) => emp.tags.includes(tag)))
    }
  }

  return filteredEmployees
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  return employees.find((emp) => emp.id === id) || null
}

export async function addEmployee(employee: Employee): Promise<void> {
  employees.push(employee)
}

export async function getEmployeeStats() {
  const totalEmployees = employees.length
  const departments = new Set(employees.map((emp) => emp.department))
  const totalDepartments = departments.size

  const avgAdaptability = Math.round(employees.reduce((sum, emp) => sum + emp.adaptabilityIndex, 0) / totalEmployees)
  const avgLearningRate = Math.round(
    employees.reduce((sum, emp) => sum + emp.learningUtilizationRate, 0) / totalEmployees,
  )
  const avgSkillRetention = Math.round(employees.reduce((sum, emp) => sum + emp.skillRetentionRate, 0) / totalEmployees)
  const avgPeerImpact = Math.round(employees.reduce((sum, emp) => sum + emp.peerImpactScore, 0) / totalEmployees)

  const avgPerformance = Math.round((avgAdaptability + avgLearningRate + avgSkillRetention + avgPeerImpact) / 4)

  const highPerformers = employees.filter((emp) => {
    const avgScore =
      (emp.adaptabilityIndex + emp.learningUtilizationRate + emp.skillRetentionRate + emp.peerImpactScore) / 4
    return avgScore >= 80
  }).length

  const atRisk = employees.filter((emp) => {
    const avgScore =
      (emp.adaptabilityIndex + emp.learningUtilizationRate + emp.skillRetentionRate + emp.peerImpactScore) / 4
    return avgScore < 60 || emp.tags.includes("Retention Risk")
  }).length

  return {
    totalEmployees,
    totalDepartments,
    avgPerformance,
    avgAdaptability,
    avgLearningRate,
    avgSkillRetention,
    avgPeerImpact,
    highPerformers,
    atRisk,
  }
}
