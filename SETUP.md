# Setup

## Environment
Create `.env.local` from `.env.example` and set:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`

## Install

```powershell
npm install
```

## Prisma

```powershell
npx prisma generate
npx prisma migrate dev
```

## Run

```powershell
npm run dev
```

Authentication is powered by Clerk (`/login`, `/signup`) and protected routes are enforced through Clerk middleware.
