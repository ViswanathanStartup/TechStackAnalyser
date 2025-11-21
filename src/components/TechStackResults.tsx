import { Layers, Star, TrendingUp, CheckCircle2 } from 'lucide-react'

interface Technology {
  name: string
  category: string
  importance: 'required' | 'preferred' | 'nice-to-have'
  description: string
}

interface TechStackResultsProps {
  technologies: Technology[]
}

const importanceConfig = {
  required: {
    label: 'Required',
    color: 'text-red-700 bg-red-50 border-red-200',
    icon: Star,
  },
  preferred: {
    label: 'Preferred',
    color: 'text-orange-700 bg-orange-50 border-orange-200',
    icon: TrendingUp,
  },
  'nice-to-have': {
    label: 'Nice to Have',
    color: 'text-green-700 bg-green-50 border-green-200',
    icon: CheckCircle2,
  },
}

export default function TechStackResults({ technologies }: TechStackResultsProps) {
  const groupedByCategory = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech)
    return acc
  }, {} as Record<string, Technology[]>)

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <Layers className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-800">Tech Stack Breakdown</h2>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedByCategory).map(([category, techs]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
              {category}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {techs.map((tech, index) => {
                const config = importanceConfig[tech.importance]
                const Icon = config.icon
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${config.color}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{tech.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{config.label}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{tech.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
