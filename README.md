# AI Data Science Academy

A full-stack modern learning management system (LMS) specifically tailored for Data Science education. This platform features course browsing, enrollment, interactive course players with video and written content, and an admin panel for course management.

## Tech Stack

- **Frontend:** React, Vite, Wouter (Routing), Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Drizzle ORM
- **Authentication:** Passport.js (Local Strategy)
- **Deployment:** Vercel (recommended) or any Node.js hosting

## Project Structure

- `client/`: React frontend application
  - `src/components/`: Reusable UI components (shadcn/ui + custom). Start editing here to modify the user interface!
  - `src/pages/`: Main application views (Home, Courses, Dashboard, etc.). Modify these files to change specific page content.
  - `src/hooks/`: React hooks (e.g., `use-auth`, `use-mobile`)
  - `src/lib/`: Utilities and query client setup
- `server/`: Node.js Express backend
  - `routes.ts`: API route definitions. Start here to edit or add new endpoints.
  - `auth.ts`: Passport authentication setup
  - `storage.ts`: Database access layer (interface and implementation)
  - `db.ts`: Drizzle ORM setup
- `shared/`: Shared code between client and server
  - `schema.ts`: Drizzle database schemas and Zod validation types. Add or modify database tables here.
- `api/`: Vercel Serverless Function entry point
  - `index.ts`: The Vercel function wrapper for the Express application.
- `script/`: Build scripts

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Setup database:
   Ensure you have a PostgreSQL database running and set the `DATABASE_URL` environment variable.
   ```bash
   npm run db:push
   ```
3. Run the development server:
   ```bash
   npm run dev &
   ```

## Deployment on Vercel

To deploy this full-stack application on Vercel:

1. Create a `vercel.json` file in the root directory:
   ```json
   {
     "version": 2,
     "buildCommand": "npm run build",
     "outputDirectory": "dist/public",
     "rewrites": [
       { "source": "/api/(.*)", "destination": "/api/index" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
   *Note: Our `vercel.json` maps frontend routing correctly for a Single Page Application and utilizes `/api/index.ts` to host the Express API as a Vercel Serverless Function.*

2. **Environment Variables on Vercel:**
   - `DATABASE_URL`: Your PostgreSQL connection string (e.g., from Neon, Supabase, or Render).
   - `SESSION_SECRET`: A secure random string for session encryption.

3. **Deploy:**
   Using the Vercel CLI:
   ```bash
   npx vercel
   ```
   Or connect your GitHub repository to Vercel for automatic deployments.

## Live Preview
To preview the site on Jules, start the application:
```bash
npm run dev &
```
And check the web preview tab.
