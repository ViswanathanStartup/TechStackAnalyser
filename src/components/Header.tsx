import { Code2, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <Code2 className="w-10 h-10 text-primary-600" />
            <Sparkles className="w-5 h-5 text-primary-400 absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tech Stack Analyzer</h1>
            <p className="text-sm text-gray-600">Decode job descriptions • Build your roadmap</p>
          </div>
        </div>
      </div>
    </header>
  )
}
