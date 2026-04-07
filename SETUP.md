# AffiFlow Setup

This guide covers the local setup needed to run AffiFlow end to end with PostgreSQL and Clerk.

## Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL database
- Clerk account and application
- ngrok account if you want Clerk webhooks to work during local development

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy [`.env.example`](e:\affiflow\.env.example) to `.env.local` and fill in the values.

Required values:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
DATABASE_URL=postgresql://user:password@localhost:5432/affiflow
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

Notes:

- `DATABASE_URL` must point to a PostgreSQL database you can create tables in.
- `NEXT_PUBLIC_APP_URL` is used when generating affiliate short links.
- Prisma loads `.env.local` first via [prisma.config.ts](e:\affiflow\prisma.config.ts).

## 3. Prepare the database

Generate the Prisma client and apply existing migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

If you are actively changing the schema locally, create a new migration with:

```bash
npx prisma migrate dev --name your_migration_name
```

## 4. Configure Clerk

Create a Clerk application and set:

- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- After sign-in URL: `/dashboard`
- After sign-up URL: `/onboarding`

The app expects Clerk users to be mirrored into PostgreSQL through the webhook endpoint at `/api/webhooks/clerk`.

## 5. Configure the Clerk webhook

For local development you need a public tunnel to your dev server.

Start the app:

```bash
npm run dev
```

Start ngrok in another terminal:

```bash
ngrok http 3000
```

Or use the helper batch files on Windows:

```bat
.\setup-ngrok.bat
.\start-ngrok.bat
```

Then in Clerk:

1. Create a webhook endpoint pointing to `https://YOUR-NGROK-URL/api/webhooks/clerk`
2. Subscribe to `user.created`, `user.updated`, and `user.deleted`
3. Copy the webhook signing secret into `CLERK_WEBHOOK_SECRET`

## 6. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 7. Verify the flow

1. Sign up with a new account.
2. Confirm you are redirected to `/onboarding`.
3. Pick either `Merchant` or `Affiliate`.
4. Confirm `/dashboard` redirects to the correct role dashboard.
5. If testing as an affiliate, generate a link from `/dashboard/marketplace`.
6. Open the generated `/go/[slug]` URL and verify it redirects to the product URL and increments clicks.

## Troubleshooting

### Webhook does not create users

- Make sure ngrok is running and Clerk is pointed at the current public URL.
- Verify `CLERK_WEBHOOK_SECRET` matches the endpoint signing secret.
- Check the local server logs for webhook verification errors.

### Prisma cannot connect

- Recheck `DATABASE_URL`.
- Confirm PostgreSQL is running and the database exists.
- Re-run `npx prisma generate` and `npx prisma migrate deploy`.

### Referral links use the wrong host

- Set `NEXT_PUBLIC_APP_URL` correctly in `.env.local`.
- Restart the dev server after changing env variables.
