# Stripe Product -> Price Mapping (Test Mode)

Generated automatically from Stripe API.

| Product | Product ID | Price ID | Amount |
|---|---|---|---|
| ISPVP 2026 Early Regular | prod_UFHmKXqKuBJjLR | price_1TGnDN9tM1eAQdRYUG4UaIUp | USD 450 |
| ISPVP 2026 Early Research | prod_UFHokF1jORQKHt | price_1TGnF09tM1eAQdRYKsxXnZ2I | USD 350 |
| ISPVP 2026 Early Student | prod_UFHpuuzK74mzbX | price_1TGnFo9tM1eAQdRYiLnMjulZ | USD 250 |
| ISPVP 2026 General Regular | prod_UFHphoSgZml3Zr | price_1TGnGH9tM1eAQdRYlmwrjqHG | USD 500 |
| ISPVP 2026 General Research | prod_UFHqvvzjT2o6LB | price_1TGnGe9tM1eAQdRYplNs9mzh | USD 400 |
| ISPVP 2026 General Student | prod_UFHq8qEMapdwoF | price_1TGnH19tM1eAQdRYqUDIpdxF | USD 300 |
| ISPVP 2026 Late Regular | prod_UFHrW6D5njxaeZ | price_1TGnHQ9tM1eAQdRY6gARsq19 | USD 550 |
| ISPVP 2026 Late Research | prod_UFHrvYiU0TdAow | price_1TGnHt9tM1eAQdRYNiPxxViP | USD 450 |
| ISPVP 2026 Late Student | prod_UFHsbPzSdgBu7A | price_1TGnIh9tM1eAQdRYOzXwPIpA | USD 350 |
| ISPVP 2026 Fundraising Donation (optional) | prod_UFHtU7wiFZrkhj | price_1TGnJf9tM1eAQdRYl2a4dPQe | Amount configurable |

## Backend Variables Used

The implementation uses these environment variables in `payments-api/api/create-checkout-session.js`:

- `STRIPE_PRICE_EARLY_REGULAR`
- `STRIPE_PRICE_EARLY_RESEARCH`
- `STRIPE_PRICE_EARLY_STUDENT`
- `STRIPE_PRICE_GENERAL_REGULAR`
- `STRIPE_PRICE_GENERAL_RESEARCH`
- `STRIPE_PRICE_GENERAL_STUDENT`
- `STRIPE_PRICE_LATE_REGULAR`
- `STRIPE_PRICE_LATE_RESEARCH`
- `STRIPE_PRICE_LATE_STUDENT`

Use `payments-api/.env.test.generated` as your starting env file for Vercel test deployment.
