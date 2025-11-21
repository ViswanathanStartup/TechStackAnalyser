# Deployment Guide for Tech Stack Analyzer

## Prerequisites

1. **GitHub Account** - For code hosting
2. **Vercel Account** - For deployment (free tier available)
3. **GitHub Personal Access Token** - For AI model access

## Step 1: Get Your GitHub Token

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name: "Tech Stack Analyzer"
4. Set expiration (recommended: 90 days)
5. Select scopes:
   - ✅ `repo` (if you have private repos)
   - ✅ `public_repo` (minimum required)
6. Click **"Generate token"**
7. **IMPORTANT**: Copy the token immediately (you won't see it again!)

## Step 2: Add Token to Local Environment

1. Open the `.env` file in your project root
2. Add your token:
   ```env
   VITE_GITHUB_TOKEN=ghp_your_token_here
   ```
3. Save the file
4. **NEVER** commit this file to Git (it's in `.gitignore`)

## Step 3: Test Locally

```bash
# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
# Test with a sample job description
```

## Step 4: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Tech Stack Analyzer"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/TechStackAnalyser.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..." > "Project"**
4. Import your repository: `TechStackAnalyser`
5. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variable:
   - Click **"Environment Variables"**
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub token (paste it)
   - Select all environments (Production, Preview, Development)
7. Click **"Deploy"**
8. Wait 1-2 minutes for deployment
9. Your app is live! 🎉

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? TechStackAnalyser
# - In which directory is your code? ./
# - Want to override settings? N

# Add environment variable
vercel env add VITE_GITHUB_TOKEN production
# Paste your GitHub token when prompted

# Deploy to production
vercel --prod
```

## Step 6: Configure Vercel Analytics (Optional)

Analytics is already integrated in the code! Just:

1. Go to your Vercel project dashboard
2. Click on **"Analytics"** tab
3. Enable Web Analytics (free tier includes 100k events/month)
4. Analytics will start collecting data automatically

## Step 7: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings > Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify TypeScript configuration
- Run `npm run build` locally to test

### "No Response from AI Model" Error

- Verify your GitHub token is correct
- Check token hasn't expired
- Ensure token has proper scopes
- Check Vercel environment variables

### Environment Variable Not Working

- Ensure variable name is exactly: `VITE_GITHUB_TOKEN`
- Add to all environments in Vercel
- Redeploy after adding environment variables

### Rate Limiting

GitHub Models free tier has rate limits:
- If you hit limits, wait a few minutes
- Consider upgrading to GitHub Pro for higher limits
- Monitor usage in GitHub settings

## Post-Deployment Checklist

- [ ] App loads without errors
- [ ] Can paste job description
- [ ] Analysis works and returns results
- [ ] All sections display correctly
- [ ] Responsive on mobile
- [ ] Analytics tracking (check after 24 hours)

## Production Best Practices

### Security Enhancement (Recommended)

For production, move the GitHub token to server-side:

1. Create a Vercel Serverless Function:
   ```typescript
   // api/analyze.ts
   import OpenAI from 'openai';
   
   export default async function handler(req, res) {
     const client = new OpenAI({
       baseURL: 'https://models.github.ai/inference',
       apiKey: process.env.GITHUB_TOKEN, // Server-side only
     });
     
     // Process request and return response
   }
   ```

2. Update frontend to call `/api/analyze` instead of direct client

3. Remove `dangerouslyAllowBrowser: true`

### Performance Optimization

- Enable Vercel Image Optimization for any images
- Use Vercel Edge Functions for faster response times
- Monitor Core Web Vitals in Vercel Analytics

### Monitoring

- Set up Vercel monitoring alerts
- Check error logs regularly
- Monitor API usage in GitHub

## Updating Your Deployment

```bash
# Make changes locally
# Test with npm run dev
# Commit changes
git add .
git commit -m "Your update message"
git push

# Vercel auto-deploys on push to main branch!
```

## Cost Breakdown

- **GitHub Models**: Free tier (with rate limits)
- **Vercel Hosting**: Free tier (100GB bandwidth, unlimited sites)
- **Vercel Analytics**: Free tier (100k events/month)
- **Custom Domain**: ~$10-15/year (from domain registrar)

**Total Cost**: $0 to start (+ optional domain)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Verify environment variables
4. Check GitHub token validity
5. Open an issue on GitHub repo

---

**Deployment Time**: ~10 minutes
**Difficulty**: Easy
**Prerequisites**: Basic Git knowledge

Happy deploying! 🚀
