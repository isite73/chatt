# FlowChat — Setup Guide
## Get your SaaS live in 30 minutes

---

## STEP 1: Supabase (your database)

1. Go to https://supabase.com → Sign up free
2. Create a new project (name it "flowchat")
3. Go to SQL Editor → New Query
4. Paste the entire contents of `supabase/schema.sql`
5. Click Run — all tables, security rules, and triggers are created
6. Go to Settings → API
7. Copy: Project URL + anon public key + service_role key

---

## STEP 2: Environment Variables

1. Copy `.env.example` → rename to `.env.local`
2. Fill in your Supabase values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

---

## STEP 3: Deploy to Vercel (free)

1. Go to https://github.com → Create a new repository called "flowchat"
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial FlowChat launch"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/flowchat.git
   git push -u origin main
   ```
3. Go to https://vercel.com → Import project from GitHub
4. Add your environment variables in Vercel dashboard
5. Deploy → your site is live at flowchat.vercel.app!

---

## STEP 4: Connect Supabase Auth

In Supabase → Authentication → URL Configuration:
- Site URL: https://your-app.vercel.app
- Redirect URLs: https://your-app.vercel.app/dashboard

---

## PAGES LIVE ON YOUR SITE

| Page | URL |
|---|---|
| Homepage | / |
| Signup | /signup |
| Login | /login |
| Dashboard | /dashboard |
| Flow Builder | /dashboard/flows/builder |
| Store + Excel | /dashboard/store |
| Inbox | /dashboard/inbox |
| Broadcasts | /dashboard/broadcasts |
| Contacts | /dashboard/contacts |
| Analytics | /dashboard/analytics |
| Growth Tools | /dashboard/growth |
| Settings | /dashboard/settings |

---

## STEP 5: Wire up real auth (next session)

In `app/login/page.tsx`, replace the fake setTimeout with:
```typescript
import { supabase } from '@/lib/supabase'

const { error } = await supabase.auth.signInWithPassword({ email, password })
if (!error) router.push('/dashboard')
```

In `app/signup/page.tsx`:
```typescript
const { error } = await supabase.auth.signUp({ 
  email, password, 
  options: { data: { full_name: form.name } }
})
```

---

## PRICING REMINDER
- Free: $0 / 1,000 contacts
- Starter: $7/mo / 500 active contacts  
- Pro: $19/mo / 1,000 active contacts
- Business: $39/mo / 2,500 active contacts

*(Add Stripe later for billing)*
