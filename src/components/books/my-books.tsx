"use client";
import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useBooks } from "@/hooks/use-books";
import { api } from "@/lib/api";
import type { Book } from "@/types";
import { errorMessage } from "@/lib/utils";
import { EmptyState, ErrorState, Loading } from "@/components/ui/status";
import { Modal } from "@/components/ui/modal";
import { BookForm } from "./book-form";
export function MyBooks() {
  const { books, loading, error, reload } = useBooks("?mine=true", true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  async function remove() {
    if (!deleting) return;
    setBusy(true);
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE" }, true);
      toast.success("Book removed from the shelf.");
      setDeleting(null);
      await reload();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="container page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE STORIES YOU SHARE</p>
          <h1>My Books</h1>
          <p>Your contributions to our community bookshelf.</p>
        </div>
        <Link className="btn btn-primary" href="/add-book">
          <Plus size={17} /> Add Book
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} retry={reload} />
      ) : !books.length ? (
        <EmptyState
          title="Your shelf starts with one book"
          description="Add a favourite and give someone else their next great read."
        />
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Category</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <Link href={`/books/${book._id}`} className="table-book">
                      <img src={book.image} alt="" />
                      <span>
                        <strong>{book.title}</strong>
                        <small>{book.author}</small>
                      </span>
                    </Link>
                  </td>
                  <td>{book.category}</td>
                  <td>
                    {book.availableCopies} / {book.totalCopies}
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setEditing(book)}
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        className="btn btn-ghost btn-sm delete-button"
                        onClick={() => setDeleting(book)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit your book"
        busy={saving}
      >
        {editing && (
          <BookForm
            key={editing._id}
            book={editing}
            onBusyChange={setSaving}
            onSaved={() => {
              setEditing(null);
              void reload();
            }}
          />
        )}
      </Modal>
      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Remove this book?"
        busy={busy}
      >
        <p>
          <strong>{deleting?.title}</strong> will be removed from the library.
          Books with active borrows must be returned first.
        </p>
        <div className="modal-actions">
          <button
            className="btn btn-outline"
            disabled={busy}
            onClick={() => setDeleting(null)}
          >
            Keep book
          </button>
          <button className="btn btn-error" disabled={busy} onClick={remove}>
            {busy ? "Removing…" : "Delete Book"}
          </button>
        </div>
      </Modal>
    </section>
  );
}
