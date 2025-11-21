# Tech Stack Analyzer 🚀

A professional React application that analyzes job descriptions using AI to provide detailed tech stack breakdowns and personalized learning roadmaps.

![Tech Stack Analyzer](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-cyan)

## ✨ Features

- **🤖 Multi-Provider AI**: Choose from OpenAI, Anthropic, or Google AI models
- **🔒 Privacy First**: Your API keys never leave your browser - stored locally only
- **📊 Tech Stack Breakdown**: Categorizes technologies by type and importance level
- **🗺️ Learning Roadmap**: Provides structured, phase-by-phase learning paths
- **🎨 Modern UI**: Clean, professional design with Tailwind CSS
- **📱 Responsive**: Works seamlessly on desktop, tablet, and mobile
- **📈 Analytics**: Integrated Vercel Analytics for usage insights
- **⚡ Fast**: Built with Vite for lightning-fast development and production builds

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI Providers**: OpenAI, Anthropic, Google AI (user choice)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- API key from one of these providers:
  - [OpenAI API Key](https://platform.openai.com/api-keys)
  - [Anthropic API Key](https://console.anthropic.com/settings/keys)
  - [Google AI API Key](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ViswanathanStartup/TechStackAnalyser.git
   cd TechStackAnalyser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get an API key from your preferred provider:**
   
   Choose one:
   - **OpenAI**: Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - **Anthropic**: Visit [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
   - **Google AI**: Visit [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   
   You'll enter this key in the app's settings (it stays in your browser only).

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎯 Usage

1. **Configure your AI provider** (first time only):
   - Click the Settings icon (⚙️) in the top right
   - Choose your AI provider (OpenAI, Anthropic, or Google)
   - Select your preferred model
   - Enter your API key (stored locally in your browser)
   - Click Save Settings

2. **Analyze a job description**:
   - Paste a job description into the text area
   - Click "Analyze Tech Stack" or press `Ctrl+Enter`
   - View the results:
     - Summary of the role
     - Tech stack breakdown by category
     - Personalized learning roadmap with phases and resources

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🚢 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy" (no environment variables needed!)
6. Users will configure their API keys in the app settings

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

No environment variables needed - users configure API keys in-app!

### Security Architecture

✅ **Secure by Design**: 
- API keys stored only in user's browser (localStorage)
- Direct communication between browser and AI provider
- No server-side API key storage
- No middleware or proxy
- Complete transparency with open source code

## 🔒 Privacy & Security

**Your data stays with you:**
- API keys stored only in browser localStorage
- Job descriptions sent directly to your chosen AI provider
- We never see or store your API keys or data
- No backend server involved
- Open source - verify for yourself

See full privacy policy in the app settings.

## 🏗️ Project Structure

```
TechStackAnalyser/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # App header
│   │   ├── JobDescriptionInput.tsx  # Input form
│   │   ├── TechStackResults.tsx     # Tech stack display
│   │   └── LearningRoadmap.tsx      # Roadmap display
│   ├── services/
│   │   └── aiService.ts         # AI integration
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts           # TypeScript definitions
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind config
├── vite.config.ts              # Vite config
├── vercel.json                 # Vercel config
└── README.md                   # This file
```

## 🎨 UI Design

The app features a clean, professional design with:
- **White background** with subtle gray gradients
- **Primary blue color scheme** (`#0ea5e9`)
- **Card-based layout** with shadows and borders
- **Responsive grid layouts** for different screen sizes
- **Interactive elements** with hover states and transitions
- **Icons** from Lucide React for visual clarity

## 🤖 AI Providers

Choose from multiple AI providers:

### OpenAI
- **GPT-4 Turbo**: Most capable, best for complex analysis
- **GPT-4**: Powerful and reliable
- **GPT-3.5 Turbo**: Fast and cost-effective

### Anthropic
- **Claude 3.5 Sonnet**: Latest, most intelligent
- **Claude 3 Opus**: Powerful reasoning
- **Claude 3 Sonnet**: Balanced performance

### Google AI
- **Gemini 1.5 Pro**: Most capable, long context
- **Gemini 1.5 Flash**: Fast and efficient
- **Gemini Pro**: Balanced performance

## 📊 Analytics

Vercel Analytics is integrated to track:
- Page views
- User interactions
- Performance metrics

## 🛣️ Roadmap

- [ ] Save analysis history to browser
- [ ] Export results to PDF
- [ ] Compare multiple job descriptions
- [ ] Add skill gap analysis
- [ ] Salary range estimation
- [ ] Job board integration
- [ ] Share analysis via link

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub Models](https://github.com/marketplace/models) for AI capabilities
- [Vercel](https://vercel.com) for hosting and analytics
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for icons

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ using React, TypeScript, and AI
Give the JD, get the Stack and Learn
