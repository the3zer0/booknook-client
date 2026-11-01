# Pataghor handoff

The selected brand is Pataghor and the selected design is Open Shelf. The assignment sheet names BookNook. Keep the user's chosen branding. The repository names remain booknook-client and booknook-server.

## Completed locally

Next.js App Router, DaisyUI, shared navigation/footer, responsive Home with three Swiper slides, MongoDB latest-six shelf, category browsing, title/author search, and two static sections. Auth includes email registration, password rules, email login, protected pages with return destinations, profile, session persistence and logout. The Google provider and authenticated imgbb upload handler are implemented and await service keys.

Book create/edit/delete and confirmation dialogs, private book details, borrow/return, available copy counts, and owner-only management are implemented. Express has the eight required routes. Borrow/return use MongoDB transactions and a unique active-borrow index. The chosen loan duration is 14 days. Local database setup and an idempotent six-book seed are in the server scripts.

## Verification

Browser checks covered registration, email login, private book details, borrowing, return, session persistence after refreshing My Borrows, and guest redirection with the book URL preserved. Six covers loaded from the database catalog. Mobile and desktop Home were inspected. The production build and server tests passed. The tests include contention for the last copy, duplicate borrowing, double return, ownership and validation.

## Next steps for submission

1. Configure an imgbb API key in the client environment and test creating a book from a real cover file, then edit and delete that book in the UI.
2. Configure Google OAuth client ID and secret. Register the callback URL ending in /api/auth/callback/google for the actual client origin. Verify sign-in and return navigation.
3. Connect a hosted MongoDB replica set and deploy the Express server and Next.js client. Use the .env.example files in both repositories. Set the public API URL before building the client. Set the client origin, JWT issuer and audience consistently.
4. Verify production signup, private route reload, ownership, loan and return. Add the verified live URL to the client README and submit both GitHub links and the live URL.
5. At the end of every work session update this handoff and tell the user what was completed, what was tested and what remains. Keep actual keys only in ignored local env files or the host secret manager.

To resume in a new chat, share both repository links and ask the assistant to read HANDOFF.md and continue with the first open step.
