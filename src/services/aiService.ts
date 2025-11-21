import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { TechStack } from '../App';

export type AIProvider = 'openai' | 'anthropic' | 'google';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
}

// Latest models as of November 2025
export const MODELS = {
  openai: [
    { id: 'gpt-5', name: 'GPT-5', description: 'Most advanced OpenAI model' },
    { id: 'gpt-5-mini', name: 'GPT-5 Mini', description: 'Efficient GPT-5 variant' },
    { id: 'o3', name: 'o3', description: 'Advanced reasoning model' },
    { id: 'o3-mini', name: 'o3 Mini', description: 'Compact reasoning model' },
    { id: 'gpt-4o', name: 'GPT-4o', description: 'Previous generation multimodal' },
  ],
  anthropic: [
    { id: 'claude-4.5-opus', name: 'Claude 4.5 Opus', description: 'Most powerful Claude model' },
    { id: 'claude-4.5-sonnet', name: 'Claude 4.5 Sonnet', description: 'Balanced performance' },
    { id: 'claude-4-opus', name: 'Claude 4 Opus', description: 'Previous flagship' },
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', description: 'Still highly capable' },
  ],
  google: [
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Most advanced Gemini model' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast and efficient' },
    { id: 'gemini-2.0-pro', name: 'Gemini 2.0 Pro', description: 'Powerful reasoning' },
    { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro', description: 'Previous generation' },
  ],
};

const SYSTEM_PROMPT = `You are an expert tech recruiter and career advisor specializing in analyzing job descriptions and creating learning roadmaps.

IMPORTANT: Provide consistent, deterministic analysis. For the same job description, always return the same results.

Your task is to analyze job descriptions and provide:
1. A comprehensive breakdown of the tech stack mentioned
2. A structured learning roadmap for acquiring the required skills

ANALYSIS RULES:
- Extract ONLY technologies explicitly mentioned or strongly implied in the job description
- Do NOT add technologies that aren't in the job description
- Be consistent: same technologies in same JD = same output
- Categorize accurately based on actual usage context
- Mark importance based on job description language:
  * "required", "must have", "essential" → "required"
  * "preferred", "nice to have", "plus" → "preferred" 
  * "bonus", "good to have" → "nice-to-have"

CATEGORIZATION:
- Frontend: React, Vue, Angular, HTML, CSS, JavaScript, TypeScript
- Backend: Node.js, Python, Java, C#, Go, Ruby, PHP
- Database: PostgreSQL, MySQL, MongoDB, Redis, DynamoDB
- DevOps: Docker, Kubernetes, AWS, Azure, GCP, CI/CD, Jenkins
- Mobile: React Native, Flutter, Swift, Kotlin
- Testing: Jest, Pytest, Selenium, Cypress
- Tools: Git, Jira, Figma, VS Code

For each technology, provide:
- Category (use categories above)
- Importance level: "required", "preferred", or "nice-to-have"
- Brief, accurate description (2-3 sentences max)

For the learning roadmap:
- Create 4-6 logical phases based on actual skill progression
- Provide realistic time estimates (weeks/months)
- List specific, actionable topics per phase
- Suggest practical learning resources (official docs, courses, books)
- Build from foundational to advanced concepts

Return ONLY valid JSON in this exact format:
{
  "summary": "A brief 2-3 sentence overview of the role and key requirements",
  "technologies": [
    {
      "name": "Technology Name",
      "category": "Category",
      "importance": "required|preferred|nice-to-have",
      "description": "Brief accurate description"
    }
  ],
  "roadmap": [
    {
      "phase": "Phase Name",
      "duration": "Estimated duration",
      "topics": ["Specific topic 1", "Specific topic 2"],
      "resources": ["Resource name/link 1", "Resource name/link 2"]
    }
  ]
}

CONSISTENCY REQUIREMENTS:
- Same input = same output always
- No randomness or variations
- Deterministic categorization
- Consistent importance levels
- Reproducible recommendations`;

async function analyzeWithOpenAI(config: AIConfig, jobDescription: string): Promise<TechStack> {
  const client = new OpenAI({
    apiKey: config.apiKey,
    dangerouslyAllowBrowser: true,
  });

  // Use max_completion_tokens for newer models (GPT-5, o3, etc.)
  const useNewParameter = config.model.includes('gpt-5') || config.model.includes('o3');
  // Reasoning models (o3, o1) and GPT-5 don't support temperature parameter
  const supportsTemperature = !config.model.includes('o3') && !config.model.includes('o1') && !config.model.includes('gpt-5');
  
  const params: any = {
    model: config.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { 
        role: 'user', 
        content: `Analyze this job description and provide a tech stack breakdown and learning roadmap:\n\n${jobDescription}` 
      }
    ],
    response_format: { type: 'json_object' },
  };

  // Only add temperature for models that support it
  if (supportsTemperature) {
    params.temperature = 0;
    params.seed = 42;
  }

  if (useNewParameter) {
    params.max_completion_tokens = 4000;
  } else {
    params.max_tokens = 4000;
  }

  const response = await client.chat.completions.create(params);

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from OpenAI');
  
  return JSON.parse(content) as TechStack;
}

async function analyzeWithAnthropic(config: AIConfig, jobDescription: string): Promise<TechStack> {
  const client = new Anthropic({
    apiKey: config.apiKey,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.messages.create({
    model: config.model,
    max_tokens: 4000,
    temperature: 0, // Set to 0 for deterministic output
    system: SYSTEM_PROMPT,
    messages: [
      { 
        role: 'user', 
        content: `Analyze this job description and provide a tech stack breakdown and learning roadmap in JSON format:\n\n${jobDescription}` 
      }
    ],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response format from Anthropic');
  
  // Extract JSON from response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  return JSON.parse(jsonMatch[0]) as TechStack;
}

async function analyzeWithGoogle(config: AIConfig, jobDescription: string): Promise<TechStack> {
  const genAI = new GoogleGenerativeAI(config.apiKey);
  const model = genAI.getGenerativeModel({ 
    model: config.model,
    generationConfig: {
      temperature: 0, // Set to 0 for deterministic output
      maxOutputTokens: 4000,
    },
  });

  const prompt = `${SYSTEM_PROMPT}\n\nAnalyze this job description and provide a tech stack breakdown and learning roadmap:\n\n${jobDescription}`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const content = response.text();
  
  // Extract JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  return JSON.parse(jsonMatch[0]) as TechStack;
}

export async function analyzeTechStack(config: AIConfig, jobDescription: string): Promise<TechStack> {
  if (!config.apiKey) {
    throw new Error('API key is required. Please configure your API key in settings.');
  }

  try {
    let result: TechStack;

    switch (config.provider) {
      case 'openai':
        result = await analyzeWithOpenAI(config, jobDescription);
        break;
      case 'anthropic':
        result = await analyzeWithAnthropic(config, jobDescription);
        break;
      case 'google':
        result = await analyzeWithGoogle(config, jobDescription);
        break;
      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }

    // Validate the response structure
    if (!result.summary || !result.technologies || !result.roadmap) {
      throw new Error('Invalid response format from AI model');
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during analysis');
  }
}
