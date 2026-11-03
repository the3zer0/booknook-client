# Pataghor / BookNook architecture

Next.js owns the session cookie and rendering. Express owns books and active loans. Both repositories deploy separately and use the configured MongoDB database.

| Client directory | Responsibility |
|---|---|
| src/app | Public pages, private route group, error/loading/404, shared layout |
| src/app/api | Better Auth catch-all and authenticated image upload |
| src/components/{layout,home,auth,books,borrows,ui} | Existing feature views and reusable controls |
| src/hooks | Catalog data loading, cancellation, errors and refresh |
| src/lib/api | Fetch wrapper and authenticated bearer requests |
| src/lib/auth | React session client and server-only Better Auth configuration |
| src/lib/validations | Password policy used on the server and in the registration form |
| src/types and src/config | Book/loan types, categories, site identity and arrival count |
| public/covers and src/app/globals.css | Original artwork, themes, spacing and responsive styles |

On a private page the layout waits for session resolution, then redirects guests with the requested path. Better Auth issues a short-lived JWT for Express. Express verifies the signature with public keys from the client JWKS endpoint, validates issuer, audience and expiry and obtains ownership from the verified subject.

Express src/routes groups eight business endpoints. Controllers access MongoDB through the injected database connection. Validation and HTTP errors live in validations and utils. MongoDB sorts catalog rows by creation time; Home requests six. Public rows omit internal owner IDs and email addresses. Conditional stock updates and unique active-loan keys protect the last copy and prevent double borrowing. Transactional return removes the loan and restores the copy together. An owner cannot remove a title with active loans or reduce total stock below the outstanding count.
