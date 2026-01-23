# 🚀 Quick Start Guide: Next Steps

## You Are Here: Phase 0 ✅ Complete

All configuration, dependencies, and quality tools are set up. The project builds successfully!

---

## 🎯 What You Need To Continue

Before we can build the AI features, you need to set up your services:

### 1. Create Supabase Project (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Name**: `mvp-06-ai-lead-crm`
   - **Database Password**: (save this somewhere safe)
   - **Region**: (choose closest to you)
4. Wait for project to be created (~2 minutes)
5. Go to **Settings → API**
6. Copy:
   - `Project URL` (starts with https://...supabase.co)
   - `anon public` key (long string starting with eyJ...)

### 2. Get OpenAI API Key (2 minutes)

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up/login
3. Click **"Create new secret key"**
4. Name it: `mvp-06-crm`
5. Copy the key (starts with `sk-...`)
6. **Important**: Add billing info if you haven't (needs $5+ credit)

### 3. Get Resend API Key (2 minutes)

1. Go to [resend.com](https://resend.com) and sign up/login
2. Go to **API Keys**
3. Click **"Create API Key"**
4. Name it: `mvp-06-crm`
5. Copy the key (starts with `re_...`)

---

## 📝 Configure Environment Variables

Create `.env.local` in the project root:

```bash
# In terminal:
cd /home/martin/ZerionStudio/DemoApps/mvp-06-ai-lead-crm
cp .env.example .env.local
```

Then edit `.env.local` with your keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...

# OpenAI (for AI lead scoring)
OPENAI_API_KEY=sk-...your-openai-key...

# Resend (for email campaigns)
RESEND_API_KEY=re_...your-resend-key...
```

---

## 🗄️ Apply Database Schema

Once you have Supabase configured:

```bash
# Link your local project to Supabase
npx supabase link --project-ref YOUR_PROJECT_REF

# Apply the database schema
npx supabase db push
```

> **Tip**: Find your project ref in Supabase dashboard under Settings → General

---

## ✅ Verify Setup

Test that everything works:

```bash
# Start dev server
npm run dev

# In another terminal, run type check
npm run type-check

# Should see no errors!
```

Visit [http://localhost:3000](http://localhost:3000) - you should see the app running!

---

## 🎨 What's Next: Phase 1

Once you have your API keys configured, we'll build:

1. **Authentication** - Login/signup with Supabase Auth
2. **Lead Management** - CRUD operations for leads
3. **AI Lead Scoring** - OpenAI integration to score leads 0-100
4. **Pipeline Kanban** - Drag-and-drop sales pipeline
5. **Email Campaigns** - Resend integration with AI suggestions

---

## 💡 Commands Reference

| Command              | What It Does             |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Build for production     |
| `npm run lint`       | Check code quality       |
| `npm run type-check` | Check TypeScript         |
| `npm run test`       | Run unit tests           |
| `npm run test:e2e`   | Run E2E tests            |

---

## 🆘 Common Issues

**"Module not found: Can't resolve '@/...'**

- Run: `npm install` again

**"NEXT_PUBLIC_SUPABASE_URL is not defined"**

- Create `.env.local` file with your Supabase credentials

**TypeScript errors about Database types**

- We'll generate proper types from Supabase schema in Phase 1

---

**Status**: Ready for Phase 1! 🚀  
**Questions?**: Let me know which API keys you need help with!
