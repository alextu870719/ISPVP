Stripe API credentials must not be stored in plaintext files in this repository.

Use secure environment storage only:

- Frontend publishable key: set in deployment config (public key only)
- Backend secret key: set as `STRIPE_SECRET_KEY` in Vercel environment variables
- Webhook signing secret: set as `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

Reference files:

- `payments-api/.env.example`
- `payments-api/.env.test.generated`
- `stripe_price_mapping.md`