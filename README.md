# Steam Analytics Platform

Full-stack analytics platform using Steam API.

## Tech Stack

- Frontend: Next.js, Tailwind CSS, shadcn/ui
- Backend: FastAPI
- Database: PostgreSQL
- Deploy: Vercel (frontend), Railway/Render (backend)

## Structure

steam-analytics-platform/
├── backend/
├── frontend/
├── scripts/
├── docker/
├── .gitignore
└── README.md

## Local Setup

### Backend

cd backend
python -m venv venv

# Windows: venv\Scripts\activate

# Linux / Mac: source venv/bin/activate

pip install fastapi uvicorn
uvicorn main:app --reload

### Frontend

cd frontend
npm install
npm run dev
