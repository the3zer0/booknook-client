# Production setup

1. Create a hosted MongoDB replica set. Give the application a database user with read/write access to its database and allow connections from both hosts. Next.js uses it for Better Auth. Express transactions require a replica set.
2. Import the client repo into a Next.js host such as Vercel, using Node 22, npm ci and npm run build. Obtain the canonical HTTPS origin. Deploy the server separately using its docs/DEPLOYMENT.md.
3. Set NEXT_PUBLIC_API_URL to the public Express origin before building. Set BETTER_AUTH_URL to the canonical client origin without trailing slash; it must match the API JWT_ISSUER. Supply a new strong stable BETTER_AUTH_SECRET, MONGODB_URI, MONGODB_DB and the same JWT_AUDIENCE as Express.
4. Create a Google web application. Register the client origin and its /api/auth/callback/google redirect URI. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET. Ensure the examiner can use the consent configuration. For local testing register localhost:3000 separately.
5. Obtain an imgbb API key and set IMGBB_API_KEY. Put secrets in the host's secret manager or ignored .env.local. Redeploy the client.
6. Add six books or run the server seed with production CLIENT_URL. Open the live client incognito, check six arrivals and public/private direct URLs, use Google login, refresh My Borrows, upload a real JPG/PNG/WebP, edit/delete the new book, borrow and return another, and verify counts. Put the verified live URL in README and submit it with both GitHub links.
