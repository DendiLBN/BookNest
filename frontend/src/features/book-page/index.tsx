import { Key, useEffect } from "react";

import "@/assets/layouts-styles/book-styles/book.css";

import { Spin, Table, TableProps } from "antd";

import { DeleteBooksButton } from "@/features/book-page/components/delete-button/index";
import { BookSearch } from "@/features/book-page/components/filters/book-search";
import { CategorySelect } from "@/features/book-page/components/filters/category-select";

import { UsePagination } from "@/common/hooks/pagination/usePagination";
import { useDeleteAsArrayBooks } from "@/features/book-page/hooks/useDeleteAsArrayBooks";
import { UseFetchBodyBooks } from "@/features/book-page/hooks/useFetchBooksList";
import { useFilteredBooks } from "@/features/book-page/hooks/useFilteredBooks";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useBooksFormContext } from "@/features/book-page/contexts/hooks/use-form-book-context";

import { TBookBody } from "@/types/types";

import { columns } from "@/features/book-page/consts/book-table-columns";

export const BookView: React.FC = () => {
  const { loading, openNotification } = useNotificationContext();

  const { fetchBooksList } = UseFetchBodyBooks();

  const { handleDeleteArray } = useDeleteAsArrayBooks();

  const { handleChangePagination, currentPage, itemsPerPage } = UsePagination();

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

  return (
    <div className="book-page">
      <section className="book-page__header">
        <div>
          <p className="book-page__eyebrow">Book catalog</p>
          <h1 className="book-page__title">Manage library inventory</h1>
          <p className="book-page__subtitle">
            Search, filter, review ratings, and prepare selected books for bulk actions.
          </p>
        </div>
        <div className="book-page__stats">
          <div className="book-page__stat">
            <span>{bookList.length}</span>
            <p>Visible books</p>
          </div>
          <div className="book-page__stat">
            <span>{selectedBookRowKeys.length}</span>
            <p>Selected</p>
          </div>
        </div>
      </section>

      <section className="book-page__toolbar">
        <BookSearch bookSearchText={bookSearchText} onSearch={setBookSearchText} />
        <CategorySelect
          selectedCategories={selectedCategories}
          onChangeCategories={setSelectedCategories}
        />
        <div className="book-page__delete-action">
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
          columns={columns}
          dataSource={bookList.map((book) => ({
            ...book,
            key: book._id,
          }))}
          scroll={{ x: 900 }}
          pagination={{
            position: ["bottomCenter"],
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: [10, 20],
            current: currentPage,
            pageSize: itemsPerPage,
            onChange: handleChangePagination,
          }}
        />
      </Spin>
    </div>
  );
};
