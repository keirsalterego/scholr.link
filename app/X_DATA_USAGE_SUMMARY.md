# X (Twitter) Data Protection Summary

## Quick Answer

**What X data does ScholrLink collect?**
- User ID
- Username (@handle)
- Profile image URL
- Name (optional)
- Email (optional)

**For what purpose?**
- User authentication only
- Session management (30-day expiration)
- UI personalization (display username and avatar)

**How long is it stored?**
- 30 days maximum (JWT token expiration)
- Deleted immediately on logout

**Is it shared with anyone?**
- No. It's used only within ScholrLink.

**Can users delete it?**
- Yes. Users can sign out or revoke access on X's app permissions page.

---

## Key Points for Compliance

✅ **Authentication Only** - Not for analytics, advertising, or tracking

✅ **Minimal Data** - Only profile info needed for authentication

✅ **No Persistence** - Data not stored in database, only in JWT tokens

✅ **User Control** - Easy to sign out or revoke access

✅ **Secure** - OAuth 2.0 with JWT signing and HTTPS

✅ **Transparent** - This declaration explains everything

---

## For X Developer Portal

When X asks "Describe all of your use cases of X's data and API":

**Answer:**
"ScholrLink uses the X OAuth 2.0 API exclusively for user authentication. During the OAuth flow, we retrieve the user's ID, username, profile image URL, and name. This data is used only to authenticate users, manage sessions, and personalize the user interface (displaying their username and avatar). 

The data is stored temporarily in JWT tokens with a 30-day expiration and is deleted when users sign out. We do not use X data for analytics, advertising, marketing, or any other purpose. The data is not shared with third parties and is not persisted to a database. Users can revoke access at any time through X's app permissions settings."

---

## Related Files

- **Full Declaration:** `X_DATA_USAGE_DECLARATION.md`
- **Auth Setup:** `AUTH_SETUP.md`
- **Auth Fix Summary:** `AUTH_FIX_SUMMARY.md`
- **Quick Start:** `QUICK_START_AUTH.md`

---

## Document Location

This summary is at: `/home/keirsalterego/scholr.link/app/X_DATA_USAGE_SUMMARY.md`
