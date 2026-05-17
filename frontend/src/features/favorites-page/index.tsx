import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Button, Empty, Space, Spin, Table, Tag } from "antd";

import "@/assets/layouts-styles/book-styles/book.css";

import { useBookFavorites } from "@/features/book-page/hooks/useBookFavorites";

import { FULL_CATALOG_PAGE_SIZE } from "@/features/book-page/consts/book-query";
import { createBookTableColumns } from "@/features/book-page/consts/book-table-columns";
import { useFetchBooksQuery } from "@/store/api/books";

export const FavoritesView = () => {
  const { favoriteBookIds, favoriteActionLoading, handleToggleFavorite } = useBookFavorites();
  const { data: booksResponse, isFetching } = useFetchBooksQuery({
    page: 1,
    perPage: FULL_CATALOG_PAGE_SIZE,
    searchString: "",
    category: [],
  });
  const books = useMemo(() => booksResponse?.data ?? [], [booksResponse]);

  const favoriteBooks = books.filter((book) => favoriteBookIds.includes(book._id));
  const hasFavoriteBooks = favoriteBooks.length > 0;

  const favoriteCategories = useMemo(
    () =>
      Array.from(new Set(favoriteBooks.flatMap((book) => book.category))).filter(
        (category) => category.length > 0,
      ),
    [favoriteBooks],
  );

  const averageFavoriteRating = useMemo(() => {
    if (!hasFavoriteBooks) {
      return "0.0";
    }

    const ratingSum = favoriteBooks.reduce((sum, book) => sum + book.rate, 0);

    return (ratingSum / favoriteBooks.length).toFixed(1);
  }, [favoriteBooks, hasFavoriteBooks]);

  const columns = createBookTableColumns({
    favoriteBookIds,
    favoriteActionLoading,
    onToggleFavorite: handleToggleFavorite,
  });

  return (
    <div className="flex flex-col gap-xl">
      <section className="relative grid overflow-hidden rounded-m border border-app-border bg-[linear-gradient(135deg,var(--color-brand-soft),var(--color-accent-soft))] p-sm text-app-text shadow-app-m md:grid-cols-[minmax(0,1fr)_auto] md:p-l">
        <div>
          <p className="mb-1 text-xs font-bold text-app-brand uppercase">Saved collection</p>
          <h1 className="m-0 text-[1.55rem] leading-tight font-bold">Favorite books</h1>
          <p className="mt-xs mb-0 max-w-160 leading-6 text-app-text-muted">
            Keep books you want to revisit, compare, or add to your cart later.
          </p>
        </div>
        <div className="mt-sm grid grid-cols-2 gap-xs self-stretch md:mt-0">
          <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
            <span className="text-xl font-bold text-app-brand">{favoriteBooks.length}</span>
            <p className="m-0 text-app-text-muted">Saved books</p>
          </div>
          <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
            <span className="text-xl font-bold text-app-brand">{averageFavoriteRating}</span>
            <p className="m-0 text-app-text-muted">Average rating</p>
          </div>
        </div>
      </section>

      {hasFavoriteBooks ? (
        <section className="rounded-m border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s text-app-text shadow-app-s">
          <Space direction="vertical" size={8}>
            <strong>Saved categories</strong>
            <Space wrap>
              {favoriteCategories.map((category) => (
                <Tag color="green" key={category}>
                  {category}
                </Tag>
              ))}
            </Space>
          </Space>
        </section>
      ) : null}

      <Spin tip="Loading..." size="large" spinning={isFetching}>
        {hasFavoriteBooks ? (
          <Table
            className="book-page__table"
            columns={columns}
            dataSource={favoriteBooks.map((book) => ({
              ...book,
              key: book._id,
            }))}
            pagination={false}
            scroll={{ x: 900 }}
          />
        ) : (
          <div className="book-page__empty">
            <Empty description="No favorite books yet">
              <Link to="/book">
                <Button type="primary">Browse books</Button>
              </Link>
            </Empty>
          </div>
        )}
      </Spin>
    </div>
  );
};
