import Link from "next/link";
import { BookOpen, ArrowUpRight, MessageCircle } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <BookOpen size={24} />
              Pataghor.
            </Link>
            <p>
              A little space for your next chapter.
              <br />
              Add a book. Borrow a book. Pass it on.
            </p>
          </div>
          <div>
            <h3>On the shelf</h3>
            <Link href="/books">Explore all books</Link>
            <Link href="/books?category=Fiction">Fiction</Link>
            <Link href="/books?category=Science">Science</Link>
          </div>
          <div>
            <h3>Your library</h3>
            <Link href="/add-book">Share a book</Link>
            <Link href="/my-borrows">My borrows</Link>
            <Link href="/register">Become a reader</Link>
          </div>
          <div>
            <h3>Say hello</h3>
            <a
              href="https://github.com/the3zer0/booknook-client/issues"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={14} /> Contact the library
            </a>
            <a
              href="https://github.com/the3zer0/booknook-client"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              X <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Pataghor. All rights reserved.
          </span>
          <span>Good books deserve to be shared.</span>
        </div>
      </div>
    </footer>
  );
}
