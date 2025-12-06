# Twitter OAuth Callback URL Configuration

## Problem
When clicking "Continue with X", after authorizing the app, you see:
> "Something went wrong. You weren't able to give access to the App. Go back and try logging in again."

## Root Cause
The **Callback URL** configured in your Twitter app does NOT match the URL that ScholrLink is expecting.

---

## Solution: Fix the Callback URL

### Step 1: Check Your App's Callback URL

In your Twitter Developer Portal:
1. Go to **[developer.twitter.com/en/portal/dashboard](https://developer.twitter.com/en/portal/dashboard)**
2. Select your app
3. Go to **Settings** → **Authentication Settings**
4. Look for **"Callback URLs (required)"**

### Step 2: Verify Against Your App Configuration

ScholrLink expects the callback at:
- **Local Development:** `http://localhost:3000/api/auth/callback/twitter`
- **Production:** `https://scholr.link/api/auth/callback/twitter`

### Step 3: Update in Twitter Portal

1. In the **Callback URLs** field, ensure you have exactly:
   - For local: `http://localhost:3000/api/auth/callback/twitter`
   - For production: `https://scholr.link/api/auth/callback/twitter`

2. **Important:** 
   - Use `http://` for localhost
   - Use `https://` for production
   - Match the exact URL exactly (including protocol and path)

3. Also configure:
   - **Website URL:** `http://localhost:3000` (or your production domain)
   - **Terms of Service URL:** (optional)
   - **Privacy Policy URL:** (optional)

4. Click **Save**

### Step 4: Also Check "Callback URL for Web App"

Some Twitter apps also have a separate "Web App" callback URL field:
- Make sure it matches: `http://localhost:3000/api/auth/callback/twitter`

---

## Step 5: Test Again

1. Clear browser cookies (important!)
   - Press F12 → Application → Cookies → Delete all from localhost
   
2. Refresh the page and try logging in again

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Still getting the error | Clear all cookies and try again |
| Multiple callback URLs | Only keep ONE callback URL for your environment (dev or prod) |
| http vs https mismatch | Ensure protocol matches (http for localhost, https for production) |
| URL doesn't include `/api/auth/callback/twitter` | Add the full path, not just domain |
| Trailing slash issue | Ensure no trailing slash: `...callback/twitter` not `...callback/twitter/` |

---

## Environment Variable Verification

Your `.env.local` should have:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=EVdA2onsTx330F/4lU+m1UGTDQiKlhwG8BotPmi42S8=
TWITTER_CLIENT_ID=JQLAwHenhJ2EY6Fqo3CiO1UgS
TWITTER_CLIENT_SECRET=INvz0tPYUYUd069pBV6l3OwXWrkfCOOyqgwDgPKBLn0tcOpBNj
```

**NEXTAUTH_URL must match your environment** (http://localhost:3000 for dev)

---

## How NextAuth Uses the Callback URL

1. User clicks "Continue with X"
2. Redirected to Twitter's login page
3. After authorization, Twitter redirects to the **Callback URL**
4. NextAuth catches this at `/api/auth/callback/twitter`
5. NextAuth validates the response and creates a session
6. User is redirected to `/dashboard`

**If the Callback URL doesn't match, Twitter can't redirect back to your app!**

---

## How to Verify It's Working

After fixing the callback URL:

1. Dev server running at `http://localhost:3000`
2. You see in the Network tab (F12):
   - `POST /api/auth/signin/twitter` - initiates login
   - Redirects to `twitter.com/i/oauth2/authorize?...`
   - After auth, redirects back to `http://localhost:3000/api/auth/callback/twitter`
   - Then redirects to `http://localhost:3000/dashboard`

---

## Quick Checklist

- [ ] Twitter Dev Portal shows correct callback URL
- [ ] Callback URL includes full path: `/api/auth/callback/twitter`
- [ ] Protocol matches: `http://` for localhost
- [ ] No trailing slash on callback URL
- [ ] NEXTAUTH_URL set in `.env.local`
- [ ] Cleared browser cookies
- [ ] Restarted dev server after updating `.env.local`

---

## Still Not Working?

1. **Enable debug logging:**
   ```bash
   # Add to .env.local
   DEBUG=nextauth:*
   ```

2. **Check browser DevTools Console (F12):**
   - Look for NextAuth errors
   - Check Network tab for redirect chain

3. **Check server logs:**
   - Look for POST to `/api/auth/signin/twitter`
   - Look for errors in callback handling

4. **Verify credentials:**
   - TWITTER_CLIENT_ID and TWITTER_CLIENT_SECRET are correct
   - No extra spaces or quotes

---

**For More Help:** See `AUTH_SETUP.md` or `QUICK_START_AUTH.md`
