# 🎨 Theme System Guide

## Overview
Your portfolio now features a comprehensive theme system with **9 unique color schemes** that can be switched instantly using the floating theme switcher.

## Available Themes

### 1. **Light Mode** ☀️ (Default)
- Clean white background with dark text
- Perfect for daytime reading
- Professional and minimal aesthetic

### 2. **Dark Mode** 🌙
- Pure black background with white text
- Easy on the eyes in low light
- Classic dark mode experience

### 3. **Cyberpunk** 🌆
- Purple/pink neon aesthetics
- Futuristic tech vibe
- Colors: Deep purple background with neon pink/magenta accents

### 4. **Matrix** 💻
- Green terminal inspired
- Classic hacker aesthetic
- Bright green text on pure black

### 5. **Synthwave** 🌃
- Retro 80s vibes
- Pink and yellow neon colors
- Perfect for nostalgic developers

### 6. **Nord** ❄️
- Cool blue/gray palette
- Calm and professional
- Inspired by the popular Nord theme

### 7. **Dracula** 🧛
- Purple-based dark theme
- Vibrant and colorful
- Popular among developers

### 8. **Ocean** 🌊
- Deep blue tones
- Calming underwater feel
- Modern developer theme

### 9. **Monokai** 🎨
- Classic code editor theme
- Green/blue/pink accents
- Familiar to many developers

## Font Changes

### Space Grotesk
- **Previous:** Playfair Display (serif) + Manrope (sans-serif)
- **Current:** Space Grotesk for everything
- **Weights:** 300, 400, 500, 600, 700
- **Style:** Modern, geometric, tech-friendly

## How It Works

### Theme Persistence
- Themes are saved to `localStorage`
- Your selected theme persists across page reloads
- Default theme is Light Mode

### Theme Switcher Component
- **Location:** Fixed bottom-right corner
- **File:** `app/components/theme-switcher.tsx`
- **Type:** Client component (uses React hooks)

### CSS Variables System
All themes use CSS custom properties defined in `global.css`:

```css
--bg-primary       /* Main background */
--bg-secondary     /* Secondary background */
--bg-tertiary      /* Tertiary background */
--text-primary     /* Main text color */
--text-secondary   /* Secondary text */
--text-tertiary    /* Muted text */
--accent-primary   /* Primary accent color */
--accent-secondary /* Secondary accent */
--border-color     /* Border color */
--border-hover     /* Hover state borders */
--code-bg          /* Code block background */
--code-border      /* Code block border */
--selection-bg     /* Text selection background */
--selection-text   /* Text selection color */
```

## Customization

### Adding a New Theme

1. **Edit `global.css`:**
```css
[data-theme="yourtheme"] {
  --bg-primary: #yourcolor;
  --text-primary: #yourcolor;
  /* ... add all variables */
}
```

2. **Edit `theme-switcher.tsx`:**
```typescript
const themes = [
  // ... existing themes
  { id: 'yourtheme', name: 'Your Theme', icon: '🎨' }
]
```

### Modifying Existing Themes
Simply update the CSS variables in the corresponding `[data-theme="..."]` block in `global.css`.

## Component Updates

All components now use theme-aware colors:
- ✅ Header
- ✅ Current section
- ✅ Previous section
- ✅ Blog posts
- ✅ Projects
- ✅ Contact
- ✅ Footer
- ✅ MDX content (code blocks, prose)
- ✅ Navigation links
- ✅ Boxed text (tags)

## Technical Details

### Implementation
- **Method:** CSS Custom Properties (CSS Variables)
- **Switching:** Data attribute on `<html>` element (`data-theme="..."`)
- **Transitions:** 0.3s ease for smooth color changes
- **Client-side:** Theme switcher requires JavaScript
- **SSR Compatible:** Default theme renders on server

### Browser Support
- All modern browsers support CSS variables
- Fallback to light mode for older browsers

### Performance
- No CSS-in-JS overhead
- Pure CSS theme switching
- Minimal JavaScript (only for theme switcher component)
- Instant theme changes via CSS variables

## Files Modified

1. **app/layout.tsx** - Added Space Grotesk font, integrated theme switcher
2. **app/global.css** - Complete theme system with 9 color schemes
3. **app/components/theme-switcher.tsx** - NEW: Theme switcher component
4. **app/components/footer.tsx** - Theme-aware colors
5. **app/components/boxed-text.tsx** - Theme-aware borders
6. **app/components/current.tsx** - Theme-aware colors
7. **app/components/previous.tsx** - Theme-aware links
8. **app/components/contact.tsx** - Theme-aware links
9. **app/components/posts.tsx** - Theme-aware text colors
10. **app/components/projects.tsx** - Theme-aware colors
11. **app/blog/[slug]/page.tsx** - Theme-aware dates
12. **app/projects/[slug]/page.tsx** - Theme-aware borders

## Tips for Development

### Using Theme Variables in New Components

**Inline styles:**
```tsx
<div style={{ 
  backgroundColor: 'var(--bg-secondary)',
  color: 'var(--text-primary)' 
}}>
```

**CSS classes:**
```css
.my-component {
  background-color: var(--bg-primary);
  border-color: var(--border-color);
}
```

### Testing Themes
1. Run `npm run dev`
2. Click the theme switcher in bottom-right
3. Test all 9 themes to ensure consistency

## Future Enhancements

Possible additions:
- [ ] System theme detection (prefer light/dark)
- [ ] Custom theme creator
- [ ] Theme export/import
- [ ] Keyboard shortcuts for theme switching
- [ ] Theme preview thumbnails
- [ ] Animated theme transitions

---

**Enjoy your new theme system! 🎉**
