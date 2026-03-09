# AI Data Science Academy

## Overview
A full Learning Management System (LMS) for Data Science and AI education. Features include user authentication, course catalog, student dashboard, course player, admin panel, and a marketing landing page.

## Architecture
- **Frontend**: React + TypeScript + TailwindCSS + shadcn/ui
- **Backend**: Express.js with session-based auth (passport-local)
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter (client-side)
- **Animations**: framer-motion
- **Icons**: lucide-react + react-icons/si
- **State Management**: @tanstack/react-query

## Database Schema
- `users` - id (serial), name, email, password, role (student/admin/instructor), avatarInitials
- `courses` - id (serial), title, description, difficulty, specializationLevel, instructorName, duration, category, gradient, rating, published
- `modules` - id (serial), courseId, title, orderNumber
- `lessons` - id (serial), moduleId, title, videoUrl, content, duration, orderNumber
- `enrollments` - id (serial), userId, courseId, progress, status
- `lesson_progress` - id (serial), userId, lessonId, completed
- `certificates` - id (serial), userId, courseId, issuedAt

## Project Structure

### Backend
- `server/index.ts` - Express server entry point
- `server/routes.ts` - All API routes (courses, enrollments, admin, progress)
- `server/auth.ts` - Passport auth setup, register/login/logout endpoints
- `server/storage.ts` - DatabaseStorage class (all CRUD operations)
- `server/db.ts` - Drizzle + pg Pool connection
- `server/seed.ts` - Database seeding with sample courses and users
- `shared/schema.ts` - Drizzle table definitions + Zod schemas

### Frontend Pages
- `client/src/pages/home.tsx` - Landing page (Hero, Specializations, Courses, Study Scheme, Evaluation, Study Modes, Resources, Testimonials, CTA)
- `client/src/pages/auth.tsx` - Login/Register page
- `client/src/pages/courses.tsx` - Course catalog with search and filters
- `client/src/pages/course-detail.tsx` - Course detail with curriculum and enrollment
- `client/src/pages/course-player.tsx` - Course learning interface with sidebar curriculum
- `client/src/pages/dashboard.tsx` - Student dashboard with enrollments and progress
- `client/src/pages/admin.tsx` - Admin panel (course CRUD, user management, stats)

### Frontend Components
- `client/src/components/navbar.tsx` - Auth-aware navbar with theme toggle
- `client/src/components/footer.tsx` - Footer with dark bg-slate-950 theme
- `client/src/components/theme-provider.tsx` - Dark/light mode context
- `client/src/hooks/use-auth.tsx` - Auth context with login/register/logout

### UI Layout Rules
- Landing page, courses catalog, course detail: show Navbar + Footer
- Dashboard, admin panel, course player, auth page: hide Navbar + Footer (self-contained layouts)

## Design System
- **Fonts**: Inter (body), Poppins (headings via `font-display`)
- **Colors**: Deep blue/slate dark sections, indigo/purple primary, cyan accents
- **Dark Mode**: Class-based toggle with localStorage persistence
- **Cards**: hover-elevate class (NOT on overflow-hidden cards)
- **No hover:bg-*/hover:text-***: Use hover-elevate class instead

## Demo Accounts
- Admin: admin@aidsa.academy / admin123
- Student: student@test.com / student123

## Running
- `npm run dev` starts Express backend + Vite frontend dev server
- `npm run db:push` syncs Drizzle schema to PostgreSQL
