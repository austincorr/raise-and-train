# Whole · Holistic Wellness App

A four-pillar wellness app for busy parents: **Physical · Spiritual · Mental · Social.**

Built with React + Vite. Single-file deployable as a static site.

---

## Run Locally

```bash
npm install
npm run dev
```
Opens at http://localhost:5173

## Build for Production

```bash
npm run build
```
Outputs static files to `dist/` — this is what you deploy.

---

## Deploy Online — Three Easy Options

### Option 1: Vercel (Recommended — 2 minutes, free)

The simplest path. Free SSL, free custom domain, free hosting.

**Steps:**
1. Push this folder to a GitHub repo (free at github.com)
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click "Add New" → "Project" → pick your repo
4. Click "Deploy" — Vercel auto-detects Vite settings
5. You get a URL like `whole-app-yourname.vercel.app` instantly

**To add a custom domain (e.g. `mywholeapp.com`):**
- Buy domain from Namecheap, Porkbun, or Google Domains (~$10-15/yr)
- In Vercel project → Settings → Domains → Add your domain
- Vercel shows you the DNS records to set at your registrar
- Done — usually live within 1 hour

### Option 2: Netlify (also free, also great)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import existing project"
3. Pick your repo. Build command: `npm run build`. Publish directory: `dist`
4. Deploy. Custom domain works the same way.

### Option 3: Cloudflare Pages (fastest, generous free tier)

1. Push to GitHub
2. [pages.cloudflare.com](https://pages.cloudflare.com) → Create project → Connect Git
3. Framework preset: Vite. Build: `npm run build`. Output: `dist`
4. If you already use Cloudflare for DNS, custom domain is one click.

---

## Recommended Domain Name Ideas

- `wholeapp.io`
- `getwhole.app`
- `wholewellness.co`
- `bewhole.app`
- `wholedaily.com`

Check availability at [namecheap.com](https://namecheap.com) or [porkbun.com](https://porkbun.com).

---

## Important: Current State of the App

Right now, this is a **fully working prototype** — UI, state, animations, all interactive. But:

- ❌ No backend yet — data resets when you reload the page
- ❌ No real AI — coach responses are pre-written templates
- ❌ No login — everyone shares the same demo account "Sarah"

These are the next steps if you want a real product. See "Next Steps" below.

---

## Next Steps to Become a Real Product

### Phase 1: Save user data (critical first step)
Add a backend so each user's data persists.
- **Easiest path:** [Supabase](https://supabase.com) — free tier, gives you database + auth + API in 30 min of setup
- **Alternative:** [Firebase](https://firebase.google.com) — Google's equivalent

### Phase 2: Real AI Coach
Connect to a real LLM. Two options:
- **Claude API** ([console.anthropic.com](https://console.anthropic.com)) — best for conversational coaching
- **OpenAI API** — also works well

You'd add an API endpoint that takes the user's message + their pillar scores + recent activity and returns coaching advice.

### Phase 3: Social/Competition
- Add user accounts (Supabase handles this)
- Friend invites via shareable link
- Real leaderboard pulling from your database

### Phase 4: Mobile app feel
- Add PWA manifest so users can "install" the website to their home screen like an app
- Push notifications for nudges (requires backend)

### Phase 5: Native apps
When you have paying users and want to charge through app stores:
- Wrap with [Capacitor](https://capacitorjs.com) — turns this React app into iOS + Android apps with minimal changes
- Or rewrite in [React Native](https://reactnative.dev) for true native feel

---

## File Structure

```
whole-app/
├── index.html          ← Entry HTML
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
├── src/
│   ├── main.jsx        ← React entry point
│   └── App.jsx         ← The entire app (one file, ~1700 lines)
└── README.md           ← This file
```

The entire app lives in `src/App.jsx`. To modify any tab, search for the view name (e.g. `function SpiritualView`).

---

## Questions?

Built with Claude. Ask Claude follow-up questions to extend, modify, or troubleshoot.
