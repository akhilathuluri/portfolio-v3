# 🚀 Quick Start Guide - Admin Panel

This guide will get your admin panel up and running in 10 minutes.

## Prerequisites

- Node.js installed
- A Supabase account (free tier is fine)
- Your email for admin access

---

## Step 1: Create Supabase Project (3 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Name**: `portfolio-db` (or any name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

---

## Step 2: Run Database Schema (2 minutes)

1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open the file `/supabase/schema.sql` from your project
4. Copy ALL the content
5. Paste it into the SQL Editor
6. Click **"Run"** (bottom right)
7. You should see "Success. No rows returned"

✅ Your database tables are now created!

---

## Step 3: Get API Keys (1 minute)

1. Click **"Project Settings"** (gear icon, bottom left)
2. Click **"API"** in the settings menu
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

---

## Step 4: Configure Environment (2 minutes)

1. In your project root, find `.env.local.example`
2. Copy it to create `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

3. Open `.env.local` and update:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ADMIN_EMAIL=your-email@example.com
   ```

4. Replace with your actual values from Step 3
5. Set `ADMIN_EMAIL` to YOUR email address

---

## Step 5: Enable Email Authentication (1 minute)

1. In Supabase dashboard, go to **"Authentication"** (left sidebar)
2. Click **"Providers"** tab
3. Find **"Email"** and make sure it's enabled (should be by default)
4. (Optional) Customize email templates in **"Email Templates"**

---

## Step 6: Start Your App (1 minute)

1. Install dependencies (if not already):
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. App should start at `http://localhost:3000`

---

## Step 7: Login to Admin Panel (2 minutes)

1. Visit `http://localhost:3000/admin/login`
2. Enter your admin email (from `.env.local`)
3. Click **"Send Magic Link"**
4. Check your email inbox
5. Click the magic link in the email
6. You're in! 🎉

---

## 🎯 What You Can Do Now

### Dashboard
- Overview of all your content
- Quick access to all sections

### Manage Writings
- Go to **Writings** tab
- Click **"+ New Post"** to create
- Fill in title, content (supports Markdown!)
- Click **"Create Post"**
- Your post appears on the site immediately!

### Manage Projects
- Go to **Projects** tab
- Add your portfolio projects
- Include tech stack, images, descriptions

### Manage Work Experience
- Go to **Work Experience** tab
- Add your previous jobs
- Reorder them as needed
- Set your current position

---

## 🔍 Troubleshooting

### "Database not configured" error
- Check `.env.local` has correct values
- Restart dev server: `Ctrl+C` then `npm run dev`
- Verify Supabase project is active

### Can't login
- Make sure `ADMIN_EMAIL` matches the email you're using
- Check spam folder for magic link
- Email must be configured in Supabase Auth settings

### Changes not showing
- Check if content is marked as "Published"
- Clear browser cache
- Check Supabase dashboard → Table Editor to verify data

### Magic link expired
- Links expire after 1 hour
- Request a new one from login page

---

## 📚 Learn More

- **Full Documentation**: [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md)
- **Implementation Details**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

---

## 🎨 Next Steps

1. **Add Content**: Create your first blog post!
2. **Customize Themes**: Try all 9 color schemes
3. **Add Projects**: Showcase your work
4. **Update Work History**: Keep it current

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] API keys copied
- [ ] `.env.local` configured
- [ ] Email auth enabled
- [ ] Dev server running
- [ ] Successfully logged in
- [ ] Created first blog post
- [ ] Created first project
- [ ] Updated work experience

---

## 🚀 Deploy to Production

When ready to deploy:

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Important:** Use the SAME Supabase project for production, or create a separate production database.

---

## 💬 Support

Stuck? Check:
1. Console for JavaScript errors (F12)
2. Supabase dashboard logs
3. Environment variables are correct
4. Database tables exist (Table Editor)

---

**Congrats! You now have a fully functional CMS for your portfolio! 🎉**
