# Desktop contact delivery

`api/contact.js` is a Vercel Node function. Set these server-only Production environment variables, then deploy:

- `RESEND_API_KEY`: dedicated Resend key with Sending access.
- `CONTACT_FROM_EMAIL`: verified sender, or `Hikari Portfolio <onboarding@resend.dev>` while using Resend's default domain.
- `CONTACT_TO_EMAIL`: owner's inbox. The default Resend domain can send only to the Resend account owner's email; this account uses `hikaribrandan3@gmail.com`.

Do not prefix these variables with `VITE_` or commit credentials. A verified domain is needed before changing the default sender or sending to other recipients. Visitor email is used only as Reply-To; the recipient is fixed on the server.

The form preserves messages on failure and uses one request ID for retries. The endpoint reports success only after Resend returns an accepted email ID. This means accepted for delivery, rather than a guarantee of inbox delivery. Check Resend's delivery events for end-to-end verification.

Input validation, an empty honeypot, same-origin checks, and a per-instance limit of five attempts per ten minutes reduce accidental or basic abusive submissions. The in-memory limit is best-effort across serverless instances; use a shared limiter or Vercel Firewall for stronger abuse controls if needed.

Run `node --test tests/contact.test.js` for API boundary checks. These mock the email provider and send no actual email. A production smoke test should use a clearly labeled test message addressed to the configured owner inbox.

References: [Resend send API](https://resend.com/docs/api-reference/emails/send-email), [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js).
