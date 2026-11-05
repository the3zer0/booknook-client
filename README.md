# BookNook

### Your community bookshelf

A small online library for discovering stories, sharing books and passing each read to another person. BookNook pairs a calm, book-inspired interface with a full lending workflow.

[**Open the live library →**](https://booknook-client-os8h.vercel.app/) · [Server API](https://booknook-api-8xuw.onrender.com) · [Server repository](https://github.com/the3zer0/booknook-server)

---

## The reading experience

- Browse a responsive catalog by title, author or category, with the six newest books featured on the home page.
- Sign in with email or Google and return to the page you originally wanted to visit.
- Add books with uploaded covers, then edit and manage your own shelf.
- Borrow an available copy for seven days, track its due date and return it when you finish.
- Keep book availability accurate and prevent duplicate active borrows.
- Switch between light and dark themes on phone, tablet and desktop.

## Built with

Next.js App Router · React · TypeScript · Tailwind CSS · DaisyUI · Better Auth · MongoDB · Express · Swiper · Framer Motion

## Run locally

Use Node.js 22 or later. Clone the client and server repositories into sibling folders named `booknook-client` and `booknook-server`, then install each repository's locked dependencies with `npm ci`.

Start the local MongoDB replica set from the server folder:

```bash
npm run db:local
```

In a second server terminal, seed the sample catalog once and start the API:

```bash
npm run seed
npm start
```

Configure the client using the names in `.env.example`, then start Next.js:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Keep credentials in local environment files or your hosting provider's secret settings; never commit them.

## Project links

- [Client source](https://github.com/the3zer0/booknook-client)
- [Express API source](https://github.com/the3zer0/booknook-server)
- [Live website](https://booknook-client-os8h.vercel.app/)
- [Deployment guide](docs/DEPLOYMENT.md)
