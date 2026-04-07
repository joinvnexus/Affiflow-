# AffiFlow

AffiFlow is a role-based affiliate marketing dashboard built with Next.js, Clerk, Prisma, and PostgreSQL. Merchants can publish products and confirm affiliate sales, while affiliates can browse the marketplace, generate referral links, and track commissions.

## Stack

- Next.js 15 App Router
- React 19
- Clerk authentication
- Prisma ORM
- PostgreSQL
- Tailwind CSS 4

## Core Flows

### Merchant

- Sign up and complete onboarding as `MERCHANT`
- Add products with price, commission rate, and destination URL
- Review merchant-only product data from `/api/merchant/products`
- Confirm affiliate sales and mark commissions as paid

### Affiliate

- Sign up and complete onboarding as `AFFILIATE`
- Browse active offers in `/dashboard/marketplace`
- Generate unique short referral links
- Track clicks, conversions, and confirmed earnings

### Shared

- Clerk webhooks sync users into PostgreSQL
- `/go/[slug]` tracks clicks and redirects to the original product URL
- Dashboard routes redirect users based on their selected role

## Project Structure

```text
app/
  api/
    merchant/products/      Merchant product API
    webhooks/clerk/         Clerk webhook endpoint
  dashboard/                Role-based dashboards
  go/[slug]/                Referral redirect + click tracking
actions/                    Server actions for links, products, sales, users
components/dashboard/       Dashboard UI
lib/                        Prisma, current user helpers, product helpers
prisma/                     Prisma schema and migrations
```

## Environment Variables

Create `.env.local` and configure:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
DATABASE_URL=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

Use [`.env.example`](e:\affiflow\.env.example) as the starting template.

## Local Development

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run start` runs the production server
- `npm run lint` runs ESLint

## Setup Guides

- General local setup: [SETUP.md](e:\affiflow\SETUP.md)
- Clerk auth setup: [AUTH_SETUP.md](e:\affiflow\AUTH_SETUP.md)
- Auth implementation notes: [AUTHENTICATION_SETUP.md](e:\affiflow\AUTHENTICATION_SETUP.md)
