import type { Key } from "react";

import { DeleteBooksButton } from "@/features/book-page/components/delete-button";
import { BookSearch } from "@/features/book-page/components/filters/book-search";
import { CategorySelect } from "@/features/book-page/components/filters/category-select";

type TBookCatalogToolbarProps = {
  bookSearchText: string;
  isAdmin: boolean;
  isFetching: boolean;
  selectedBookRowKeys: Key[];
  selectedCategories: string[];
  handleDeleteArray: () => Promise<void>;
  setBookSearchText: (value: string) => void;
  setSelectedCategories: (value: string[]) => void;
};

export const BookCatalogToolbar = ({
  bookSearchText,
  handleDeleteArray,
  isAdmin,
  isFetching,
  selectedBookRowKeys,
  selectedCategories,
  setBookSearchText,
  setSelectedCategories,
}: TBookCatalogToolbarProps) => (
  <section className="flex flex-col items-start gap-xs rounded-m border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s text-app-text shadow-app-s md:flex-row">
    <BookSearch bookSearchText={bookSearchText} onSearch={setBookSearchText} />
    <CategorySelect
      selectedCategories={selectedCategories}
      onChangeCategories={setSelectedCategories}
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
