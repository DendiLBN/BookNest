import { Link } from "react-router-dom";

import { HeartFilled, HeartOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { Button } from "antd";

import { formatPrice } from "@/common/utils/format-price";
import type { TBook } from "@/features/book-page/types";

type TBookCatalogGridProps = {
  books: TBook[];
  favoriteBookIds: string[];
  favoriteCooldownBookIds: string[];
  favoriteActionLoading: boolean;
  cartActionLoading: boolean;
  onToggleFavorite: (bookId: string) => void;
  onAddToCart: (bookId: string) => void;
};

export const BookCatalogGrid = ({
  books,
  cartActionLoading,
  favoriteCooldownBookIds,
  favoriteBookIds,
  favoriteActionLoading,
  onAddToCart,
  onToggleFavorite,
}: TBookCatalogGridProps) => (
  <section className="grid gap-s sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
    {books.map((book) => {
      const isFavorite = favoriteBookIds.includes(book._id);

      return (
        <article
          className="flex min-h-full flex-col overflow-hidden rounded-l border border-app-border bg-app-surface shadow-app-s"
          key={book._id}
        >
          <Link className="block bg-app-surface-muted" to={`/book/${book._id}`}>
            <img
              alt={book.title}
              className="aspect-2/3 w-full object-cover"
              src={book.coverImageUrl || "/book.png"}
            />
          </Link>
          <div className="flex flex-1 flex-col gap-xs p-s">
            <div>
              <h2 className="m-0 text-lg font-bold text-app-text">{book.title}</h2>
              <p className="mt-1 mb-0 text-app-text-muted">{book.author}</p>
              <p className="mt-1 mb-0 font-semibold text-app-accent">
                {formatPrice(book.priceCents)}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {book.category.map((category) => (
                <span
                  className="rounded-full bg-app-surface-muted px-2 py-1 text-xs font-semibold text-app-text-muted"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-xs">
              <span className="font-bold text-app-warning">
                <StarFilled /> {book.rate}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  aria-label="Add to cart"
                  disabled={cartActionLoading}
                  icon={<ShoppingCartOutlined />}
                  onClick={() => onAddToCart(book._id)}
                />
                <Button
                  aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
                  disabled={favoriteActionLoading || favoriteCooldownBookIds.includes(book._id)}
                  icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => onToggleFavorite(book._id)}
                />
              </div>
            </div>
          </div>
        </article>
      );
    })}
  </section>
);
