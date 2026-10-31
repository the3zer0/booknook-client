"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { categories } from "@/lib/types";
import { useBooks } from "@/hooks/use-books";
import { BookCard } from "./book-card";
import { EmptyState, ErrorState, Loading } from "@/components/ui/status";
export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") || "All";
  const { books, error, loading, reload } = useBooks(
    category === "All" ? "" : `?category=${encodeURIComponent(category)}`,
  );
  const [search, setSearch] = useState("");
  const filtered = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  return (
    <section className="container page-section">
      <div className="page-heading">
        <p className="eyebrow">THE COMMUNITY BOOKSHELF</p>
        <h1>A good read is closer than you think.</h1>
        <p>
          Browse the collection. Follow a curiosity. Find your next chapter.
        </p>
      </div>
      <div className="catalog-toolbar">
        <div className="category-tabs" aria-label="Filter by category">
          {["All", ...categories].map((value) => (
            <button
              key={value}
              className={category === value ? "selected" : ""}
              aria-pressed={category === value}
              onClick={() =>
                router.replace(
                  value === "All" ? "/books" : `/books?category=${value}`,
                  { scroll: false },
                )
              }
            >
              {value}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search titles or authors"
            placeholder="Title or author…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} retry={reload} />
      ) : filtered.length ? (
        <>
          <p className="results-count">
            {filtered.length} {filtered.length === 1 ? "book" : "books"} to
            explore
          </p>
          <div className="book-grid">
            {filtered.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title={
            search ? "No matching books" : "This shelf is waiting for stories"
          }
          description={
            search
              ? "Try another title or author."
              : "Try a different category, or add a book of your own."
          }
        />
      )}
    </section>
  );
}
