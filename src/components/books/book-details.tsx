"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth/client";
import type { Book } from "@/types";
import { errorMessage } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { ErrorState, Loading } from "@/components/ui/status";
export function BookDetails({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { data: session } = authClient.useSession();
  useEffect(() => {
    let active = true;
    setError("");
    api<Book>(`/books/${id}`, {}, true)
      .then((data) => {
        if (active) setBook(data);
      })
      .catch((err) => {
        if (active) setError(errorMessage(err));
      });
    return () => {
      active = false;
    };
  }, [id, attempt]);
  async function borrow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!book) return;
    setBusy(true);
    try {
      await api(
        "/borrows",
        { method: "POST", body: JSON.stringify({ bookId: id }) },
        true,
      );
      setBook({ ...book, availableCopies: book.availableCopies - 1 });
      setOpen(false);
      toast.success("Book borrowed. Enjoy your next chapter!");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  if (error)
    return <ErrorState message={error} retry={() => setAttempt(attempt + 1)} />;
  if (!book) return <Loading />;
  return (
    <section className="container page-section">
      <Link className="back-link" href="/books">
        <ArrowLeft size={16} /> Back to the shelf
      </Link>
      <div className="book-detail-grid">
        <div className="detail-cover">
          <img
            src={book.image}
            alt={`${book.title} cover`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/covers/fallback.svg";
            }}
          />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{book.category}</p>
          <h1>{book.title}</h1>
          <p className="detail-author">by {book.author}</p>
          <div className="detail-description">{book.description}</div>
          <div className="detail-facts">
            <p>
              <BookOpen size={18} /> {book.availableCopies} of{" "}
              {book.totalCopies} copies available
            </p>
            <p>
              <CalendarDays size={18} /> Borrow for 7 days
            </p>
          </div>
          <button
            className="btn btn-primary"
            disabled={book.availableCopies === 0}
            onClick={() => setOpen(true)}
          >
            {book.availableCopies ? "Borrow This Book" : "Not Available"}
          </button>
          <p className="added-by">
            Added to the shelf by <strong>{book.userName}</strong>
          </p>
        </div>
      </div>
      <Modal
        title="One book. A new adventure."
        open={open}
        onClose={() => setOpen(false)}
        busy={busy}
      >
        <p>
          Borrow <strong>{book.title}</strong> for 7 days. You can return it
          any time from My Borrows.
        </p>
        <form onSubmit={borrow} className="form-stack">
          <label className="field">
            Your name
            <input
              className="input"
              readOnly
              value={session?.user.name || ""}
            />
          </label>
          <label className="field">
            Your email
            <input
              className="input"
              readOnly
              value={session?.user.email || ""}
            />
          </label>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "Confirming…" : "Confirm Borrow"}
          </button>
        </form>
      </Modal>
    </section>
  );
}
