# 🔐 Authentication System Setup Guide

## Overview
AffiFlow uses **Clerk** for authentication with PostgreSQL for user data persistence. The system includes:
- Sign-up and Sign-in pages
- Role selection (Merchant/Affiliate)
- Auto-sync users to database via webhooks
- Protected routes

## 🚀 Quick Local Setup (No Domain Required)

### For Local Development (Recommended)

1. **Install ngrok** (if not already installed):
   ```bash
   npm install -g ngrok
   ```

2. **Start your Next.js app**:
   ```bash
   npm run dev
   ```

3. **Create ngrok tunnel** (in a new terminal):
   ```bash
   # First time setup (run once):
   .\setup-ngrok.bat

   # Then start tunnel:
   .\start-ngrok.bat

   # Or manually:
   ngrok http 3000
   ```

4. **Copy the HTTPS URL** from ngrok (e.g., `https://abc123.ngrok.io`)

5. **Update Clerk Webhook**:
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Navigate to **Webhooks**
   - Create/Edit webhook with URL: `https://YOUR_NGROK_URL/api/webhooks/clerk`
   - Subscribe to events: `user.created`, `user.updated`, `user.deleted`
   - Copy the **Signing Secret** → `CLERK_WEBHOOK_SECRET`

6. **Update your `.env.local`**:
   ```
   CLERK_WEBHOOK_SECRET=whsec_YOUR_ACTUAL_SECRET_HERE
   ```

7. **Test the flow**:
   - Visit: http://localhost:3000/sign-up
   - Sign up with a new email
   - Should redirect to onboarding
   - Select role and continue

### Alternative: Manual ngrok Setup

If you prefer manual setup:

```bash
# Terminal 1: Start Next.js
npm run dev

# Terminal 2: Start ngrok
ngrok http 3000

# Copy the HTTPS URL and update Clerk webhook URL
```

## 📋 Complete Setup Steps

### 1. Create Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Sign up and create a new application
3. Choose **Next.js** as your framework

### 2. Get Clerk Credentials
From your Clerk Dashboard:
1. Go to **API Keys** (or **Configuration > Credentials**)
2. Copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (public)
   - `CLERK_SECRET_KEY` (secret)

### 3. Set Up Webhook (Local Development)
1. Install and run ngrok: `ngrok http 3000`
2. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
3. In Clerk Dashboard, go to **Webhooks**
4. Create a new webhook:
   - **Endpoint URL**: `https://YOUR_NGROK_URL/api/webhooks/clerk`
   - **Events to subscribe**:
     - `user.created`
     - `user.updated`
     - `user.deleted`
5. Copy the **Signing Secret** → `CLERK_WEBHOOK_SECRET`

### 4. Environment Variables
Create `.env.local`:
```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/affiflow

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### 5. Database Setup
```bash
# Create .env.local with DATABASE_URL
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 6. Test Locally
```bash
npm run dev
```

Then visit:
- Sign up: http://localhost:3000/sign-up
- Sign in: http://localhost:3000/sign-in

## Authentication Flow

```
User Signs Up
    ↓
Clerk Registration Page
    ↓
Clerk Webhook → /api/webhooks/clerk
    ↓
User Created in Database
    ↓
Redirected to Onboarding (/onboarding)
    ↓
Choose Role (Merchant/Affiliate)
    ↓
Redirected to Dashboard
    ↓
Access Protected Routes
```

## Key Files

| File | Purpose |
|------|---------|
| `app/sign-up/[[...sign-up]]/page.tsx` | Sign-up page with Clerk UI |
| `app/sign-in/[[...sign-in]]/page.tsx` | Sign-in page with Clerk UI |
| `app/onboarding/page.tsx` | Role selection page |
| `app/api/webhooks/clerk/route.ts` | Webhook handler for user sync |
| `actions/user.ts` | Server actions for user operations |
| `middleware.ts` | Route protection middleware |
| `prisma/schema.prisma` | Database schema with User model |
| `setup-ngrok.bat` | ngrok authentication setup script |
| `start-ngrok.bat` | ngrok tunnel starter script |

## User Data Sync

When a user signs up/updates via Clerk:
1. Webhook is triggered
2. `/api/webhooks/clerk` receives the event
3. User data is synced to PostgreSQL (User table)
4. On sign-up: User redirected to onboarding
5. User selects role: MERCHANT or AFFILIATE

## Protected Routes

These routes require authentication:
- `/dashboard`
- `/marketplace`
- `/links`
- `/sales`

## Troubleshooting

### Webhook not triggering
- Ensure `CLERK_WEBHOOK_SECRET` is correct
- Check webhook endpoint is publicly accessible (ngrok URL)
- Verify events are subscribed in Clerk Dashboard
- Keep ngrok running while testing

### User not in database
- Check webhook logs in Clerk Dashboard
- Verify database connection in `.env.local`
- Check server logs for errors
- Ensure ngrok tunnel is active

### Redirect loop
- Ensure `DATABASE_URL` is correct
- Run `npx prisma migrate dev` to create tables
- Check middleware configuration

### ngrok issues
- Make sure port 3000 is not blocked
- Try different ngrok regions: `ngrok http 3000 --region=us`
- Check ngrok status: visit the web interface at http://localhost:4040
- Restart ngrok if connection drops

## Security Notes

- Never commit `.env.local`
- Use strong database passwords
- Enable HTTPS for webhook endpoint in production
- Rotate Clerk API keys regularly
- Use environment variables for all secrets
- For production, use a proper domain instead of ngrok
