# ISPVP Payments API (Vercel)

Serverless backend for:

- Stripe Checkout session creation
- Stripe webhook payment confirmation
- Forwarding paid registrations to Google Apps Script

## 1. Setup

1. Install dependencies:
   - `npm install`
2. Copy `.env.example` to `.env` and fill real values.
   - Or start from `.env.test.generated` if using your current Stripe test catalog.
3. Start local dev server:
   - `npx vercel dev`

## 2. API Endpoints

- `POST /api/create-checkout-session`
  - Input JSON:
    - `name`
    - `email`
    - `affiliation`
    - `ticketType` (`regular`, `research`, `student`)
    - `pricingWindow` (`early`, `general`, `late`)
  - Output JSON:
    - `url` (Stripe Checkout URL)

- `POST /api/stripe-webhook`
  - Stripe webhook target (raw body verified)
  - Event used: `checkout.session.completed`

## 3. Stripe Dashboard

1. Create products/prices for each ticket/window combination.
2. Put all `price_...` IDs in env vars.
3. Add webhook endpoint:
   - `https://YOUR_BACKEND_DOMAIN/api/stripe-webhook`
4. Enable event:
   - `checkout.session.completed`
5. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

## 4. Deployment

1. Import this folder as a project in Vercel.
2. Set all environment variables in Vercel project settings.
3. Deploy and copy production base URL into frontend config.

## 5. Security Notes

- Keep Stripe secret keys only in Vercel env vars.
- Restrict CORS via `ALLOWED_ORIGIN`.
- Use webhook signature verification (already implemented).
