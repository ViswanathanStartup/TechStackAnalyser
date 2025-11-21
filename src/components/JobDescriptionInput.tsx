import { FileText, Sparkles } from 'lucide-react'

interface JobDescriptionInputProps {
  value: string
  onChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export default function JobDescriptionInput({
  value,
  onChange,
  onAnalyze,
  isAnalyzing
}: JobDescriptionInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onAnalyze()
    }
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-800">Paste Job Description</h2>
      </div>
      
      <p className="text-gray-600 mb-4">
        Copy and paste any job description below to get a detailed breakdown of the tech stack 
        and a personalized learning roadmap.
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste the job description here...&#10;&#10;Example:&#10;We are looking for a Full Stack Developer with experience in React, Node.js, PostgreSQL, and AWS. You should be familiar with TypeScript, Docker, and CI/CD pipelines..."
        className="textarea-field"
        rows={12}
        disabled={isAnalyzing}
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-xs">Ctrl+Enter</kbd> to analyze
        </p>
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !value.trim()}
          className="btn-primary flex items-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Tech Stack'}</span>
        </button>
      </div>
    </div>
  )
}
