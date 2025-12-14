# 🚀 PoetryWorld Deployment Guide

This guide will help you deploy PoetryWorld to production.

## Prerequisites

Before deploying, make sure you have:
- ✅ A Supabase account and project
- ✅ An OpenAI API key
- ✅ A Vercel account (recommended) or another hosting platform
- ✅ Your code pushed to GitHub

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for the project to be created

### 1.2 Run Database Schema
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the entire content from `database/schema.sql`
5. Paste it into the SQL editor
6. Click "Run" to execute the schema

### 1.3 Get Your Supabase Credentials
1. Go to Project Settings → API
2. Copy your:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Anon/Public Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 1.4 Set Up Admin User
After deploying and creating your first user account:
1. Go to Supabase Dashboard → Table Editor → users
2. Find your user record
3. Change the `role` field from 'user' to 'admin'
4. Save the changes

## Step 2: Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy and save your API key (OPENAI_API_KEY)

**Important:** Keep your API key secure and never commit it to version control!

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `poetryworld` repository

### 3.2 Configure Environment Variables
In the Vercel project settings, add these environment variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
ADMIN_EMAIL=your_admin_email@example.com
\`\`\`

### 3.3 Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `your-project.vercel.app`

### 3.4 Set Up Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Step 4: Post-Deployment Setup

### 4.1 Test the Application
1. Visit your deployed URL
2. Test the splash screen and navigation
3. Try creating an account
4. Test AI features with your OpenAI key

### 4.2 Set Up Your Admin Account
1. Create a user account through the website
2. Go to Supabase Dashboard
3. Update your user role to 'admin'
4. Refresh the website
5. You should now see admin features

### 4.3 Add Initial Content
As admin, you can now:
1. Upload your first poems
2. Create categories
3. Test all admin features

## Alternative Deployment Options

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables
6. Deploy

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Add environment variables
6. Deploy

### Self-Hosting with Docker

Create a `Dockerfile`:

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

Build and run:
\`\`\`bash
docker build -t poetryworld .
docker run -p 3000:3000 --env-file .env poetryworld
\`\`\`

## Monitoring and Maintenance

### Monitor OpenAI Usage
1. Check your OpenAI dashboard regularly
2. Set up usage alerts
3. Monitor API costs

### Monitor Supabase
1. Check database size
2. Monitor API requests
3. Review logs for errors

### Update Dependencies
Regularly update your dependencies:
\`\`\`bash
npm update
npm audit fix
\`\`\`

## Troubleshooting

### Build Errors
- Check that all environment variables are set correctly
- Ensure Node.js version is 18 or higher
- Clear `.next` folder and rebuild

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies are correctly set
- Ensure database schema is properly created

### AI Features Not Working
- Verify OpenAI API key is valid
- Check API usage limits
- Review API error logs

### Performance Issues
- Enable caching in Vercel
- Optimize images
- Use Vercel Analytics to identify bottlenecks

## Security Best Practices

1. **Never commit sensitive data**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Enable Supabase RLS**
   - Already configured in schema
   - Review policies regularly

3. **Secure Admin Access**
   - Use strong passwords
   - Enable 2FA on Supabase
   - Limit admin accounts

4. **Monitor API Usage**
   - Set up OpenAI usage alerts
   - Implement rate limiting if needed

5. **Regular Backups**
   - Enable Supabase automatic backups
   - Export data regularly

## Support

If you encounter issues:
1. Check the [GitHub Issues](https://github.com/yasshh-xo/poetryworld/issues)
2. Review the documentation
3. Contact support

## Success! 🎉

Your PoetryWorld website is now live and ready to share beautiful poetry with the world!

Remember to:
- ✅ Set up your admin account
- ✅ Add initial poems
- ✅ Test all features
- ✅ Share your website URL

Happy poetry sharing! 📝✨
