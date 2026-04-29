# Public Job Profile Directory required for Governmental bodies.

A clean, modern public-facing web application for browsing municipal job classifications. Built with React + Node.js/Express + SQLite, designed for future Workday HCM API integration. Right now, it connects to a Supabase Database.

## Quick Start

### Prerequisites
- Node.js 18+

### 1. Start the Backend API

```bash
cd backend
npm install
npm run seed    # Seeds 22 sample job profiles
npm run dev     # Starts API on http://localhost:3001
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev     # Starts React app on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## Project Structure

```
├── backend/
│   ├── server.js              # Express server entry point
│   ├── db/
│   │   ├── database.js        # SQLite schema (Workday-aligned)
│   │   └── seed.js            # Sample data seeder
│   └── routes/
│       └── jobProfiles.js     # REST API endpoints
├── frontend/
│   └── src/
│       ├── api.js             # API service layer
│       ├── pages/             # Home, Search, JobDetail, Directory
│       └── components/        # Navbar, Footer, JobCard
└── README.md
```

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/job-profiles` | List all profiles (supports `keyword`, `category`, `managementLevel`, `payGrade`, `status` query params) |
| GET | `/api/job-profiles/stats` | Aggregate stats (counts, filter options) |
| GET | `/api/job-profiles/:id` | Single profile by jobProfileId |
| GET | `/api/health` | Health check |

## Workday API Integration (Phase 2)

The codebase is prepared for Workday HCM integration. Look for `// TODO` comments throughout:

1. **`backend/routes/jobProfiles.js`** — Swap DB queries with Workday API calls
2. **`frontend/src/api.js`** — Update base URL / add auth headers
3. **`backend/db/database.js`** — Can become a cache layer

The API response shape already mirrors Workday's job profile object fields (`jobProfileId`, `jobTitle`, `jobFamily`, `jobCategory`, `managementLevel`, etc.).
