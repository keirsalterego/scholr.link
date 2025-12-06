# X (Twitter) Data and API Usage Declaration

**Application:** ScholrLink  
**Date:** December 6, 2025  
**Purpose:** Data Protection Compliance Documentation

---

## 1. Overview of X API Integration

ScholrLink uses the X (formerly Twitter) OAuth 2.0 API exclusively for **user authentication and identity verification**. We do NOT use X's data collection, analytics, or publishing APIs.

---

## 2. Specific Data Collected from X

### 2.1 Data Retrieved During OAuth Authentication

When a user clicks "Continue with X" and authorizes ScholrLink, we receive and store the following data from X's OAuth 2.0 User Context API:

| Data Field | Type | Purpose | Retention |
|-----------|------|---------|-----------|
| **User ID** | String | Unique user identifier for session management | Session lifetime + 30 days (JWT expiration) |
| **Username** | String | Twitter handle (e.g., @username) | Session lifetime + 30 days |
| **Profile Image URL** | String | URL to user's Twitter profile picture | Session lifetime + 30 days |
| **Email** (if available) | String | User's email from Twitter (optional) | Not explicitly stored, available in JWT |
| **Name** (if available) | String | User's display name from Twitter | Session lifetime + 30 days |

### 2.2 Data NOT Collected

We explicitly do **NOT** collect or store:
- Tweet history or content
- Following/follower lists
- Direct message data
- Engagement metrics (likes, retweets, replies)
- User location data
- User phone numbers
- Protected/private tweets
- User preferences or settings
- API usage data
- User tokens or authentication credentials (other than OAuth token)

---

## 3. API Endpoints Used

### 3.1 OAuth 2.0 Flow

**Provider:** X OAuth 2.0 (via NextAuth.js abstraction)

**Endpoints:**
- `https://twitter.com/i/oauth2/authorize` - User authorization
- `https://api.twitter.com/2/oauth2/token` - Token exchange
- `https://api.twitter.com/2/users/me` - Fetch authenticated user profile

**Scope:** `tweet.read users.read` (read-only access to user profile)

**Authentication Method:** Client ID + Client Secret (OAuth 2.0 Authorization Code Flow)

### 3.2 Data Retrieval

**No direct API calls** are made to X after initial OAuth. Profile data is retrieved during the OAuth callback and stored in the JWT token.

---

## 4. How X Data is Used in ScholrLink

### 4.1 Primary Use Cases

1. **User Authentication & Session Management**
   - Verify user identity via X OAuth
   - Create JWT token with user profile data
   - Maintain user sessions (30-day expiration)

2. **User Interface Personalization**
   - Display username in navbar: `@{twitterUsername}`
   - Display profile picture in user menu
   - Show Twitter handle in dropdown menu

3. **Wallet Connection Association**
   - Link X account identity to Solana wallet address
   - Enable users to recover accounts via X identity
   - Display creator identity on campaign pages

### 4.2 Data Flow

```
User clicks "Continue with X"
    ↓
Redirected to X OAuth authorization page
    ↓
User authorizes ScholrLink app
    ↓
X redirects back with authorization code
    ↓
Backend exchanges code for access token
    ↓
X returns: user ID, username, profile image URL
    ↓
Data stored in JWT token (client-side)
    ↓
Used to populate session and UI only
```

### 4.3 No Secondary Data Sharing

User X data is:
- ✅ Used only for authentication
- ✅ Stored only in JWT tokens (client-side)
- ✅ Displayed only in the user interface
- ❌ NOT sold or shared with third parties
- ❌ NOT used for analytics or tracking
- ❌ NOT used for advertising or marketing
- ❌ NOT transferred to other services
- ❌ NOT used to train AI or ML models

---

## 5. Data Storage & Security

### 5.1 Where X Data is Stored

| Location | Data Stored | Duration | Security |
|----------|-----------|----------|----------|
| **Client Browser (JWT Token)** | User ID, username, profile image URL | 30 days or until logout | Signed JWT, HttpOnly cookies |
| **Server Session Cache** | Session metadata | Runtime only | In-memory, not persisted |
| **Server Logs** | User ID only (for debugging) | 7 days | Access-restricted server logs |

### 5.2 Security Measures

- **HTTPS Only:** All X API communication uses TLS/SSL encryption
- **JWT Signing:** Tokens are cryptographically signed with `NEXTAUTH_SECRET`
- **No Password Storage:** We store X access tokens temporarily, never passwords
- **CORS Protection:** API endpoints implement CORS headers
- **Rate Limiting:** Standard X OAuth rate limits apply

### 5.3 Data Deletion

- **Session Expiration:** JWT tokens expire after 30 days
- **Sign Out:** Tokens are immediately invalidated on logout
- **No Permanent Storage:** X data is not persisted to database by default
- **User Deletion:** Users can sign out and revoke app access on X at any time

