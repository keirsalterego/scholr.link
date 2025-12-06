# Vercel Deployment Guide

## Build Issue Fixed ✓

**Problem:** Deployment was failing due to mixed package managers (npm and yarn)

**Solution Applied:**
1. ✅ Removed `package-lock.json` (npm lock file)
2. ✅ Created `.yarnrc.yml` to configure yarn properly
3. ✅ Vercel will now use `yarn.lock` exclusively

---

## Step-by-Step Deployment to Vercel

### 1. Push Changes to GitHub

First, commit and push the build fixes:

```bash
cd /home/keirsalterego/scholr.link
git add .
git commit -m "fix: remove package-lock.json and add yarn config for Vercel"
git push origin main
```

### 2. Connect to Vercel

Go to [vercel.com](https://vercel.com)

1. Click **Add New** → **Project**
2. Select **Import Git Repository**
3. Search for and select: `scholr.link`
4. Click **Import**

### 3. Configure Environment Variables

In Vercel project settings, go to **Settings** → **Environment Variables** and add:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=EVdA2onsTx330F/4lU+m1UGTDQiKlhwG8BotPmi42S8=
NEXTAUTH_URL=https://scholr-link.vercel.app

# Twitter OAuth (X)
TWITTER_CLIENT_ID=JQLAwHenhJ2EY6Fqo3CiO1UgS
TWITTER_CLIENT_SECRET=INvz0tPYUYUd069pBV6l3OwXWrkfCOOyqgwDgPKBLn0tcOpBNj

# Optional: Twitter Bearer Token
TWITTER_BEARER_TOKEN=AAAAAAAAAAAAAAAAAAAAAIRj5wEAAAAA3%2FcN01jZSCCsWHzxaLpUFoBvPsw%3DUjOaMLysQFuIo3vzFpclXex0etNaXlJjv5zp92JROJoVfpilGo

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

**Important:** Set the **Environment** to **Production, Preview, and Development** for each variable.

### 4. Update Twitter OAuth Settings

In [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard):

1. Go to your app → **Settings** → **Authentication Settings**

2. Update **Callback URLs** to:
   ```
   https://scholr-link.vercel.app/api/auth/callback/twitter
   ```

3. Update **Website URL** to:
   ```
   https://scholr-link.vercel.app
   ```

4. Click **Save**

### 5. Deploy

In Vercel:
1. Click **Deploy**
2. Wait for the build to complete (should take 2-5 minutes)
3. Once deployed, you'll get a URL like: `https://scholr-link.vercel.app`

### 6. Test the Deployment

1. Visit `https://scholr-link.vercel.app`
2. Click "Continue with X"
3. Authorize the app
4. You should be redirected to the dashboard

---

## Troubleshooting

### Build Still Fails

**Check logs in Vercel:**
1. Go to your Vercel project
2. Click **Deployments**
3. Click the failed deployment
4. View **Build Logs**

**Common issues:**
- Missing environment variables → Add in Vercel settings
- Wrong NEXTAUTH_URL → Must match deployment URL
- Twitter callback URL mismatch → Update in Twitter portal

### OAuth Still Not Working

**Verify Twitter Settings:**
- Callback URL matches: `https://scholr-link.vercel.app/api/auth/callback/twitter`
- Website URL is: `https://scholr-link.vercel.app`
- Client ID and Secret are correct

**Clear Browser Cache:**
- Press Ctrl+Shift+Delete
- Clear cookies and cache
- Try login again

### Custom Domain Setup

If using a custom domain (e.g., `scholr.link`):

1. In Vercel → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to: `https://scholr.link`
5. Update Twitter callback to: `https://scholr.link/api/auth/callback/twitter`

---

## Environment Variables Checklist

- [ ] NEXTAUTH_SECRET is set (matches local)
- [ ] NEXTAUTH_URL is set to your Vercel URL or custom domain
- [ ] TWITTER_CLIENT_ID is correct
- [ ] TWITTER_CLIENT_SECRET is correct
- [ ] Variables are set for Production environment
- [ ] NEXT_PUBLIC_SOLANA_NETWORK is set to devnet (or mainnet for production)

---

## Files Changed for Deployment Fix

1. **Removed:** `package-lock.json` (was causing npm/yarn conflict)
2. **Added:** `.yarnrc.yml` (tells yarn to use node-modules)
3. **Keep:** `yarn.lock` (your package lock file)
4. **Updated:** `.env.local` with Vercel URLs

---

## Quick Reference

| Component | Local Dev | Vercel Production |
|-----------|-----------|------------------|
| **NEXTAUTH_URL** | `http://localhost:3000` | `https://scholr-link.vercel.app` |
| **Callback URL** | `http://localhost:3000/api/auth/callback/twitter` | `https://scholr-link.vercel.app/api/auth/callback/twitter` |
| **Website URL** | `http://localhost:3000` | `https://scholr-link.vercel.app` |

---

## Deploy Again

After making these changes:

```bash
git add .
git commit -m "fix: vercel deployment config"
git push origin main
```

Vercel will automatically redeploy from the latest commit.

---

**Need Help?** Check Vercel logs or the `TWITTER_CALLBACK_FIX.md` guide for auth troubleshooting.
