# Quick Start: Twitter Auth Setup

## 🚀 5-Minute Setup

### 1. Get Twitter Credentials (2 min)
```
https://developer.twitter.com/en/portal/dashboard
→ Create App (or use existing)
→ Go to Settings & Environments
→ Copy: Client ID, Client Secret
```

### 2. Create .env.local (1 min)
```bash
cd app
cp .env.local.example .env.local
```

### 3. Fill in Credentials (1 min)
```bash
# Generate secret
openssl rand -base64 32

# Then edit .env.local and add:
NEXTAUTH_SECRET=<paste-the-generated-value>
NEXTAUTH_URL=http://localhost:3000
TWITTER_CLIENT_ID=<paste-your-id>
TWITTER_CLIENT_SECRET=<paste-your-secret>
```

### 4. Configure Twitter App (1 min)
In Twitter Developer Portal:
- **Callback URLs:** `http://localhost:3000/api/auth/callback/twitter`
- **Website URL:** `http://localhost:3000`
- Save changes

### 5. Test (30 sec)
```bash
yarn dev
# Visit http://localhost:3000/login
# Click "Continue with X"
```

---

## ✅ Verification

After sign in, you should:
1. See Twitter authorization screen
2. Get redirected to `/dashboard`
3. See your Twitter username in navbar

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "NEXTAUTH_SECRET is missing" | Run `cp .env.local.example .env.local` and fill it |
| "Invalid client credentials" | Double-check Client ID and Secret |
| "Callback URL mismatch" | Make sure callback URL matches exactly in Twitter app |
| "Sign in button doesn't work" | Clear browser cache, check console for errors |

## 📚 Full Guide

See `AUTH_SETUP.md` for detailed setup instructions.
