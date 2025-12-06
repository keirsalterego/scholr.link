# ScholrLink Authentication Setup

## Overview

ScholrLink uses NextAuth with Twitter (X) OAuth for user authentication. This guide will help you set up the authentication system.

## Prerequisites

1. Twitter Developer Account at [developer.twitter.com](https://developer.twitter.com)
2. A Twitter App created in the Developer Portal
3. Environment variables configured

## Step 1: Create a Twitter App

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or select an existing one
3. Go to **Authentication Settings** 
4. Enable **OAuth 2.0 User Context Authentication**
5. Set **Type of App** to **Web App**
6. Set up **Callback URLs**:
   - Development: `http://localhost:3000/api/auth/callback/twitter`
   - Production: `https://scholr.link/api/auth/callback/twitter`
7. Add **Website URL**: `http://localhost:3000` (dev) or `https://scholr.link` (production)
8. Copy your:
   - **Client ID**
   - **Client Secret**

## Step 2: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and fill in the values:
   ```env
   # Generate a secure secret using:
   # openssl rand -base64 32
   NEXTAUTH_SECRET=your-generated-secret-here
   
   NEXTAUTH_URL=http://localhost:3000
   
   TWITTER_CLIENT_ID=your-client-id-here
   TWITTER_CLIENT_SECRET=your-client-secret-here
   ```

3. Generate a secure `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

## Step 3: Configure Callback URL in Twitter App

1. In Twitter Developer Portal, go to **App Settings**
2. Under **Authentication Settings**, add:
   - **Callback URLs**: `http://localhost:3000/api/auth/callback/twitter`
   - **Website URL**: `http://localhost:3000`
3. Save the changes

## Step 4: Verify Setup

1. Start the development server:
   ```bash
   cd app
   yarn dev
   ```

2. Visit `http://localhost:3000/login`

3. Click "Continue with X" button

4. You should be redirected to Twitter to authorize the app

5. After authorization, you should be redirected to `/dashboard`

## Troubleshooting

### "Sign in failed" Error
- Verify `TWITTER_CLIENT_ID` and `TWITTER_CLIENT_SECRET` are correct
- Ensure callback URL in Twitter app matches your local/production URL
- Check that `NEXTAUTH_SECRET` is set and non-empty

### Callback URL Mismatch
- The callback URL must exactly match what's configured in the Twitter app
- Common issue: `localhost` vs `127.0.0.1` - use `localhost`

### Session Not Persisting
- Ensure `NEXTAUTH_SECRET` is set
- Check browser cookies are enabled
- Verify session strategy is JWT in `auth.ts`

### CORS Issues
- Make sure API routes are accessible at `/api/auth/[...nextauth]`
- Run `yarn dev` from the `app` directory

## Files Modified

- `src/auth.ts` - NextAuth configuration
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API route
- `src/app/login/page.tsx` - Login page with error handling
- `src/components/AuthButton.tsx` - Auth button component
- `src/components/AuthProvider.tsx` - Session provider wrapper
- `src/types/next-auth.d.ts` - TypeScript types for session
- `.env.local` - Environment variables (create from `.env.local.example`)

## Session Data

After successful authentication, the user session contains:

```typescript
{
  user: {
    id: string;              // Twitter ID
    name: string;            // Twitter name
    email: string;           // Twitter email (if available)
    image: string;           // Twitter profile image URL
    twitterUsername: string; // Twitter @username
  }
}
```

## Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Update callback URL in Twitter app to production domain
3. Ensure `NEXTAUTH_SECRET` is securely generated and set
4. Use a strong, random secret (not the development one)

## Security Notes

- Never commit `.env.local` to version control
- Keep `NEXTAUTH_SECRET` secure and rotate periodically
- Use different secrets for development and production
- Twitter secrets should be treated as sensitive data
