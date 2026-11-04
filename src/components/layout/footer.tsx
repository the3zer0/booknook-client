import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <img src="/booknook-logo.svg" alt="" width={36} height={36} />
              BookNook
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
            <a
              href="https://twitter.com/intent/tweet?text=Explore%20BookNook%2C%20a%20community%20lending%20library"
              aria-label="Share BookNook on X"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.299l13.312 17.403Z" />
              </svg>{" "}
              Share on X
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </span>
          <span>Good books deserve to be shared.</span>
        </div>
      </div>
    </footer>
  );
}
