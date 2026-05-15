import { Key, useEffect } from "react";

import { Spin, Table, TableProps } from "antd";
import { useDispatch } from "react-redux";

import "@/assets/layouts-styles/book-styles/book.css";

import { DeleteBooksButton } from "@/features/book-page/components/delete-button";
import { BookSearch } from "@/features/book-page/components/filters/book-search";
import { CategorySelect } from "@/features/book-page/components/filters/category-select";

import { UsePagination } from "@/common/hooks/pagination/usePagination";
import { useDeleteAsArrayBooks } from "@/features/book-page/hooks/useDeleteAsArrayBooks";
import { UseFetchBodyBooks } from "@/features/book-page/hooks/useFetchBooksList";
import { useFilteredBooks } from "@/features/book-page/hooks/useFilteredBooks";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import { TBookBody } from "@/types/types";

import useUser from "@/common/users/useUser";
import { createBookTableColumns } from "@/features/book-page/consts/book-table-columns";
import { useAddFavoriteBookMutation, useRemoveFavoriteBookMutation } from "@/features/users/api";
import { setIsLoggedIn } from "@/store/reducers/auth";

export const BookView: React.FC = () => {
  const { loading, openNotification } = useNotificationContext();
  const dispatch = useDispatch();
  const { user } = useUser();
  const [addFavoriteBook, { isLoading: isAddingFavoriteBook }] = useAddFavoriteBookMutation();
  const [removeFavoriteBook, { isLoading: isRemovingFavoriteBook }] =
    useRemoveFavoriteBookMutation();

  const { handleChangePagination, currentPage, itemsPerPage } = UsePagination();
  const { fetchBooksList, totalItems } = UseFetchBodyBooks({
    currentPage,
    itemsPerPage,
  });

  const { handleDeleteArray } = useDeleteAsArrayBooks();

  const {
    selectedCategories,
    selectedBookRowKeys,
    bookList,
    bookSearchText,
    fetchBookList,
    setBookSearchText,
    setBookList,
    setSelectedCategories,
    setSelectedBookRowKeys,
  } = useBooksFormContext();

  useFilteredBooks({
    bookSearchText,
    selectedCategories,
    fetchBookList,
    setBookList,
  });

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    if (newSelectedRowKeys.length <= 20) {
      setSelectedBookRowKeys(newSelectedRowKeys);
    } else {
      openNotification(
        "topRight",
        "error",
        "An error occurred while selecting books. You can select up to 20 books.",
        true,
      );
    }
  };

  useEffect(() => {
    fetchBooksList();
  }, [fetchBooksList, currentPage, itemsPerPage]);

  const rowSelection: TableProps<TBookBody>["rowSelection"] = {
    selectedRowKeys: selectedBookRowKeys,
    onChange: onSelectChange,
  };

  const favoriteBookIds = user?.favoriteBookIds ?? [];
  const favoriteActionLoading = isAddingFavoriteBook || isRemovingFavoriteBook;

  const handleToggleFavorite = async (bookId: string) => {
    const isFavorite = favoriteBookIds.includes(bookId);

    try {
      const updatedUser = await (isFavorite
        ? removeFavoriteBook(bookId).unwrap()
        : addFavoriteBook(bookId).unwrap());

      dispatch(setIsLoggedIn({ isLoggedIn: true, user: updatedUser }));
      openNotification(
        "topRight",
        "success",
        isFavorite ? "Book removed from favorites." : "Book saved to favorites.",
        false,
      );
    } catch {
      openNotification("topRight", "error", "Could not update favorite books.", false);
    }
  };

  const bookTableColumns = createBookTableColumns({
    favoriteBookIds,
    favoriteActionLoading,
    onToggleFavorite: handleToggleFavorite,
  });

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
            <span className="text-xl font-bold text-app-brand">{selectedBookRowKeys.length}</span>
            <p className="m-0 text-app-text-muted">Selected</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-start gap-xs rounded-m border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s text-app-text shadow-app-s md:flex-row">
        <BookSearch bookSearchText={bookSearchText} onSearch={setBookSearchText} />
        <CategorySelect
          selectedCategories={selectedCategories}
          onChangeCategories={setSelectedCategories}
        />
        <div className="w-full md:ml-auto md:w-auto">
          <DeleteBooksButton
            selectedBookRowKeys={selectedBookRowKeys}
            loading={loading}
            onDelete={handleDeleteArray}
          />
        </div>
      </section>

      <Spin tip="Loading..." size="large" spinning={loading}>
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
      </Spin>
    </div>
  );
};
