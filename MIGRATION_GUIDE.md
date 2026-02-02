# 📦 Migrating from MDX Files to Supabase Database

This guide helps you migrate your existing MDX content to the Supabase database.

## Overview

Your portfolio currently works with both:
- **MDX files** (existing, in `app/blog/posts/` and `app/projects/content/`)
- **Supabase database** (new, managed via admin panel)

The system tries Supabase first, then falls back to MDX if database is not configured or empty.

---

## Why Migrate?

✅ **Dynamic Content Management**: Edit from anywhere via admin panel  
✅ **No Rebuilds Required**: Changes appear instantly  
✅ **Better Workflow**: Non-technical editors can manage content  
✅ **Versioning**: Built-in with Supabase  
✅ **Backup**: Database backups are automatic  

---

## Migration Options

### Option 1: Keep Both (Recommended Initially)

Keep your MDX files as backup while you test the database:

1. Set up Supabase (follow [QUICK_START.md](./QUICK_START.md))
2. Manually recreate your content in admin panel
3. Test thoroughly
4. Once confident, optionally remove MDX files

**Benefits:**
- Safe, gradual transition
- Easy rollback if needed
- MDX files serve as backup

---

### Option 2: Automated Migration Script

Create a Node.js script to automatically migrate all MDX files:

```javascript
// scripts/migrate-to-supabase.js
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for admin access
);

// Helper to parse frontmatter
function parseFrontmatter(fileContent) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  
  const metadata = {};
  frontMatterBlock.split('\n').forEach(line => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1');
    metadata[key.trim()] = value;
  });
  
  return { metadata, content };
}

// Migrate blog posts
async function migrateBlogPosts() {
  const postsDir = path.join(__dirname, '../app/blog/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
  
  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { metadata, content } = parseFrontmatter(fileContent);
    
    const slug = path.basename(file, '.mdx');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        slug,
        title: metadata.title,
        summary: metadata.summary,
        content,
        image: metadata.image || null,
        published_at: new Date(metadata.publishedAt).toISOString(),
        is_published: true,
      });
    
    if (error) {
      console.error(`Error migrating ${file}:`, error);
    } else {
      console.log(`✅ Migrated: ${file}`);
    }
  }
}

// Migrate projects
async function migrateProjects() {
  const projectsDir = path.join(__dirname, '../app/projects/content');
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.mdx'));
  
  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { metadata, content } = parseFrontmatter(fileContent);
    
    const slug = path.basename(file, '.mdx');
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        slug,
        title: metadata.title,
        summary: metadata.summary,
        content,
        image: metadata.image || null,
        tech: metadata.tech || null,
        published_at: new Date(metadata.publishedAt).toISOString(),
        is_published: true,
      });
    
    if (error) {
      console.error(`Error migrating ${file}:`, error);
    } else {
      console.log(`✅ Migrated: ${file}`);
    }
  }
}

// Run migration
async function main() {
  console.log('🚀 Starting migration...\n');
  
  console.log('📝 Migrating blog posts...');
  await migrateBlogPosts();
  
  console.log('\n🚀 Migrating projects...');
  await migrateProjects();
  
  console.log('\n✅ Migration complete!');
}

main().catch(console.error);
```

#### To use this script:

1. Save it as `scripts/migrate-to-supabase.js`
2. Install Supabase CLI or get a service key from dashboard
3. Run: `node scripts/migrate-to-supabase.js`

---

### Option 3: Manual Migration (Recommended for Learning)

Manually recreate each post/project through the admin panel:

**Advantages:**
- Review and update content as you go
- Learn the admin interface
- Clean up old/unwanted content
- Opportunity to improve SEO

**Steps:**
1. Login to admin panel (`/admin/login`)
2. Go to Writings → + New Post
3. Copy title, summary, content from MDX file
4. Save
5. Repeat for all posts and projects

---

## After Migration

### 1. Verify Content
- Check all posts appear correctly on site
- Test links, images, formatting
- Verify dates and metadata

### 2. Update Workflow
- Stop editing MDX files
- Use admin panel for all changes
- Train team members on new system

### 3. Backup Strategy
- Export database regularly (Supabase dashboard → Database → Backups)
- Keep MDX files in git for historical reference
- Document content structure

### 4. Optional: Remove MDX Files
Only after fully confident:

```bash
# Archive MDX files
mkdir archive
mv app/blog/posts/*.mdx archive/
mv app/projects/content/*.mdx archive/
```

Keep the fallback code in place - it's harmless and provides safety.

---

## Rollback Plan

If you need to go back to MDX:

1. Restore MDX files from git
2. Stop Supabase (or leave it running)
3. System automatically falls back to MDX
4. No code changes needed!

---

## Best Practices

### Content Management
- ✅ Always use "Save as Draft" for work-in-progress
- ✅ Preview content before publishing
- ✅ Use consistent slug naming (lowercase, hyphens)
- ✅ Add images for better social sharing

### Database Maintenance
- ✅ Regular backups (Supabase does this automatically)
- ✅ Monitor RLS policies
- ✅ Review and clean up unpublished drafts
- ✅ Keep production/staging databases separate

### SEO
- ✅ Don't change slugs after publishing (breaks links)
- ✅ Update publish dates when significantly updating content
- ✅ Use descriptive summaries (shown in search results)
- ✅ Add alt text to images

---

## Troubleshooting

### "Both database and MDX have same slug"
The database takes priority. Either:
- Delete the MDX file, or
- Change the slug in one of them

### "Content shows old MDX version"
- Check database actually has the content
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

### "Can't edit old posts"
- They might still be MDX files
- Migrate them to database first
- Or edit the MDX file directly

---

## Summary

1. ✅ Set up Supabase (10 minutes)
2. ✅ Test with new content first
3. ✅ Migrate existing content (choose method above)
4. ✅ Verify everything works
5. ✅ Update team workflow
6. ✅ (Optional) Archive MDX files

**You now have a modern, database-driven CMS! 🎉**

---

For more help:
- [QUICK_START.md](./QUICK_START.md) - Getting started
- [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md) - Complete documentation
- [Supabase Docs](https://supabase.com/docs) - Database help
