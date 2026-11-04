"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Book } from "@/types";
export function BookCard({ book }: { book: Book }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article
      className="book-card"
      initial={false}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/books/${book._id}`}
        className="book-art"
        aria-label={`View ${book.title}`}
      >
        <img
          src={book.image}
          alt={`${book.title} book cover`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/covers/fallback.svg";
          }}
        />
        <span
          className={`availability ${book.availableCopies ? "" : "unavailable"}`}
        >
          {book.availableCopies ? "Available" : "On loan"}
        </span>
      </Link>
      <div className="book-info">
        <span className="eyebrow">{book.category}</span>
        <h3>
          <Link href={`/books/${book._id}`}>{book.title}</Link>
        </h3>
        <p>{book.author}</p>
        <Link href={`/books/${book._id}`} className="book-details-link">
          View Details <ArrowUpRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}
