# Quick Start Guide - Tech Stack Analyzer

Get up and running in 3 minutes! ⚡

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Start the App (30 seconds)

```bash
npm run dev
```

Visit: **http://localhost:5173**

## Step 3: Configure Your AI Provider (1 minute)

1. Click the **Settings** icon (⚙️) in the top right
2. Choose your AI provider:
   - **OpenAI** - Get key: https://platform.openai.com/api-keys
   - **Anthropic** - Get key: https://console.anthropic.com/settings/keys  
   - **Google AI** - Get key: https://makersuite.google.com/app/apikey
3. Select your preferred model
4. Enter your API key (it's stored locally in your browser only)
5. Click **Save Settings**

## Step 4: Test It! (30 seconds)

1. Copy this sample job description:

```
Senior React Developer

We need a React developer with TypeScript, Node.js, and AWS experience.
You should know Docker, CI/CD, and PostgreSQL. Experience with Next.js
and GraphQL is a plus.
```

2. Paste it into the text area
3. Click **"Analyze Tech Stack"**
4. See the magic! ✨

## Troubleshooting

**"GitHub token not found" error?**
- Make sure `.env` file exists
- Check the token starts with `ghp_`
- Restart the dev server: `Ctrl+C` then `npm run dev`

**"Cannot find module" errors?**
- Run `npm install` again
- Delete `node_modules` folder and run `npm install`

**App won't start?**
- Check Node.js version: `node --version` (need 18+)
- Close other apps on port 5173
- Try: `npm run dev -- --port 3000`

## What's Next?

- ✅ **Deploy to Vercel**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- 📚 **Try More Examples**: See [SAMPLE_JOBS.md](SAMPLE_JOBS.md)
- 🎨 **Customize the UI**: Edit components in `src/components/`
- 🤖 **Change AI Model**: Edit `MODEL` in `src/services/aiService.ts`

## Keyboard Shortcuts

- `Ctrl+Enter` (or `Cmd+Enter` on Mac) - Analyze job description
- `Ctrl+L` - Clear and start over

## Tips for Best Results

1. **Include complete job descriptions** - More context = better analysis
2. **Paste the whole posting** - Include requirements, nice-to-haves, and responsibilities
3. **Try different roles** - Frontend, backend, full-stack, DevOps, etc.
4. **Be patient** - First analysis may take 5-10 seconds

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- 💡 See [SAMPLE_JOBS.md](SAMPLE_JOBS.md) for test data
- 🐛 Found a bug? Open an issue on GitHub

---

**Time to first analysis**: < 5 minutes  
**Difficulty**: Easy  
**Requirements**: Just a GitHub token!

Enjoy analyzing tech stacks! 🎉
