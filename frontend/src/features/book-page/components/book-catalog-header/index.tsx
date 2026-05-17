import type { Key } from "react";

import type { TBook } from "@/features/book-page/types";

type TBookCatalogHeaderProps = {
  bookList: TBook[];
  favoriteBookIds: string[];
  isAdmin: boolean;
  selectedBookRowKeys: Key[];
};

export const BookCatalogHeader = ({
  bookList,
  favoriteBookIds,
  isAdmin,
  selectedBookRowKeys,
}: TBookCatalogHeaderProps) => (
  <section className="relative grid overflow-hidden rounded-m border border-app-border bg-[linear-gradient(135deg,var(--color-brand-soft),var(--color-accent-soft))] p-sm text-app-text shadow-app-m md:grid-cols-[minmax(0,1fr)_auto] md:p-l">
    <div>
      <p className="mb-1 text-xs font-bold text-app-brand uppercase">Book catalog</p>
      <h1 className="m-0 text-[1.55rem] leading-tight font-bold">Manage library inventory</h1>
      <p className="mt-xs mb-0 max-w-160 leading-6 text-app-text-muted">
        Search, filter, review ratings, and prepare selected books for bulk actions.
      </p>
    </div>
    <div className="mt-sm grid grid-cols-2 gap-xs self-stretch md:mt-0">
      <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
        <span className="text-xl font-bold text-app-brand">{bookList.length}</span>
        <p className="m-0 text-app-text-muted">Visible books</p>
      </div>
      <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
        <span className="text-xl font-bold text-app-brand">
          {isAdmin ? selectedBookRowKeys.length : favoriteBookIds.length}
        </span>
        <p className="m-0 text-app-text-muted">{isAdmin ? "Selected" : "Favorites"}</p>
      </div>
    </div>
  </section>
);
