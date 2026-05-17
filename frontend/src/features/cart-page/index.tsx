import { Link } from "react-router-dom";

import { Button, Empty, InputNumber } from "antd";

import useUser from "@/common/users/useUser";
import { formatPrice } from "@/common/utils/format-price";
import { FULL_CATALOG_PAGE_SIZE } from "@/features/book-page/consts/book-query";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/features/cart-page/consts/cart";
import { useFetchBooksQuery } from "@/store/api/books";
import { useCreateOrderMutation } from "@/store/api/orders";
import {
  useFetchUsersQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/store/api/users";

type TCartViewProps = {
  compact?: boolean;
};

export const CartView = ({ compact = false }: TCartViewProps) => {
  const { user } = useUser();
  const { data: booksResponse } = useFetchBooksQuery({
    page: 1,
    perPage: FULL_CATALOG_PAGE_SIZE,
    searchString: "",
    category: [],
  });
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const { refetch: refetchUser } = useFetchUsersQuery();

  const cartItems = user?.cartItems ?? [];
  const booksById = new Map((booksResponse?.data ?? []).map((book) => [book._id, book]));
  const resolvedCartItems = cartItems
    .map((cartItem) => ({
      ...cartItem,
      book: booksById.get(cartItem.bookId),
    }))
    .filter((cartItem) => cartItem.book);
  const totalPriceCents = resolvedCartItems.reduce(
    (total, cartItem) => total + (cartItem.book?.priceCents ?? 0) * cartItem.quantity,
    0,
  );
  const handleCheckout = async () => {
    await createOrder().unwrap();
    await refetchUser();
  };

  if (resolvedCartItems.length === 0) {
    return (
      <section className="rounded-l border border-app-border bg-app-surface p-l shadow-app-s">
        <Empty description="Your cart is empty." />
      </section>
    );
  }

  return (
    <div className="cart-surface flex flex-col gap-s">
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
            <p className="mt-1 mb-0 font-semibold text-app-accent">
              {formatPrice(book?.priceCents ?? 0)}
            </p>
          </div>
          <div className="flex items-center gap-xs">
            <InputNumber
              max={MAX_CART_ITEM_QUANTITY}
              min={MIN_CART_ITEM_QUANTITY}
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
      {!compact && (
        <section className="flex flex-col gap-xs rounded-l border border-app-border bg-app-surface p-s shadow-app-s sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="m-0 text-sm text-app-text-muted">Order total</p>
            <strong className="text-xl text-app-text">{formatPrice(totalPriceCents)}</strong>
          </div>
          <Button loading={isCreatingOrder} onClick={handleCheckout} type="primary">
            Checkout
          </Button>
        </section>
      )}
    </div>
  );
};
