# AI Data Science Academy

## Overview
A modern, responsive educational platform website for selling and delivering Data Science and AI courses. Built with React, TailwindCSS, and Express.

## Architecture
- **Frontend**: React + TypeScript + TailwindCSS + shadcn/ui components
- **Backend**: Express.js (minimal, serving static content)
- **Routing**: wouter (client-side)
- **Animations**: framer-motion
- **Icons**: lucide-react + react-icons/si

## Project Structure
- `client/src/pages/home.tsx` - Main landing page with all sections (Hero, Specializations, Courses, Study Scheme, Evaluation, Study Modes, Resources, Testimonials, CTA)
- `client/src/components/navbar.tsx` - Sticky navigation bar with dark mode toggle and mobile menu
- `client/src/components/footer.tsx` - Footer with links and social icons
- `client/src/components/theme-provider.tsx` - Dark/light mode context provider
- `client/src/App.tsx` - App root with routing

## Design System
- **Fonts**: Inter (body), Poppins (headings via `font-display` class)
- **Colors**: Deep blue/slate dark sections, indigo/purple primary, cyan accents
- **Dark Mode**: Full dark mode support via class-based toggle
- **Theme**: Professional tech university aesthetic with glassmorphism, gradient highlights

## Key Features
- 5-Level Specialization Path (Bronze to Diamond)
- Course catalog with instructor info, ratings, and enrollment
- Study scheme timeline
- Evaluation criteria visualization
- Multiple study modes
- Learning resources showcase
- Student testimonials
- Responsive design with mobile-first approach
- Smooth scroll navigation
- Animated section reveals (framer-motion)

## Running
- `npm run dev` starts Express backend + Vite frontend dev server
