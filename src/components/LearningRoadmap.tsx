import { Map, Clock, BookOpen, ExternalLink } from 'lucide-react'

interface RoadmapPhase {
  phase: string
  duration: string
  topics: string[]
  resources: string[]
}

interface LearningRoadmapProps {
  roadmap: RoadmapPhase[]
}

export default function LearningRoadmap({ roadmap }: LearningRoadmapProps) {
  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <Map className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-800">Learning Roadmap</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Follow this personalized roadmap to master the required technologies.
      </p>

      <div className="space-y-6">
        {roadmap.map((phase, index) => (
          <div key={index} className="relative">
            {index < roadmap.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-primary-200" />
            )}
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-grow pb-8">
                <div className="bg-gradient-to-r from-primary-50 to-white border border-primary-100 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{phase.phase}</h3>
                    <div className="flex items-center space-x-2 text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{phase.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="w-4 h-4 text-gray-600" />
                      <h4 className="font-medium text-gray-700">Topics to Learn:</h4>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics.map((topic, topicIndex) => (
                        <li
                          key={topicIndex}
                          className="flex items-start space-x-2 text-gray-700"
                        >
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {phase.resources.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                        <h4 className="font-medium text-gray-700">Recommended Resources:</h4>
                      </div>
                      <ul className="space-y-1">
                        {phase.resources.map((resource, resourceIndex) => (
                          <li
                            key={resourceIndex}
                            className="text-sm text-primary-600 hover:text-primary-800"
                          >
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
