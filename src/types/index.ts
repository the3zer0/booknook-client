export const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
] as const;
export type Category = (typeof categories)[number];
export type Book = {
  _id: string;
  title: string;
  author: string;
  category: Category;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  userId?: string;
  userName: string;
  userEmail?: string;
  createdAt: string;
};
export type BookInput = Pick<
  Book,
  "title" | "author" | "category" | "image" | "description" | "totalCopies"
>;
export type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};
