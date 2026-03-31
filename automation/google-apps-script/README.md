# Google Apps Script Automation

This script receives paid-registration events from Stripe webhook processing, updates a Google Sheet ledger, and emails each paid participant a tokenized abstract submission link.

## 1. Deploy Script

1. Open https://script.google.com
2. Create a new Apps Script project.
3. Paste `Code.gs`.
4. Update `CONFIG` values.
5. Deploy as Web App:
   - Execute as: Me
   - Who has access: Anyone with the link
6. Copy deployment URL and set it as `APPS_SCRIPT_WEBHOOK_URL` in Vercel.

## 2. Configure Google Form Token Field

Configure two abstract form URLs in `Code.gs`:

- `ABSTRACT_FORM_BASE_URL_EARLY_GENERAL`
- `ABSTRACT_FORM_BASE_URL_LATE`

1. In Google Forms, add required short-text field: `Paid Token`.
2. Get prefilled link.
3. Extract the entry key (for example `entry.1234567890`).
4. Set `ABSTRACT_TOKEN_ENTRY_ID` in `Code.gs`.

## 3. Paid-Only Abstract Enforcement

- `validateAbstractToken(token)` checks:
  - token exists
  - payment status is `paid`
  - token has not been marked used
- `markTokenUsed(token)` marks one-time submission usage.

Use these functions from a form-response trigger or custom review process.

## 4. Sheet Columns Created Automatically

- `session_id`
- `email`
- `payment_status`
- `abstract_token`
- `email_sent_at`
- `submission_used_at`

## 5. Security

- Keep `SHARED_SECRET` synchronized with backend env var `APPS_SCRIPT_SHARED_SECRET`.
- Reject any payload that does not include the correct secret.
