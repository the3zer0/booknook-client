# Pataghor

Pataghor is a community lending library built with Next.js App Router, TypeScript, DaisyUI, BetterAuth and MongoDB.

- Discover the latest six additions or browse all books by category, title and author.
- Register with email, sign in and resume the book page you originally opened.
- Share books with covers and manage titles, descriptions and copy counts on your own shelf.
- Borrow available books for fourteen days and see their due dates in My Borrows.
- Return a book to release its copy for another reader.
- Switch between light and dark themes on desktop and mobile.

## Run locally

Clone the client and server into sibling folders named booknook-client and booknook-server. Use Node 22 or later and run npm ci in both folders. In the server folder, run npm run db:local and leave it running. It creates the database configuration and a random local auth secret on first use. In another server terminal run npm run seed once, then npm start. In the client folder run npm run dev.

Open [Pataghor locally](http://localhost:3000). The public deployment URL is pending.

[Server repository](https://github.com/the3zer0/booknook-server) · [Project handoff](HANDOFF.md)
