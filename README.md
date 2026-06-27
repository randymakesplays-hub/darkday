# The Dark Day — Saving Health Ministries

Static site, no build step. Push it to GitHub, import to Vercel, done.

## Files
- `index.html` — Home
- `the-dark-day.html` — The Dark Day (seven judgments)
- `watch.html` — Watch library
- `about.html` — About
- `give.html` — Give
- `styles.css` — all styling
- `script.js` — mobile nav, give selector, YouTube auto-publish

## 1. Launch on GitHub
```bash
cd darkday
git init
git add .
git commit -m "Saving Health Ministries — Dark Day site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/darkday.git
git push -u origin main
```

## 2. Deploy on Vercel
1. vercel.com → Add New → Project → import the repo
2. Framework Preset: **Other** (it's plain static, no settings needed)
3. Deploy

You'll get a live URL in about a minute.

## 3. Point the domains (later, from David's GoDaddy)
In Vercel → Project → Settings → Domains, add `darkday.us` (primary) and
`savinghealthministries.com` (set to redirect to darkday.us). Vercel gives you
the DNS records to paste into GoDaddy.

## 4. Turn on auto-publish (videos pull from YouTube automatically)
Open `script.js`, top of the file, and fill in two values:
```js
const YT_CONFIG = {
  channelId: "UC...",   // David's channel ID — YouTube Studio > Settings > Channel > Advanced
  apiKey:    "AIza...", // YouTube Data API v3 key from Google Cloud Console
  ...
};
```
Leave them blank and the site shows the finished static layout — it still looks
complete. The moment you add the two values, every video grid and featured
player fills itself from the channel and stays current with no manual updates.

Tip: in Google Cloud Console, restrict the API key to the HTTP referrer
`darkday.us/*` so it can't be reused elsewhere.

## Swap in real assets
- About photo: `about.html` has a comment marking the image slot — drop in
  `<img src="assets/about.jpg" alt="...">`.
- Give button: `give.html` — point the "Give now" link at David's processor
  (PayPal, Givelify, Stripe, etc.).
- Footer / nav "YouTube Channel" links currently point to youtube.com — swap to
  the real channel URL.
