import { Pagination, Spin, Table, type TableProps } from "antd";

import { BookCatalogGrid } from "@/features/book-page/components/book-catalog-grid";

import {
  BOOK_PAGE_SIZE_OPTIONS,
  DEFAULT_BOOK_PAGE_SIZE,
} from "@/features/book-page/consts/book-pagination";
import type { TBook } from "@/features/book-page/types";

type TBookCatalogContentProps = {
  bookList: TBook[];
  bookTableColumns: TableProps<TBook>["columns"];
  cooldownBookIds: string[];
  currentPage: number;
  favoriteActionLoading: boolean;
  favoriteBookIds: string[];
  isAdmin: boolean;
  isFetching: boolean;
  isUpdatingCart: boolean;
  itemsPerPage: number;
  rowSelection: TableProps<TBook>["rowSelection"];
  totalItems: number;
  handleAddToCart: (bookId: string) => Promise<void>;
  handleChangePagination: (page: number, pageSize: number) => void;
  handleToggleFavorite: (bookId: string) => Promise<void>;
};

export const BookCatalogContent = ({
  bookList,
  bookTableColumns,
  cooldownBookIds,
  currentPage,
  favoriteActionLoading,
  favoriteBookIds,
  handleAddToCart,
  handleChangePagination,
  handleToggleFavorite,
  isAdmin,
  isFetching,
  isUpdatingCart,
  itemsPerPage,
  rowSelection,
  totalItems,
}: TBookCatalogContentProps) => (
  <Spin tip="Loading..." size="large" spinning={isFetching}>
    {isAdmin ? (
      <Table
        className="book-page__table"
        rowKey="_id"
        rowSelection={rowSelection}
        columns={bookTableColumns}
        dataSource={bookList}
        scroll={{ x: 900 }}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: true,
          defaultPageSize: DEFAULT_BOOK_PAGE_SIZE,
          pageSizeOptions: BOOK_PAGE_SIZE_OPTIONS,
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
          cartActionLoading={isUpdatingCart}
          favoriteCooldownBookIds={cooldownBookIds}
          favoriteBookIds={favoriteBookIds}
          favoriteActionLoading={favoriteActionLoading}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
        <Pagination
          className="self-center"
          current={currentPage}
          pageSize={itemsPerPage}
          pageSizeOptions={BOOK_PAGE_SIZE_OPTIONS}
          showSizeChanger
          total={totalItems}
          onChange={handleChangePagination}
        />
      </div>
    )}
  </Spin>
);
