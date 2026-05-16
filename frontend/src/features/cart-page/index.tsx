import { Link } from "react-router-dom";

import { Button, Empty, InputNumber } from "antd";

import useUser from "@/common/users/useUser";
import { useFetchBooksQuery } from "@/store/api/books";
import { useRemoveCartItemMutation, useUpdateCartItemMutation } from "@/store/api/users";

type TCartViewProps = {
  compact?: boolean;
};

export const CartView = ({ compact = false }: TCartViewProps) => {
  const { user } = useUser();
  const { data: booksResponse } = useFetchBooksQuery({
    page: 1,
    perPage: 100,
    searchString: "",
    category: [],
  });
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const cartItems = user?.cartItems ?? [];
  const booksById = new Map((booksResponse?.data ?? []).map((book) => [book._id, book]));
  const resolvedCartItems = cartItems
    .map((cartItem) => ({
      ...cartItem,
      book: booksById.get(cartItem.bookId),
    }))
    .filter((cartItem) => cartItem.book);

  if (resolvedCartItems.length === 0) {
    return (
      <section className="rounded-l border border-app-border bg-app-surface p-l shadow-app-s">
        <Empty description="Your cart is empty." />
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-s">
      {resolvedCartItems.map(({ bookId, quantity, book }) => (
        <article
          className={`grid gap-s rounded-l border border-app-border bg-app-surface p-s shadow-app-s ${
            compact ? "" : "sm:grid-cols-[72px_minmax(0,1fr)_auto]"
          }`}
          key={bookId}
        >
          <img
            alt={book?.title}
            className="aspect-2/3 w-full rounded-m object-cover"
            src={book?.coverImageUrl || "/book.png"}
          />
          <div>
            <Link className="font-bold text-app-text no-underline" to={`/book/${bookId}`}>
              {book?.title}
            </Link>
            <p className="mt-1 mb-0 text-app-text-muted">{book?.author}</p>
          </div>
          <div className="flex items-center gap-xs">
            <InputNumber
              max={99}
              min={1}
              onChange={(value) =>
                updateCartItem({
                  bookId,
                  quantity: typeof value === "number" ? value : quantity,
                })
              }
              value={quantity}
            />
            <Button danger onClick={() => removeCartItem(bookId)}>
              Remove
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};