---

## 6. Compliance & Legal Basis

### 6.1 User Rights

Users have the right to:
- **Revoke Access:** Revoke ScholrLink's authorization at [twitter.com/settings/connected_apps](https://twitter.com/settings/connected_apps)
- **Data Portability:** Request X to export their data via X's export tools
- **Deletion:** Request deletion of their account (X data revoked automatically)

### 6.2 GDPR Compliance (if applicable)

- **Legal Basis:** User Consent (explicit OAuth authorization)
- **Data Processing:** Outlined in Terms of Service
- **Data Retention:** 30 days maximum (JWT expiration)
- **Privacy Shield:** OAuth data handled per X's privacy terms

### 6.3 Children's Data Protection

- ✅ No special handling for children's data required
- ✅ Users must be 18+ to use X (enforced by X, not by us)
- ✅ We do not knowingly collect data from users under 13

---

## 7. Configuration & Credentials

### 7.1 Required Environment Variables

```env
# X OAuth credentials (from developer.twitter.com)
TWITTER_CLIENT_ID=your-client-id
TWITTER_CLIENT_SECRET=your-client-secret

# NextAuth configuration
NEXTAUTH_SECRET=generated-secret
NEXTAUTH_URL=http://localhost:3000
```

### 7.2 OAuth App Settings (in X Developer Portal)

- **App Name:** ScholrLink
- **App Type:** Web Application
- **Authentication Flow:** OAuth 2.0 Authorization Code
- **Callback URL:** `https://scholr.link/api/auth/callback/twitter`
- **Requested Scopes:** `users.read` (read user profile data)
- **Data Deletion:** Compliant with X Developer Agreement

---

## 8. Implementation Details

### 8.1 Code Files Handling X Data

| File | Purpose | Data Handled |
|------|---------|-------------|
| `src/auth.ts` | NextAuth configuration | OAuth config, JWT callbacks |
| `src/app/api/auth/[...nextauth]/route.ts` | OAuth route handler | Token exchange |
| `src/components/AuthButton.tsx` | Sign in/out UI | Display profile data |
| `src/app/login/page.tsx` | Login page | Initiate OAuth flow |
| `src/types/next-auth.d.ts` | TypeScript types | Data structures |

### 8.2 Data Access Points

```typescript
// AuthButton.tsx - Display user data
const { data: session } = useSession();
// session.user contains: { id, name, email, image, twitterUsername, twitterImage }

// Auth.ts - Store in token
token.twitterId = twitterProfile.data?.id;
token.twitterUsername = twitterProfile.data?.username;
token.twitterImage = twitterProfile.data?.profile_image_url;
```

---

## 9. Third-Party Libraries Used

- **NextAuth.js v5.0** - Handles OAuth abstraction and JWT management
- **@coral-xyz/anchor** - Solana integration (not related to X API)

**Important:** NextAuth.js handles the actual X API communication securely. We do not make direct HTTP requests to X endpoints.

---

## 10. Data Processing Agreements

### 10.1 With X/Twitter

- ✅ Compliant with X API Terms of Service
- ✅ Using official OAuth 2.0 flow
- ✅ Not scraping or circumventing X services
- ✅ Respecting X's rate limits and terms
- ✅ Not storing tweets or sensitive X data

### 10.2 With Users

- ✅ Transparent about X data usage (this document)
- ✅ Clear consent flow (OAuth authorization)
- ✅ Easy data revocation (sign out)
- ✅ No hidden data collection

---

## 11. Changes & Updates

This declaration is effective as of **December 6, 2025**.

**Future Changes:** Any changes to X data usage will be:
1. Updated in this document
2. Reflected in Privacy Policy
3. Notified to existing users (if material)

**For Questions:** Contact [privacy@scholr.link] or file an issue on GitHub.

---

## 12. Verification & Audit

To verify ScholrLink's X data usage:

1. **Client-side:** Check browser DevTools → Application → Cookies (JWT token)
2. **Source Code:** Review `src/auth.ts` and `src/types/next-auth.d.ts`
3. **API Logs:** No X API data other than user profile in server logs
4. **Network Activity:** Only OAuth endpoints called, no other X APIs

---

## Appendix: Sample JWT Token Structure

```json
{
  "sub": "user-id-12345",
  "id": "12345",
  "twitterId": "12345",
  "twitterUsername": "example_user",
  "twitterImage": "https://pbs.twimg.com/...",
  "email": "user@example.com",
  "name": "Example User",
  "picture": "https://pbs.twimg.com/...",
  "iat": 1701886800,
  "exp": 1704565200,
  "jti": "jwt-id"
}
```

**Note:** This is a sample. Actual structure follows NextAuth.js default format.

---

**Document Prepared By:** Development Team  
**Last Updated:** December 6, 2025  
**Version:** 1.0
