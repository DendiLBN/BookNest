import "@/assets/layouts-styles/book-styles/book.css";

import { BookCatalogContent } from "@/features/book-page/components/book-catalog-content";
import { BookCatalogHeader } from "@/features/book-page/components/book-catalog-header";
import { BookCatalogToolbar } from "@/features/book-page/components/book-catalog-toolbar";

import { useBookCatalog } from "@/features/book-page/hooks/useBookCatalog";

export const BookView: React.FC = () => {
  const bookCatalog = useBookCatalog();

  return (
    <div className="flex flex-col gap-xl">
      <BookCatalogHeader {...bookCatalog.headerProps} />
      <BookCatalogToolbar {...bookCatalog.toolbarProps} />
      <BookCatalogContent {...bookCatalog.contentProps} />
    </div>
  );
};
