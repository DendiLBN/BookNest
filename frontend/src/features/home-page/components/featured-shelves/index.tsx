import { Link } from "react-router-dom";

import { BookOutlined, StarFilled } from "@ant-design/icons";

import type { TFeaturedShelvesProps } from "@/features/home-page/types";

export const FeaturedShelves = ({ books, hasBooks }: TFeaturedShelvesProps) => (
  <article className="rounded-l border border-app-border bg-app-surface p-4.5 shadow-app-s lg:row-span-2">
    <div className="mb-s flex items-start justify-between gap-xs">
      <div>
        <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Featured shelves</p>
        <h2 className="mt-1 mb-0 text-lg font-bold text-app-text">Worth reading this week</h2>
      </div>
      <BookOutlined className="text-xl text-app-accent" />
    </div>

    <div className="flex flex-col gap-xs">
      {books.length > 0 ? (
        books.map((book) => (
          <Link
            className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-xs rounded-l border border-app-border bg-app-surface-muted p-xs text-inherit no-underline transition hover:border-app-accent hover:bg-app-surface-muted sm:grid-cols-[52px_minmax(0,1fr)_auto]"
            key={book._id}
            to="/book"
          >
            <div className="grid h-16 w-13 place-items-center overflow-hidden rounded-m bg-app-accent-soft text-app-accent">
              {book.coverImageUrl ? (
                <img
                  alt={book.title}
                  className="h-full w-full object-cover"
                  src={book.coverImageUrl}
                />
              ) : (
                <BookOutlined />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="m-0 truncate text-base font-bold text-app-text">{book.title}</h3>
              <p className="m-0 truncate text-app-text-muted">{book.author}</p>
            </div>
            <span className="col-start-2 font-bold text-app-warning sm:col-start-auto">
              <StarFilled /> {book.rate}
            </span>
          </Link>
        ))
      ) : hasBooks ? (
        <p className="m-0 text-app-text-muted">
          No featured titles are available for the current preview.
        </p>
      ) : (
        <p className="m-0 text-app-text-muted">
          Add books to the catalog to start building featured shelves.
        </p>
      )}
    </div>
  </article>
);
