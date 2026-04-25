# Quantum Blaze — Project Instructions

Premium agency landing page for Quantum Blaze software development company.

## Stack
- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- Framer Motion v12
- GSAP v3.13+ (ScrollTrigger, SplitText — all free)
- @react-three/fiber v9 + @react-three/drei v10 + Three.js v0.184
- Lenis (smooth scroll — synced with GSAP)
- anime.js
- AOS

## Architecture
- `src/components/sections/` — All page sections
- `src/components/three/` — Three.js / R3F components (HeroScene, FloatingOrbs, ParticleField)
- `src/components/layout/` — Navbar, Footer
- `src/components/ui/` — Reusable primitives (GlassCard, GlowButton, Marquee, SectionLabel)
- `src/hooks/` — useLenis, useMousePosition
- `src/lib/data.ts` — All static content (swap with real data here)

## Brand
- BG: #020c1b (deep dark blue)
- Accent: #38bdf8 (sky blue)
- Font: Space Grotesk (primary), Inter (secondary)
- Style: Glassmorphism + dark mode + luxury

## Dev
```bash
npm run dev
```

## Content Updates
Edit `src/lib/data.ts` to update:
- Team members (name, role, bio)
- Projects (title, description, tech, metrics)
- Services (title, description, features)
- Tech stack logos

## Adding Real Photos
Replace initials avatars in Team.tsx with real `<Image>` tags using Next.js Image component.
