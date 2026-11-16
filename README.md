# Annadata Fresh Mart — website

Static website (HTML/CSS/JS) + Supabase database. No build step: upload the folder to GitHub and host on Vercel / Netlify / GitHub Pages.

## Files
- `index.html` — home + Blinkit-style shop, cart, checkout, login, account, founder story
- `style.css` — design
- `config.js` — **settings**: WhatsApp number, UPI ID, delivery rules, social links, fallback product list, all English/Hindi text
- `app.js` — shop, cart, login (email code + Google), checkout, wallet, story
- `admin.html` — admin panel: orders, payment check, membership approve, daily rates
- `zucchini.html`, `membership.html`, `privacy.html`, `refund.html`, `terms.html`
- `sw.js`, `manifest.webmanifest` — Install app (PWA)

## Daily use
- Rates: open `/admin.html` → "Sabzi & rate" → change price → Save.
- Orders: `/admin.html` → Orders → status change, "Paid mark karo", "fee hatao" (within 2 km).

## When UPI is ready
Open `config.js` → `upiId: "name@okaxis"` → commit. The "Pay now with UPI" option appears automatically.
