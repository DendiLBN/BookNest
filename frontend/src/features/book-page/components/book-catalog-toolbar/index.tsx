import type { Key } from "react";

import { DeleteBooksButton } from "@/features/book-page/components/delete-button";
import { BookSearch } from "@/features/book-page/components/filters/book-search";
import { CategorySelect } from "@/features/book-page/components/filters/category-select";
import { PriceFilters } from "@/features/book-page/components/filters/price-filters";

type TBookCatalogToolbarProps = {
  bookSearchText: string;
  isAdmin: boolean;
  isFetching: boolean;
  maxPriceCents?: number;
  minPriceCents?: number;
  selectedBookRowKeys: Key[];
  selectedCategories: string[];
  sortBy?: "priceAsc" | "priceDesc";
  handleDeleteArray: () => Promise<void>;
  setBookSearchText: (value: string) => void;
  setMaxPriceCents: (value?: number) => void;
  setMinPriceCents: (value?: number) => void;
  setSelectedCategories: (value: string[]) => void;
  setSortBy: (value?: "priceAsc" | "priceDesc") => void;
};

export const BookCatalogToolbar = ({
  bookSearchText,
  handleDeleteArray,
  isAdmin,
  isFetching,
  maxPriceCents,
  minPriceCents,
  selectedBookRowKeys,
  selectedCategories,
  sortBy,
  setBookSearchText,
  setMaxPriceCents,
  setMinPriceCents,
  setSelectedCategories,
  setSortBy,
}: TBookCatalogToolbarProps) => (
  <section className="flex flex-col items-start gap-xs rounded-m border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s text-app-text shadow-app-s md:flex-row">
    <BookSearch bookSearchText={bookSearchText} onSearch={setBookSearchText} />
    <CategorySelect
      selectedCategories={selectedCategories}
      onChangeCategories={setSelectedCategories}
    />
    <PriceFilters
      maxPriceCents={maxPriceCents}
      minPriceCents={minPriceCents}
      sortBy={sortBy}
      onChangeMaxPrice={setMaxPriceCents}
      onChangeMinPrice={setMinPriceCents}
      onChangeSort={setSortBy}
    />
    {isAdmin ? (
      <div className="w-full md:ml-auto md:w-auto">
        <DeleteBooksButton
          selectedBookRowKeys={selectedBookRowKeys}
          loading={isFetching}
          onDelete={handleDeleteArray}
        />
      </div>
    ) : null}
  </section>
);
