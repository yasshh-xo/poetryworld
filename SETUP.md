# 🛠️ PoetryWorld - Complete Setup Guide

This guide will walk you through setting up PoetryWorld on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yasshh-xo/poetryworld.git
cd poetryworld
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials (see detailed setup below).

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## 🔧 Detailed Setup

### 1. Supabase Setup

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name:** PoetryWorld
   - **Database Password:** (create a strong password)
   - **Region:** Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for setup

#### Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Set Up Database

1. Click **SQL Editor** in the sidebar
2. Click **New Query**
3. Open `database/schema.sql` from the project
4. Copy all the SQL code
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. Wait for "Success" message

You should see these tables created:
- ✅ users
- ✅ poems
- ✅ categories
- ✅ comments
- ✅ likes
- ✅ saved_poems
- ✅ notifications

### 2. OpenAI API Setup

#### Get Your API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Click your profile → **View API Keys**
4. Click **Create new secret key**
5. Name it "PoetryWorld"
6. Copy the key (you won't see it again!)
7. Add to `.env.local` as `OPENAI_API_KEY`

#### Add Credits (If Needed)

1. Go to **Billing** → **Payment methods**
2. Add a payment method
3. Add credits (minimum $5 recommended)

**Note:** OpenAI charges per API call. Monitor usage in the dashboard.

### 3. Environment Variables

Your `.env.local` should look like this:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Admin (your email)
ADMIN_EMAIL=your-email@example.com
```

**Important:** Never commit `.env.local` to Git!

### 4. Verify Installation

Run these commands to verify everything is set up:

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - you should see the splash screen!

## 👤 Setting Up Your Admin Account

### Create Your First User

1. Run the development server
2. Wait for the splash screen to finish
3. Click the user icon in the navbar
4. Sign up with your email and password

### Make Yourself Admin

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Table Editor** → **users**
4. Find your user record
5. Click on the **role** field
6. Change from `user` to `admin`
7. Click the checkmark to save

### Verify Admin Access

1. Refresh your PoetryWorld website
2. You should now see admin features:
   - Upload poem button
   - Edit/delete options on poems
   - Admin dashboard access

## 🧪 Testing the Application

### Test Basic Features

1. **Navigation**
   - Click through all menu items
   - Test mobile navigation

2. **Poems**
   - View poem grid
   - Click on a poem to open modal
   - Test like, save, share buttons

3. **Search**
   - Click search icon
   - Search for poems

### Test AI Features

1. **Poem Generator**
   - Go to AI Features
   - Click Poem Generator
   - Fill in the form
   - Generate a poem

2. **Other AI Features**
   - Test Poem Comparator
   - Test Theme Interpreter
   - Test Mood Detector
   - Test Artwork Generator

### Test Admin Features

1. **Upload Poem**
   - Click "Upload Poem" (admin only)
   - Fill in poem details
   - Submit

2. **Edit Poem**
   - Click edit on any poem
   - Make changes
   - Save

3. **Delete Poem**
   - Click delete on a poem
   - Confirm deletion

## 🐛 Troubleshooting

### Common Issues

#### "Module not found" errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### Port 3000 already in use

```bash
# Use a different port
npm run dev -- -p 3001
```

#### Supabase connection errors

- Check your `.env.local` file
- Verify Supabase URL and key are correct
- Ensure no extra spaces in environment variables

#### OpenAI API errors

- Verify API key is correct
- Check you have credits in OpenAI account
- Review API usage limits

#### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Getting Help

If you're stuck:

1. Check the error message carefully
2. Search [GitHub Issues](https://github.com/yasshh-xo/poetryworld/issues)
3. Review the documentation
4. Check browser console for errors
5. Verify all environment variables are set

## 📁 Project Structure

```
poetryworld/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── ai/           # AI feature endpoints
│   │   └── dictionary/   # Word meaning API
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ai/               # AI feature components
│   ├── SplashScreen.tsx  # Splash screen
│   ├── HomePage.tsx      # Main home page
│   ├── Navbar.tsx        # Navigation
│   ├── PoemGrid.tsx      # Poem grid display
│   ├── PoemCard.tsx      # Individual poem card
│   ├── PoemModal.tsx     # Poem detail modal
│   ├── AIFeatures.tsx    # AI features hub
│   └── Footer.tsx        # Footer
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Supabase client
│   └── openai.ts         # OpenAI utilities
├── database/              # Database files
│   └── schema.sql        # Database schema
├── public/                # Static assets
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
├── next.config.js        # Next.js config
├── README.md             # Main documentation
├── DEPLOYMENT.md         # Deployment guide
├── FEATURES.md           # Feature list
└── SETUP.md              # This file
```

## 🎯 Next Steps

After setup is complete:

1. ✅ Add your first poems as admin
2. ✅ Test all AI features
3. ✅ Customize the design (optional)
4. ✅ Add more categories
5. ✅ Invite users to test
6. ✅ Deploy to production (see DEPLOYMENT.md)

## 🔒 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Enable Supabase RLS (already configured)
- [ ] Set up API rate limiting
- [ ] Enable 2FA on Supabase account
- [ ] Monitor OpenAI API usage
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure CORS properly
- [ ] Review all environment variables

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🎉 You're All Set!

Your PoetryWorld development environment is ready! Start building and enjoy creating a magical poetry experience.

**Happy coding!** 📝✨

---

Need help? Check out:
- [README.md](README.md) - Project overview
- [FEATURES.md](FEATURES.md) - Complete feature list
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment guide
