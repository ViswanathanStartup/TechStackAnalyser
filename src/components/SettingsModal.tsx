import { Settings, X, Eye, EyeOff, Shield } from 'lucide-react'
import { useState } from 'react'
import type { AIProvider, AIConfig } from '../services/aiService'
import { MODELS } from '../services/aiService'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentConfig: AIConfig
  onSave: (config: AIConfig) => void
}

const PROVIDER_INFO = {
  openai: {
    name: 'OpenAI',
    website: 'https://platform.openai.com/api-keys',
    description: 'Industry-leading models including GPT-4',
  },
  anthropic: {
    name: 'Anthropic',
    website: 'https://console.anthropic.com/settings/keys',
    description: 'Claude models known for safety and reliability',
  },
  google: {
    name: 'Google AI',
    website: 'https://makersuite.google.com/app/apikey',
    description: 'Gemini models with long context windows',
  },
}

export default function SettingsModal({ isOpen, onClose, currentConfig, onSave }: SettingsModalProps) {
  const [provider, setProvider] = useState<AIProvider>(currentConfig.provider)
  const [apiKey, setApiKey] = useState(currentConfig.apiKey)
  const [model, setModel] = useState(currentConfig.model)
  const [showApiKey, setShowApiKey] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    onSave({ provider, apiKey, model })
    onClose()
  }

  const handleProviderChange = (newProvider: AIProvider) => {
    setProvider(newProvider)
    // Set default model for the provider
    setModel(MODELS[newProvider][0].id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-800">AI Provider Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showPrivacy ? (
          <div className="p-6 space-y-6">
            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">Privacy First</h3>
                  <p className="text-sm text-blue-800 mb-2">
                    Your API key is stored only in your browser's local storage and never sent to our servers.
                    It's used exclusively to communicate directly with your chosen AI provider.
                  </p>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Full Privacy Policy →
                  </button>
                </div>
              </div>
            </div>

            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select AI Provider
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.keys(PROVIDER_INFO) as AIProvider[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => handleProviderChange(p)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      provider === p
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-800 mb-1">
                      {PROVIDER_INFO[p].name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {PROVIDER_INFO[p].description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Model
              </label>
              <div className="space-y-2">
                {MODELS[provider].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start p-3 rounded-lg border cursor-pointer transition-all ${
                      model === m.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="model"
                      value={m.id}
                      checked={model === m.id}
                      onChange={(e) => setModel(e.target.value)}
                      className="mt-1 text-primary-600"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-800">{m.name}</div>
                      <div className="text-sm text-gray-600">{m.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* API Key Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
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
              <p className="mt-2 text-sm text-gray-600">
                Get your API key from{' '}
                <a
                  href={PROVIDER_INFO[provider].website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {PROVIDER_INFO[provider].name} →
                </a>
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="btn-primary"
              >
                Save Settings
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {/* Privacy Policy */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Privacy Policy</h3>
              
              <div className="space-y-3 text-gray-700">
                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">Your Data, Your Control</h4>
                  <p className="text-sm leading-relaxed">
                    Tech Stack Analyzer is designed with privacy at its core. We do not collect, store, 
                    or transmit your API keys or job descriptions to our servers.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">How It Works</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Your API key is stored only in your browser's local storage</li>
                    <li>Job descriptions are sent directly from your browser to your chosen AI provider</li>
                    <li>We never see or store your API key or job descriptions</li>
                    <li>All communication is between you and the AI provider</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">Third-Party Services</h4>
                  <p className="text-sm leading-relaxed">
                    When you use this app, you communicate directly with:
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside mt-2">
                    <li>OpenAI (if selected) - Subject to OpenAI's privacy policy</li>
                    <li>Anthropic (if selected) - Subject to Anthropic's privacy policy</li>
                    <li>Google AI (if selected) - Subject to Google's privacy policy</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">Analytics</h4>
                  <p className="text-sm leading-relaxed">
                    We use Vercel Analytics to understand usage patterns (page views, performance). 
                    This data is anonymized and does not include your API keys or job descriptions.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">Your Rights</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Clear your API key anytime by clearing browser storage</li>
                    <li>Your data stays on your device</li>
                    <li>No account required</li>
                    <li>No tracking cookies</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">Open Source</h4>
                  <p className="text-sm leading-relaxed">
                    This project is open source. You can review our code on GitHub to verify 
                    our privacy claims.
                  </p>
                </section>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowPrivacy(false)}
                className="btn-secondary w-full"
              >
                ← Back to Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
