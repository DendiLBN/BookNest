import { Link } from "react-router-dom";

import { Button, InputNumber } from "antd";

import { formatPrice } from "@/common/utils/format-price";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/features/cart-page/consts/cart";
import type { TResolvedCartItem } from "@/features/cart-page/utils/resolve-cart-items";

type TCartItemCardProps = {
  cartItem: TResolvedCartItem;
  compact: boolean;
  onRemove: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
};

export const CartItemCard = ({
  cartItem,
  compact,
  onRemove,
  onUpdateQuantity,
}: TCartItemCardProps) => {
  const { book, bookId, quantity } = cartItem;

  return (
    <article
      className={`grid gap-s rounded-l border border-app-border bg-app-surface p-s shadow-app-s ${
        compact ? "" : "sm:grid-cols-[72px_minmax(0,1fr)_auto]"
      }`}
    >
      <img
        alt={book.title}
        className="aspect-2/3 w-full rounded-m object-cover"
        src={book.coverImageUrl || "/book.png"}
      />
      <div>
        <Link className="font-bold text-app-text no-underline" to={`/book/${bookId}`}>
          {book.title}
        </Link>
        <p className="mt-1 mb-0 text-app-text-muted">{book.author}</p>
        <p className="mt-1 mb-0 font-semibold text-app-accent">{formatPrice(book.priceCents)}</p>
      </div>
      <div className="flex items-center gap-xs">
        <InputNumber
          max={MAX_CART_ITEM_QUANTITY}
          min={MIN_CART_ITEM_QUANTITY}
          onChange={(value) =>
            onUpdateQuantity(bookId, typeof value === "number" ? value : quantity)
          }
          value={quantity}
        />
        <Button danger onClick={() => onRemove(bookId)}>
          Remove
        </Button>
      </div>
    </article>
  );
};
