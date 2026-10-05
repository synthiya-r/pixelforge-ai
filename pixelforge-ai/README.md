# PixelForge AI

A professional light-theme AI image generation website starter with a 12-image daily generation limit.

## Included
- Responsive React + Vite frontend
- Node.js + Express backend
- AI image generation API integration via Pollinations
- 12 generations/day limit enforced by backend
- Prompt enhancement UI
- Style and aspect-ratio controls
- Download generated images
- Local creation history
- Privacy Policy
- Cookie Policy
- Terms & Conditions
- No cookie banner
- No Google Tag Manager
- No analytics

## Run locally

### Backend
```bash
cd backend
npm install
copy .env.example .env
npm start
```

On macOS/Linux, use `cp .env.example .env` instead of `copy`.

Add your provider key to `.env` if required:
`POLLINATIONS_API_KEY=your_key_here`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:8787` unless configured otherwise.

## Important
The 12-image limit is a demo/product rule. For production, use authenticated user accounts and persistent server-side storage (for example PostgreSQL/Redis) instead of the included local JSON usage store.
