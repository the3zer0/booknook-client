import Link from "next/link";
import { BookOpen } from "lucide-react";
export default function NotFound() {
  return (
    <section className="container not-found">
      <BookOpen size={52} strokeWidth={1.2} />
      <p className="eyebrow">404 · A MISSING CHAPTER</p>
      <h1>This page wandered off.</h1>
      <p>Let’s get you back to a shelf full of good stories.</p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </section>
  );
}
