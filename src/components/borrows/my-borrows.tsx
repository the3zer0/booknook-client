"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Borrow } from "@/lib/types";
import { errorMessage, formatDate } from "@/lib/utils";
import { EmptyState, ErrorState, Loading } from "@/components/ui/status";
import { Modal } from "@/components/ui/modal";
export function MyBorrows() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returning, setReturning] = useState<Borrow | null>(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setBorrows(await api<Borrow[]>("/borrows", {}, true));
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  async function returnBook() {
    if (!returning) return;
    setBusy(true);
    try {
      await api(`/borrows/${returning._id}`, { method: "DELETE" }, true);
      setBorrows((items) => items.filter((item) => item._id !== returning._id));
      setReturning(null);
      toast.success("Book returned. Thanks for keeping the story moving.");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="container page-section">
      <div className="page-heading">
        <p className="eyebrow">YOUR CURRENT CHAPTERS</p>
        <h1>My Borrows</h1>
        <p>Enjoy the read. Bring it back when you’re done.</p>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={error} retry={load} />
      ) : !borrows.length ? (
        <>
          <EmptyState
            title="Ready for your next chapter?"
            description="Books you borrow will appear here, along with their return dates."
          />
          <div className="section-action">
            <Link className="btn btn-primary" href="/books">
              Browse Books
            </Link>
          </div>
        </>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Borrowed</th>
                <th>Return by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td>
                    <Link
                      className="table-book"
                      href={`/books/${borrow.bookId}`}
                    >
                      <img src={borrow.bookImage} alt="" />
                      <strong>{borrow.bookTitle}</strong>
                    </Link>
                  </td>
                  <td>{formatDate(borrow.borrowDate)}</td>
                  <td>
                    {formatDate(borrow.returnDate)}
                    {new Date(borrow.returnDate).getTime() < Date.now() && (
                      <span className="overdue">Overdue</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setReturning(borrow)}
                    >
                      <RotateCcw size={15} /> Return Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        open={!!returning}
        onClose={() => setReturning(null)}
        title="Ready to pass it on?"
        busy={busy}
      >
        <p>
          Return <strong>{returning?.bookTitle}</strong> and make its copy
          available to another reader.
        </p>
        <div className="modal-actions">
          <button
            className="btn btn-outline"
            disabled={busy}
            onClick={() => setReturning(null)}
          >
            Keep reading
          </button>
          <button
            className="btn btn-primary"
            disabled={busy}
            onClick={returnBook}
          >
            {busy ? "Returning…" : "Return Book"}
          </button>
        </div>
      </Modal>
    </section>
  );
}
