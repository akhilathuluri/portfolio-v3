-- ==========================================
-- PORTFOLIO DATABASE SCHEMA FOR SUPABASE
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. BLOG POSTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);

-- ==========================================
-- 2. PROJECTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    tech TEXT, -- Comma-separated tech stack
    github_url TEXT,
    demo_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON projects(is_published);

-- ==========================================
-- 3. WORK EXPERIENCE TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS work_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    company_url TEXT NOT NULL,
    position TEXT NOT NULL,
    location TEXT NOT NULL,
    favicon_url TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_current BOOLEAN DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_work_experience_display_order ON work_experience(display_order);
CREATE INDEX IF NOT EXISTS idx_work_experience_is_current ON work_experience(is_current);

-- ==========================================
-- 4. AUTO-UPDATE TIMESTAMP FUNCTION
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for auto-updating updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_experience_updated_at
    BEFORE UPDATE ON work_experience
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ==========================================
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published blog posts"
    ON blog_posts FOR SELECT
    USING (is_published = true);

CREATE POLICY "Public can read published projects"
    ON projects FOR SELECT
    USING (is_published = true);

CREATE POLICY "Public can read work experience"
    ON work_experience FOR SELECT
    USING (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Authenticated users can do everything on blog_posts"
    ON blog_posts
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on projects"
    ON projects
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on work_experience"
    ON work_experience
    USING (auth.role() = 'authenticated');

-- ==========================================
-- 6. SEED DATA (Initial work experience)
-- ==========================================
INSERT INTO work_experience (company_name, company_url, position, location, favicon_url, display_order, is_current)
VALUES 
    ('leapx.ai', 'https://leapx.ai/', 'ai engineer intern', 'gurgaon, india', '/leapx-ai-favicon.svg', 1, false),
    ('composio.dev', 'https://composio.dev/', 'software engineering (python)', 'bangalore, india', '/composio-dev-favicon.svg', 2, false),
    ('successscholar.in', 'https://successscholar.in/', 'product owner/developer', 'kolkata, india', '/successscholar-favicon.svg', 3, false)
ON CONFLICT DO NOTHING;
