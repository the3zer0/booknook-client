# Assignment checklist

Evidence is local unless stated otherwise. Static checks are identified separately from browser and database checks.

| Requirement | Status | Implementation and evidence |
|---|---|---|
| Brand, public/private navbar, avatar, account menu, guest controls | Implemented and verified | src/components/layout/header.tsx; markup inspection, authenticated logout and mobile guest controls |
| Shared footer, contact, social links and X logo | Implemented and verified | src/app/layout.tsx and src/components/layout/footer.tsx; source inspection |
| Three Swiper slides, title, description and Browse Books links | Implemented and verified | src/components/home/hero.tsx; data and targets inspected |
| Latest six, descending sort, card fields and See All Books | Implemented and verified | src/components/home/new-arrivals.tsx, src/components/books/book-card.tsx and server books.controller.js; six browser cards and sort/limit integration test |
| Two static sections | Implemented and verified | src/components/home/extra-sections.tsx; borrowing guide and topic links |
| Better Auth, MongoDB adapter, registration, password rules, email login and toasts | Implemented and verified | src/lib/auth/server.ts, src/lib/validations/password.ts, src/components/auth/auth-form.tsx; invalid password and successful registration/login |
| Google OAuth | Requires external configuration | src/lib/auth/server.ts and auth-form.tsx; provider credentials absent |
| Guest redirect, intended route, private reload, profile and logout | Implemented and verified | src/components/auth/protected.tsx, profile.tsx and layout/header.tsx; profile inspected, redirect/refresh/logout exercised |
| Password reset and email verification intentionally disabled | Implemented and verified | src/lib/auth/server.ts and auth-form.tsx; configuration and reset notice inspected |
| Add form, allowed categories, title, author, copy count, description, file input and read-only identity | Implemented and verified | src/components/books/book-form.tsx and src/types/index.ts; browser form submission with fixture cover |
| Real hosted cover upload | Requires external configuration | src/app/api/upload/route.ts; missing-key 503 checked, provider success unverified |
| Public three-column desktop catalog and private details | Implemented and verified | src/components/books/catalog.tsx, book-details.tsx and src/app/globals.css; grid inspected and private details exercised |
| Own-book create/edit/delete, prefilled form, confirmation, cancellation and UI updates | Implemented and verified | src/components/books/my-books.tsx and book-form.tsx; real API/database writes, only upload response substituted |
| Borrow modal, reader identity, loan dates, My Borrows table, return | Implemented and verified | src/components/books/book-details.tsx and src/components/borrows/my-borrows.tsx; browser round trip |
| Seven days, atomic stock, zero copies and duplicate prevention | Implemented and verified | server src/controllers/borrows.controller.js, src/database/connection.js and src/validations/common.js; replica-set contention, repeat returns and zero-stock button |
| Eight Express routes, JWT and ownership | Implemented and verified | server src/routes, src/middleware/auth.js and test; signed-token rejection, forbidden mutations and guarded lists |
| Loading, empty/error, route titles, 404, custom notifications | Implemented and verified | src/app and src/components/ui; metadata and states inspected, 404/Back to Home exercised |
| Responsive design and optional theme switch | Implemented and verified | src/app/globals.css and src/components/layout/header.tsx; Home overflow and navbar bounds checked at 320/375/768/1024/1440; theme switched both ways |
| Optional Framer Motion/AOS | Missing | No optional animation library; approved CSS and Swiper motion retained |
| Separate repos, commit minimums and meaningful README with five features | Implemented and verified | Both Git histories and README files |
| Verified live URL in client README | Missing | README.md currently provides local run instructions |
| Hosted client/API and incognito production verification | Requires external configuration | docs/DEPLOYMENT.md; hosted DB, provider credentials and production origins needed |
