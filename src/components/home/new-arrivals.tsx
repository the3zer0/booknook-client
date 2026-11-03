"use client";
import { site } from "@/config/site";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useBooks } from "@/hooks/use-books";
import { BookCard } from "@/components/books/book-card";
import { EmptyState, ErrorState, Loading } from "@/components/ui/status";
export function NewArrivals() {
  const { books, error, loading, reload } = useBooks(`?limit=${site.latestBooks}`);
  return (
    <section className="section container" id="new-arrivals">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FRESH ON THE SHELF</p>
          <h2>Meet your next read.</h2>
        </div>
        <p>
          New stories. New perspectives.
          <br />
          Recently added by our readers.
        </p>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} retry={reload} />
      ) : books.length ? (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="A new shelf, ready for stories"
          description="Be the first to add a book to the library."
        />
      )}
      <div className="section-action">
        <Link href="/books" className="btn btn-outline">
          See All Books <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
