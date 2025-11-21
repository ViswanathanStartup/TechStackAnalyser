import { Eye, EyeOff, Shield, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import type { AIProvider, AIConfig } from '../services/aiService'
import { MODELS } from '../services/aiService'

interface AIProviderConfigProps {
  config: AIConfig
  onChange: (config: AIConfig) => void
}

const PROVIDER_INFO = {
  openai: {
    name: 'OpenAI',
    website: 'https://platform.openai.com/api-keys',
  },
  anthropic: {
    name: 'Anthropic',
    website: 'https://console.anthropic.com/settings/keys',
  },
  google: {
    name: 'Google AI',
    website: 'https://makersuite.google.com/app/apikey',
  },
}

export default function AIProviderConfig({ config, onChange }: AIProviderConfigProps) {
  const [showApiKey, setShowApiKey] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleProviderChange = (provider: AIProvider) => {
    onChange({
      provider,
      apiKey: config.apiKey,
      model: MODELS[provider][0].id,
    })
  }

  const handleModelChange = (model: string) => {
    onChange({ ...config, model })
  }

  const handleApiKeyChange = (apiKey: string) => {
    onChange({ ...config, apiKey })
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">AI Provider Configuration</h2>
        <button
          onClick={() => setShowPrivacy(!showPrivacy)}
          className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
        >
          <Shield className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>
      </div>

      {showPrivacy && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <h3 className="font-semibold text-blue-900 mb-2">🔒 Your Privacy Matters</h3>
          <ul className="text-blue-800 space-y-1 list-disc list-inside">
            <li>API keys stored only in your browser's localStorage</li>
            <li>Job descriptions sent directly to your chosen AI provider</li>
            <li>We never see, store, or transmit your API keys or data</li>
            <li>No backend servers involved - direct browser-to-AI communication</li>
            <li>Open source - verify our code on GitHub</li>
          </ul>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {(Object.keys(PROVIDER_INFO) as AIProvider[]).map((provider) => (
          <button
            key={provider}
            onClick={() => handleProviderChange(provider)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              config.provider === provider
                ? 'border-primary-600 bg-primary-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold text-gray-800">
              {PROVIDER_INFO[provider].name}
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Model
          </label>
          <select
            value={config.model}
            onChange={(e) => handleModelChange(e.target.value)}
            className="input-field"
          >
            {MODELS[config.provider].map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} - {model.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            API Key
            <a
              href={PROVIDER_INFO[config.provider].website}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-primary-600 hover:text-primary-700 text-xs font-normal inline-flex items-center"
            >
              Get key <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={config.apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="Enter your API key"
              className="input-field pr-10"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
