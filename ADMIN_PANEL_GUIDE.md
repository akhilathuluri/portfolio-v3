# Admin Panel Documentation

## 🚀 Setup Instructions

### 1. Supabase Setup

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be ready (2-3 minutes)

#### Run the Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `/supabase/schema.sql`
3. Paste and click **Run**
4. This will create all tables, indexes, and seed data

#### Get Your API Keys
1. Go to **Project Settings** → **API**
2. Copy the **Project URL** and **anon/public** key

### 2. Environment Variables

Create or update `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_EMAIL=your-email@example.com
```

Replace the values with your actual Supabase credentials.

### 3. Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional but recommended)

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000/admin/login`

---

## 📋 Using the Admin Panel

### Logging In

1. Navigate to `/admin/login`
2. Enter your admin email (must match `ADMIN_EMAIL` in .env.local)
3. Check your email for the magic link
4. Click the link to log in

### Managing Writings (Blog Posts)

**Create New Post:**
1. Go to **Writings** → **+ New Post**
2. Fill in all required fields:
   - **Title**: Post title
   - **Slug**: URL-friendly identifier (auto-generated from title)
   - **Summary**: Short description
   - **Content**: Full content in Markdown format
   - **Image** (optional): Path to image (`/images/post.jpg`)
   - **Published Date**: When the post was/will be published
   - **Published**: Toggle to publish immediately or save as draft

**Edit Post:**
1. Click **Edit** on any post
2. Make changes
3. Click **Save Changes**

**Delete Post:**
1. Click **Delete** on any post
2. Confirm deletion

**Publish/Unpublish:**
- Click **Publish** or **Unpublish** to toggle visibility

### Managing Projects

Same workflow as Writings, with additional fields:
- **Tech**: Comma-separated list of technologies (e.g., "Next.js, Python, Supabase")

### Managing Work Experience

**Add New Experience:**
1. Go to **Work Experience** → **+ New Entry**
2. Fill in:
   - **Company Name**: e.g., "leapx.ai"
   - **Company URL**: Full URL
   - **Position**: Job title
   - **Location**: City, Country
   - **Favicon URL**: Path to company logo
   - **Display Order**: Order in list (1 = first)
   - **Is Current**: Check if this is your current job

**Reorder Entries:**
- Change the **Display Order** number
- Lower numbers appear first

---

## 🔧 Architecture Overview

### Directory Structure

```
lib/
├── auth/                 # Authentication logic
│   ├── auth.service.ts   # Auth methods
│   ├── AuthContext.tsx   # React context for auth state
│   └── index.ts          # Barrel export
├── services/             # Database service layer
│   ├── blogPosts.service.ts
│   ├── projects.service.ts
│   ├── workExperience.service.ts
│   └── index.ts
├── supabase/             # Supabase configuration
│   ├── client.ts         # Supabase client instances
│   └── config.ts         # Constants and configuration
└── types/
    └── database.ts       # TypeScript types

app/
├── admin/                # Admin panel
│   ├── layout.tsx        # Admin layout with auth check
│   ├── page.tsx          # Dashboard
│   ├── login/
│   │   └── page.tsx      # Login page
│   ├── writings/
│   │   ├── page.tsx      # List all posts
│   │   ├── new/page.tsx  # Create new post
│   │   └── [id]/page.tsx # Edit post
│   ├── projects/
│   │   └── ...           # Similar structure
│   └── work-experience/
│       └── ...           # Similar structure
├── blog/
│   ├── data.ts          # Unified data fetching (DB + MDX fallback)
│   └── utils.ts         # Original MDX utilities
└── projects/
    ├── data.ts          # Unified data fetching
    └── utils.ts         # Original MDX utilities
```

### Data Flow

1. **Frontend Request** → Component calls data function
2. **Data Layer** (`data.ts`) → Tries Supabase first, falls back to MDX
3. **Service Layer** → Handles database queries
4. **Supabase Client** → Makes API calls to Supabase

### Fallback System

The site will work with or without database:
- **With Supabase**: Content from database
- **Without Supabase**: Falls back to MDX files
- No breaking changes to existing functionality

---

## 🔐 Security

### Row Level Security (RLS)

Tables are protected with RLS policies:
- **Public**: Can READ published content only
- **Authenticated**: Can do everything (CRUD)

### Authentication

- Magic link authentication (passwordless)
- Admin email verification
- Session management with auto-refresh

---

## 🎨 Customization

### Adding New Fields

To add a field to blog posts:

1. Update database schema:
```sql
ALTER TABLE blog_posts ADD COLUMN author TEXT;
```

2. Update TypeScript type in `lib/types/database.ts`:
```typescript
export interface BlogPost {
  // ... existing fields
  author?: string
}
```

3. Update service methods in `lib/services/blogPosts.service.ts`
4. Update admin forms in `app/admin/writings/`

### Styling

The admin panel uses the same theme system as your portfolio:
- All styles use CSS variables
- Switches themes automatically
- Fully responsive

---

## 📝 Markdown Support

Content fields support full Markdown:

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- Bullet list
1. Numbered list

[Link](https://example.com)

![Image](https://example.com/image.jpg)

` ``code`` `

` ``javascript
const code = 'block'
` ``
```

---

## 🚨 Troubleshooting

### "Database not configured" message

- Check `.env.local` has correct Supabase credentials
- Restart development server after adding env variables
- Verify Supabase project is active

### Can't log in

- Verify `ADMIN_EMAIL` matches the email you're using
- Check spam folder for magic link
- Ensure email authentication is enabled in Supabase

### Changes not appearing on site

- Check if content is marked as **Published**
- Clear browser cache
- Rebuild the site (`npm run build`)

### Migration from MDX

Your existing MDX files will continue to work as fallback. To migrate:

1. Create a script to read MDX files
2. Parse frontmatter and content
3. Insert into Supabase using the service layer
4. Keep MDX files as backup

---

## 🔄 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
ADMIN_EMAIL=your-email@example.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

---

## 🎯 Next Steps

Optional enhancements:

1. **File Uploads**: Add Supabase Storage for images
2. **Rich Text Editor**: Replace textarea with WYSIWYG
3. **Analytics Dashboard**: Show page views per post
4. **Scheduled Publishing**: Auto-publish at specific times
5. **Categories & Tags**: Organize content better
6. **Search**: Full-text search in admin panel
7. **Multiple Authors**: Add author management
8. **Revision History**: Track changes over time

---

## 📞 Support

If you encounter issues:

1. Check console for errors
2. Verify environment variables
3. Check Supabase dashboard for logs
4. Ensure RLS policies are correctly set up

---

Built with ❤️ using Next.js, Supabase, and TypeScript
