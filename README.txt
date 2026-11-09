ANNADATA FRESH MART – WEBSITE
=============================

Files
- index.html        Main website (English + Hindi, cart, checkout)
- privacy.html      Privacy policy (Razorpay ke liye zaroori)
- refund.html       Refund & cancellation policy
- terms.html        Terms & conditions
- assets/           Logo, sabzi ki photos, khet ki video clips

Kya badalna hai (index.html kholo, neeche <script> mein "EDIT HERE" dhundo)
- upiId        : farmer ji ka UPI ID, jaise "naam@okaxis"
- mapQuery / mapLink : khet ka Google Maps link
- instagram / facebook : page ke link (khali rahega toh footer mein nahi dikhega)
- razorpayKey  : Razorpay account active hone ke baad

Sabzi ka rate ya nayi sabzi
- Usi script mein "PRODUCTS" list hai. Har sabzi mein price (aaj ka rate) aur mrp (kata hua rate) badlo.
- % OFF apne aap calculate hota hai.
- Nayi photo assets/ folder mein daalo aur img mein uska naam likho.

Timeline (Sitaram ji ki journey)
- Usi script mein "TIMELINE" list hai. Saal aur text English (en) aur Hindi (hi) dono mein badal sakte ho.

Website live kaise karein
- Ye simple website hai, koi server nahi chahiye.
- Vercel ya Netlify pe poora folder upload karo, phir domain jod do.
- Domain milte hi Claude ko bolna, setup kar dega.

Order kaise aata hai
- Customer checkout karta hai, toh poora order (sabzi, total, naam, number, pata, time slot) WhatsApp 96360 32956 pe aata hai.
- Zucchini wale order mein "FREE Zucchini Recipe Kit" likha aayega. Recipe kit WhatsApp pe bhej dena.

-------------------------------------------------
UPDATE (9 Nov 2026): Install app + Account + Membership
-------------------------------------------------
Naye / badle hue files (purane folder mein inhe replace ya add karo):
- index.html              (login, membership section, balance se payment, Install app button)
- account.js              (login, Mera Account, order history, membership)
- admin.html              (admin panel: membership approve, orders, sabzi rate)
- membership.html         (membership ki shartein)
- manifest.webmanifest, sw.js  (Install app / Add to Home Screen)
- assets/icon-192.png, assets/icon-512.png, assets/apple-touch-icon.png
- assets/supabase.js      (database se baat karne wali library)

Database: Supabase project "annadata-fresh-mart" (Mumbai). Saara data wahin hai.
Admin panel: website-ka-domain/admin.html  (sirf admin email se khulega)
Install app aur login domain (https) pe live hone ke baad hi chalenge.
