import { Pagination, Spin, Table } from "antd";

import "@/assets/layouts-styles/book-styles/book.css";

import { BookCatalogGrid } from "@/features/book-page/components/book-catalog-grid";
import { DeleteBooksButton } from "@/features/book-page/components/delete-button";
import { BookSearch } from "@/features/book-page/components/filters/book-search";
import { CategorySelect } from "@/features/book-page/components/filters/category-select";

import { usePagination } from "@/common/hooks/pagination/usePagination";
import { useBookFavorites } from "@/features/book-page/hooks/useBookFavorites";
import { useBookSelection } from "@/features/book-page/hooks/useBookSelection";
import { useDeleteAsArrayBooks } from "@/features/book-page/hooks/useDeleteAsArrayBooks";
import { useBooksList } from "@/features/book-page/hooks/useFetchBooksList";

import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import useUser from "@/common/users/useUser";
import { createBookTableColumns } from "@/features/book-page/consts/book-table-columns";

export const BookView: React.FC = () => {
  const { handleChangePagination, currentPage, itemsPerPage } = usePagination();
  const { user } = useUser();
  const { bookList, isFetching, totalItems } = useBooksList({
    currentPage,
    itemsPerPage,
  });

  const { handleDeleteArray } = useDeleteAsArrayBooks();

  const {
    selectedCategories,
    selectedBookRowKeys,
    bookSearchText,
    setBookSearchText,
    setSelectedCategories,
    setSelectedBookRowKeys,
  } = useBooksFormContext();

  const { rowSelection } = useBookSelection({
    selectedBookRowKeys,
    setSelectedBookRowKeys,
  });
  const { favoriteBookIds, favoriteActionLoading, handleToggleFavorite } = useBookFavorites();

  const bookTableColumns = createBookTableColumns({
    favoriteBookIds,
    favoriteActionLoading,
    onToggleFavorite: handleToggleFavorite,
  });
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex flex-col gap-xl">
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

      <Spin tip="Loading..." size="large" spinning={isFetching}>
        {isAdmin ? (
          <Table
            className="book-page__table"
            rowSelection={rowSelection}
            columns={bookTableColumns}
            dataSource={bookList.map((book) => ({
              ...book,
              key: book._id,
            }))}
            scroll={{ x: 900 }}
            pagination={{
              position: ["bottomCenter"],
              showSizeChanger: true,
              defaultPageSize: 10,
              pageSizeOptions: [10, 20, 50, 100],
              current: currentPage,
              pageSize: itemsPerPage,
              total: totalItems,
              onChange: handleChangePagination,
            }}
          />
        ) : (
          <div className="flex flex-col gap-s">
            <BookCatalogGrid
              books={bookList}
              favoriteBookIds={favoriteBookIds}
              favoriteActionLoading={favoriteActionLoading}
              onToggleFavorite={handleToggleFavorite}
            />
            <Pagination
              className="self-center"
              current={currentPage}
              pageSize={itemsPerPage}
              pageSizeOptions={[10, 20, 50, 100]}
              showSizeChanger
              total={totalItems}
              onChange={handleChangePagination}
            />
          </div>
        )}
      </Spin>
    </div>
  );
};
