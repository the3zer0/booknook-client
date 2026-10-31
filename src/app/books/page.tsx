import { Suspense } from "react";
import { Catalog } from "@/components/books/catalog";
import { Loading } from "@/components/ui/status";
export const metadata = { title: "All Books" };
export default function BooksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Catalog />
    </Suspense>
  );
}
