# 🌟 PoetryWorld - Where Words Come Alive

A magical, AI-powered poetry platform with admin-only content management and advanced features for poetry lovers.

![PoetryWorld](https://img.shields.io/badge/Poetry-World-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

## ✨ Features

### 🎨 Beautiful UI/UX
- Stunning splash screen with floating words and animations
- Dreamy, artistic theme with smooth transitions
- Elegant typography perfect for poetry
- Responsive design for all devices
- Glass morphism and gradient effects

### 👑 Admin-Only Content Management
- **Only the admin can:**
  - Upload, edit, and delete poems
  - Manage categories, themes, and tags
  - Approve/moderate comments
  - Full control over all content

### 👥 User Features (Read-Only Spectators)
- Like and save poems
- Comment on poems
- Download poems
- Share poems on social media
- Follow categories
- Create favorite collections
- Receive notifications for new uploads

### 🤖 Advanced AI Features

#### 1. **Poem Generator**
- Generate poems based on topic, mood, style, and form
- Support for multiple poetic styles (romantic, classical, modern, etc.)
- Various forms (free verse, sonnet, haiku, rhyme-based)

#### 2. **Poem Comparator**
- Compare two poems side-by-side
- Analyze style, theme, and literary techniques
- Get similarity percentage scores
- Detailed comparative analysis

#### 3. **Theme Interpreter**
- Understand main themes and symbolism
- Get poet's perspective analysis
- Discover hidden meanings
- Simple explanations for students

#### 4. **Word Meaning Finder**
- Click any word to get instant definitions
- View synonyms and usage examples
- Etymology and word origins

#### 5. **Style Rewriter**
- Rewrite poems in different styles
- Transform between romantic, modern, classical, etc.
- Maintain core message while changing style

#### 6. **Artwork Generator**
- Generate AI artwork based on poem themes
- Visual representation of poetic imagery
- Download and share generated art

#### 7. **Mood Detector**
- Detect emotional tone of poems
- Percentage breakdown of emotions
- Detailed mood analysis

#### 8. **AI Reciter**
- Text-to-speech poem recitation
- Multiple emotional tones
- Natural voice synthesis

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yasshh-xo/poetryworld.git
cd poetryworld
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
ADMIN_EMAIL=your_admin_email
\`\`\`

4. **Set up Supabase database**

Run the SQL commands in `database/schema.sql` in your Supabase SQL editor.

5. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
poetryworld/
├── app/
│   ├── api/              # API routes
│   │   ├── ai/          # AI feature endpoints
│   │   └── dictionary/  # Word meaning API
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── ai/              # AI feature components
│   ├── SplashScreen.tsx
│   ├── HomePage.tsx
│   ├── Navbar.tsx
│   ├── PoemGrid.tsx
│   ├── PoemCard.tsx
│   ├── PoemModal.tsx
│   ├── AIFeatures.tsx
│   └── Footer.tsx
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── openai.ts        # OpenAI utilities
├── database/
│   └── schema.sql       # Database schema
└── public/              # Static assets
\`\`\`

## 🗄️ Database Schema

### Tables
- **poems** - Store all poems with metadata
- **users** - User accounts (admin and regular users)
- **comments** - User comments on poems
- **likes** - Track poem likes
- **saved_poems** - User's saved poem collections
- **categories** - Poem categories
- **notifications** - User notifications

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI GPT-4 & DALL-E 3
- **Deployment:** Vercel (recommended)

## 🔐 Admin Access

To set up admin access:
1. Create a user account
2. In Supabase, update the user's role to 'admin' in the users table
3. Admin features will automatically be available

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yasshh-xo/poetryworld)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💖 Support

If you like this project, please give it a ⭐️!

## 📧 Contact

For questions or support, please contact: [your-email@example.com]

---

**Made with ❤️ by the PoetryWorld Team**
