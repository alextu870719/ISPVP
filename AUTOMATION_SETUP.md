# ISPVP Automated Registration and Abstract Submission Setup

This guide wires your static conference site to Stripe + Vercel + Google Apps Script.

## Architecture

1. GitHub Pages site hosts registration UI.
2. Frontend calls Vercel `create-checkout-session` API.
3. Stripe Checkout handles card payment.
4. Stripe Webhook calls Vercel `stripe-webhook` API.
5. Vercel forwards paid event to Google Apps Script.
6. Apps Script updates Google Sheet and emails abstract link.
7. Abstract token is used for paid-only submission checks.

## A. Frontend (this repo)

Implemented files:

- `registration.md` payment form and checkout trigger
- `payment-success.md` and `payment-cancelled.md` status pages
- `abstracts.md` paid-only submission policy + Google Forms embed placeholder
- `assets/js/main.js` checkout API call logic and fee preview
- `assets/css/main.css` checkout form styles

### Required frontend edit

Set backend URL in `assets/js/main.js`:

- `window.ISPVP_CONFIG.CHECKOUT_API_BASE = 'https://YOUR-VERCEL-BACKEND.vercel.app'`

## B. Stripe Setup

1. Create Stripe account and switch to test mode.
2. Create Products/Prices for each registration tier:
   - early_regular
   - early_research
   - early_student
   - general_regular
   - general_research
   - general_student
   - late_regular
   - late_research
   - late_student
3. Copy each `price_...` ID.

## C. Backend (Vercel)

Backend scaffold is in `payments-api/`.

### Deploy

1. In terminal:
   - `cd payments-api`
   - `npm install`
2. Import `payments-api` into Vercel as a project.
3. Add environment variables from `.env.example` with real values.
4. Deploy and copy your production URL.

### Stripe webhook

1. In Stripe dashboard -> Developers -> Webhooks.
2. Add endpoint:
   - `https://YOUR-VERCEL-BACKEND.vercel.app/api/stripe-webhook`
3. Enable event:
   - `checkout.session.completed`
4. Copy signing secret to env var `STRIPE_WEBHOOK_SECRET`.

## D. Google Apps Script + Google Sheet

Files are in `automation/google-apps-script/`.

1. Create Google Sheet and copy Sheet ID.
2. Create Apps Script project and paste `Code.gs`.
3. Update CONFIG:
   - `SHEET_ID`
   - `SHARED_SECRET`
   - `ABSTRACT_FORM_BASE_URL`
   - `ABSTRACT_TOKEN_ENTRY_ID`
4. Deploy Apps Script as Web App and copy deployment URL.
5. Set backend env var:
   - `APPS_SCRIPT_WEBHOOK_URL`

### Fast final wiring (already prepared)

After you get your Apps Script Web App URL, run:

- `cd payments-api`
- `./scripts/set-apps-script-webhook.sh https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`

This command will:

1. Update `payments-api/.env.test.generated`
2. Update Vercel production env `APPS_SCRIPT_WEBHOOK_URL`
3. Redeploy production automatically

## E. Google Form (Abstract Submission)

1. Create Google Form for abstracts.
2. Add required field `Paid Token` (short text).
3. Get prefilled link and extract token entry ID (for example `entry.1234567890`).
4. Put the form ID into `abstracts.md` iframe URL.
5. Put entry ID into Apps Script `ABSTRACT_TOKEN_ENTRY_ID`.

## F. End-to-End Test (Stripe test mode)

1. Open registration page.
2. Submit form and proceed to Stripe Checkout.
3. Pay with test card `4242 4242 4242 4242`.
4. Confirm redirect to payment-success page.
5. Confirm in Google Sheet:
   - payment_status = paid
   - abstract_token populated
   - email_sent_at set
6. Confirm email received with abstract submission link.

## G. Production Cutover

1. Replace Stripe test keys/prices with live keys/prices.
2. Repoint webhook to production backend URL.
3. Make one small real transaction as final smoke test.

## Security Checklist

1. Keep all secrets only in Vercel/App Script config.
2. Never commit Stripe secret keys to this repo.
3. Keep Apps Script shared secret long and random.
4. Restrict frontend origin in backend CORS (`ALLOWED_ORIGIN`).
