import type { TBook } from "@/features/book-page/types";
import type { TCartItem } from "@/features/users/types";

export type TResolvedCartItem = TCartItem & {
  book: TBook;
};

export const resolveCartItems = ({
  books,
  cartItems,
}: {
  books: TBook[];
  cartItems: TCartItem[];
}): TResolvedCartItem[] => {
  const booksById = new Map(books.map((book) => [book._id, book]));

  return cartItems
    .map((cartItem) => ({
      ...cartItem,
      book: booksById.get(cartItem.bookId),
    }))
    .filter((cartItem): cartItem is TResolvedCartItem => Boolean(cartItem.book));
};
