# Deployment Guide: Vroom Vehicle Rental Platform

This guide covers the step-by-step process of deploying your backend to **Railway** and your frontend to **Vercel**.

## Phase 1: Backend Deployment (Railway)

Railway is excellent for Node.js/PostgreSQL applications.

### 1. Prepare your Repository
Ensure your `package.json` has the following scripts:
```json
"scripts": {
  "start": "node dist/server.js",
  "build": "tsc && prisma generate",
  "postinstall": "prisma generate"
}
```

### 2. Deployment Steps
1.  **Connect GitHub**: Go to [Railway](https://railway.app/), create a new project, and connect your backend repository.
2.  **Add PostgreSQL**: If you haven't already, add a "Database" service and select PostgreSQL. Railway will automatically provide a `DATABASE_URL`.
3.  **Configure Environment Variables**:
    In the Railway dashboard, go to **Variables** and add:
    - `PORT`: `5000` (Railway will assign one automatically).
    - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}` (If using Railway Postgres).
    - `JWT_SECRET`: A long random string.
    - `NODE_ENV`: `production`
4.  **Deployment**: Railway will automatically build and deploy your app. Copy the provided public URL (e.g., `https://your-api.up.railway.app`).

---

## Phase 2: Frontend Deployment (Vercel)

Vercel is the native home for Next.js apps.

### 1. Deployment Steps
1.  **Connect GitHub**: Go to [Vercel](https://vercel.com/), click "Add New" -> "Project", and select your frontend repository.
2.  **Configure Environment Variables**:
    During the import process, expand the **Environment Variables** section and add:
    - `NEXT_PUBLIC_API_URL`: `https://your-api.up.railway.app/api/v1` (The Railway URL you copied).
3.  **Build Settings**: Vercel usually detects Next.js automatically. Ensure:
    - **Framework Preset**: `Next.js`
    - **Build Command**: `npm run build`
4.  **Deploy**: Click **Deploy**. Vercel will build your app and give you a production URL.

---

## Phase 3: Post-Deployment Sync

### 1. Update CORS (Security)
Once your frontend is deployed (e.g., `https://vroom-rental.vercel.app`), you should restrict your backend's CORS for security.

Update `src/app.ts` in the backend:
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```
Add `FRONTEND_URL` to your Railway variables.

### 2. Database Migration
Run your initial migration on the production database:
```bash
npx prisma migrate deploy
```

---

## Summary of Environment Variables

| Variable | Location | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | Railway | Connection string for Postgres |
| `JWT_SECRET` | Railway | Key for signing auth tokens |
| `NEXT_PUBLIC_API_URL` | Vercel | The public endpoint of your Railway API |

> [!TIP]
> Always ensure `NEXT_PUBLIC_` prefix is used for frontend variables that need to be accessible in the browser.
