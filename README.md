# AffiFlow - Affiliate Marketing Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.6-2D3748?logo=prisma)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com/)

**AffiFlow** is a modern, full-stack affiliate marketing platform that connects merchants with affiliates. Merchants can list their products and set commission rates, while affiliates can promote those products and earn commissions on sales they drive.

## 🚀 Features

### For Merchants
- **Product Management**: Add, edit, and manage products with custom commission rates
- **Sales Tracking**: Manually confirm affiliate-driven sales
- **Payout Management**: Track and manage commission payouts to affiliates
- **Dashboard Analytics**: View total products, sales, and commissions paid

### For Affiliates
- **Product Marketplace**: Browse and search available products to promote
- **Link Generation**: Create unique tracking links for any product
- **Click Tracking**: Monitor clicks and engagement on referral links
- **Earnings Dashboard**: Track pending, confirmed, and paid commissions
- **Link Management**: View all generated links with copy-to-clipboard functionality

### Platform Features
- **Role-Based Access**: Separate experiences for merchants and affiliates
- **Real-time Tracking**: Click tracking and conversion attribution
- **Manual Confirmation**: Merchants verify sales before commissions are credited
- **Secure Authentication**: Powered by Clerk with multiple sign-in options
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional Landing Page**: Attractive marketing page with features and testimonials

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Next.js Server Actions, Route Handlers
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **File Upload**: UploadThing (ready for integration)
- **Charts**: Recharts
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 20+ and npm
- PostgreSQL database
- Clerk account and application
- (Optional) UploadThing account for image uploads

## 🏗️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/affiflow.git
cd affiflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/affiflow

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

### 5. Configure Clerk Webhooks

For local development, you'll need a public URL (use ngrok):

```bash
# Install ngrok if you haven't
npm install -g ngrok

# Start your app
npm run dev

# In another terminal, create a tunnel
ngrok http 3000
```

Then in your Clerk dashboard:
1. Go to **Webhooks** → **Add Endpoint**
2. Set the URL to `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
3. Subscribe to: `user.created`, `user.updated`, `user.deleted`
4. Copy the webhook signing secret to `CLERK_WEBHOOK_SECRET`

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` (or the port shown in your terminal).

## 📁 Project Structure

```
affiflow/
├── app/
│   ├── (dashboard)/          # Dashboard layouts
│   ├── api/                  # API routes and webhooks
│   ├── dashboard/            # Main dashboard pages
│   ├── go/                   # Affiliate link redirect
│   ├── marketplace/          # Product marketplace
│   ├── onboarding/           # User role selection
│   ├── sign-in/              # Clerk sign-in
│   ├── sign-up/              # Clerk sign-up
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── actions/                  # Server actions
│   ├── link.ts              # Link generation
│   ├── product.ts           # Product management
│   ├── sale.ts              # Sale confirmation
│   └── user.ts              # User management
├── components/
│   ├── dashboard/           # Dashboard components
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── current-user.ts      # Get current user helper
│   ├── prisma.ts           # Prisma client
│   ├── products.ts         # Product utilities
│   └── utils.ts            # General utilities
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
└── public/                 # Static assets
```

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Stores user information with role (MERCHANT or AFFILIATE)
- **Product**: Products listed by merchants with commission rates
- **Link**: Affiliate tracking links with click counts
- **Sale**: Sales records with commission amounts and status

See `prisma/schema.prisma` for the complete schema.

## 🎯 User Flows

### Merchant Flow
1. Sign up → Choose "I am a merchant"
2. Add products with name, price, description, and commission rate
3. Share product links with affiliates
4. When a sale occurs, manually confirm it in the dashboard
5. Track and pay commissions to affiliates

### Affiliate Flow
1. Sign up → Choose "I am an affiliate"
2. Browse the marketplace for products to promote
3. Generate unique tracking links for selected products
4. Share links on social media, blogs, etc.
5. Earn commissions on confirmed sales
6. Track earnings and request payouts

## 🔗 Affiliate Link System

Affiliate links follow this pattern:
```
https://affiflow.com/go/[shortSlug]
```

When clicked:
1. The system records the click
2. User is redirected to the product's original URL
3. If a sale is confirmed by the merchant, commission is credited

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set all required environment variables in your Vercel project settings.

### Database

Use a production PostgreSQL database (e.g., Supabase, Railway, or AWS RDS).

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up as a merchant
- [ ] Add a product
- [ ] Sign up as an affiliate
- [ ] Browse marketplace and generate a link
- [ ] Click the affiliate link (should redirect and increment clicks)
- [ ] Merchant confirms a sale
- [ ] Affiliate sees commission in earnings
- [ ] Merchant marks commission as paid

## 📈 Future Enhancements

- [ ] Automatic sale tracking via pixel/API
- [ ] Auto payouts via bKash/Nagad/Stripe
- [ ] AI-based product recommendations
- [ ] Affiliate mini-store with subdomain
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Advanced analytics with charts
- [ ] Email notifications
- [ ] API rate limiting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Clerk](https://clerk.com/) - Authentication and user management
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

For support, email support@affiflow.com or open an issue in the GitHub repository.

---

**AffiFlow** - Connecting merchants and affiliates, one commission at a time.