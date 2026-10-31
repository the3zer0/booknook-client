import { BookForm } from "@/components/books/book-form";
export const metadata = { title: "Add Book" };
export default function AddBookPage() {
  return (
    <section className="container page-section narrow">
      <div className="page-heading">
        <p className="eyebrow">A GOOD BOOK DESERVES COMPANY</p>
        <h1>Share a book.</h1>
        <p>
          Add a favourite to the shelf. Help someone find their next great read.
        </p>
      </div>
      <BookForm />
    </section>
  );
}
