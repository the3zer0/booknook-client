# Assignment verification â€” 2026-11-04

## Completed
- Next.js App Router + TypeScript + DaisyUI; Express + MongoDB; Better Auth MongoDB adapter and JWT.
- Separate client/server repositories and published live URLs.
- Navbar, footer, private navigation, profile, logout-to-home.
- Three Swiper slides, newest six database books, two extra sections.
- Real published titles and cover images; source ISBNs in cover-sources.md.
- Reading Room styling, theme toggle, reduced-motion-aware animation.
- Book details redirect guests to login and preserve the destination (verified live).
- Add/edit/delete, owner-specific lists, borrow/return implementation.
- Stock decrement/increment, unavailable stock handling, duplicate-borrow prevention and JWT validation.
- Production build and TypeScript check pass; 12 backend tests pass.
- Six cover images load successfully in the live browser; mobile page has no horizontal overflow in the tested viewport.
- Footer sample email clearly marked as a demo, with real GitHub Issues support link.

## Video interpretation
- The video demonstrates published books, but does not explicitly prohibit illustrative covers.
- Six latest books meets the requirement; matching the demo's exact grid/design is unnecessary.
- Dark/light theme and animation are optional enhancements.
- Guest details must redirect to login, although the demo briefly shows a login message.
- User identity fields should be readonly; logout from private pages returns home.
- The late-video browser demonstration checks public access, not only theme differences.

## Production acceptance
- Email registration initially returned HTTP 500; Atlas network access was corrected with explicit user approval.
- User explicitly approved 0.0.0.0/0 for the assignment Atlas project so Vercel dynamic outbound connections can reach MongoDB. Database authentication remains required.
- LIVE PASSED: register, email login, session retrieval, JWT issuance, imgbb upload, add book, My Books, edit, borrow to zero stock, duplicate borrow rejection, My Borrows, return restoring stock, delete and logout. Temporary test book and borrow were removed.
- LIVE BROWSER PASSED: registration redirects to login; email login returns to the requested book; private detail refresh keeps the session; borrow modal and My Borrows return workflow succeed; logout from My Borrows returns home.
- BLOCKER: Google OAuth initiation succeeds but Google returns redirect_uri_mismatch. Add https://booknook-client-os8h.vercel.app/api/auth/callback/google to the existing Google OAuth web client’s Authorized redirect URIs and https://booknook-client-os8h.vercel.app to Authorized JavaScript origins. The connected browser account has no access to the existing project; user must save this setting, then retest Google login.
- Test books/borrows and both temporary QA accounts were removed after testing.
