"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { categories, type Book, type BookInput } from "@/lib/types";
import { errorMessage } from "@/lib/utils";

export function BookForm({
  book,
  onSaved,
  onBusyChange,
}: {
  book?: Book;
  onSaved?: () => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    onBusyChange?.(true);
    setError("");
    try {
      let image = book?.image || "";
      const file = form.get("image") as File;
      if (file?.size) {
        if (
          file.size > 5 * 1024 * 1024 ||
          !["image/jpeg", "image/png", "image/webp"].includes(file.type)
        )
          throw new Error("Choose a JPG, PNG or WebP image under 5 MB.");
        const upload = new FormData();
        upload.set("image", file);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: upload,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        image = data.url;
      }
      if (!image) throw new Error("Choose a book cover to upload.");
      const input: BookInput = {
        title: String(form.get("title")).trim(),
        author: String(form.get("author")).trim(),
        category: String(form.get("category")) as BookInput["category"],
        description: String(form.get("description")).trim(),
        totalCopies: Number(form.get("totalCopies")),
        image,
      };
      await api(
        book ? `/books/${book._id}` : "/books",
        { method: book ? "PATCH" : "POST", body: JSON.stringify(input) },
        true,
      );
      toast.success(
        book
          ? "Your book has been updated."
          : "A new story on the shelf. Book added!",
      );
      if (onSaved) onSaved();
      else router.push("/my-books");
    } catch (err) {
      const message = errorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
      onBusyChange?.(false);
    }
  }
  return (
    <form className="form-stack book-form" onSubmit={submit}>
      <div className="form-columns">
        <label className="field">
          Book title
          <input
            className="input"
            name="title"
            required
            maxLength={160}
            defaultValue={book?.title}
            placeholder="The name on the cover"
          />
        </label>
        <label className="field">
          Author name
          <input
            className="input"
            name="author"
            required
            maxLength={120}
            defaultValue={book?.author}
            placeholder="Who wrote it?"
          />
        </label>
        <label className="field">
          Category
          <select
            className="select"
            name="category"
            defaultValue={book?.category || "Fiction"}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Total copies
          <input
            className="input"
            type="number"
            name="totalCopies"
            min={book ? book.totalCopies - book.availableCopies : 1}
            max={10000}
            step={1}
            required
            defaultValue={book?.totalCopies ?? 1}
          />
        </label>
      </div>
      <label className="field">
        Book cover
        <span className="upload-zone">
          <UploadCloud size={27} strokeWidth={1.5} />
          <span>
            {fileName ||
              (book
                ? "Choose a new cover, or keep the existing one"
                : "Choose a cover from your device")}
          </span>
          <small>JPG, PNG or WebP · Up to 5 MB</small>
          <input
            className="file-input"
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            required={!book}
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          />
        </span>
      </label>
      <label className="field">
        Short description
        <textarea
          className="textarea"
          name="description"
          required
          minLength={10}
          maxLength={3000}
          rows={4}
          defaultValue={book?.description}
          placeholder="What makes this book worth picking up?"
        />
      </label>
      <div className="form-columns">
        <label className="field">
          Your name
          <input className="input" readOnly value={session?.user.name || ""} />
        </label>
        <label className="field">
          Your email
          <input className="input" readOnly value={session?.user.email || ""} />
        </label>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary form-submit" disabled={busy}>
        {busy ? (
          <>
            <span className="loading loading-spinner loading-sm" /> Saving your
            book…
          </>
        ) : (
          <>
            {book ? "Save changes" : "Add Book"}
            <ArrowUpRight size={17} />
          </>
        )}
      </button>
    </form>
  );
}
