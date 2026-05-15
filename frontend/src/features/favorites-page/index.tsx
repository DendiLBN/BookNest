import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Button, Empty, Space, Spin, Table, Tag } from "antd";
import { useDispatch } from "react-redux";

import "@/assets/layouts-styles/book-styles/book.css";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import useUser from "@/common/users/useUser";
import { useFetchBooksQuery } from "@/features/book-page/api";
import { createBookTableColumns } from "@/features/book-page/consts/book-table-columns";
import { useAddFavoriteBookMutation, useRemoveFavoriteBookMutation } from "@/features/users/api";
import { setIsLoggedIn } from "@/store/reducers/auth";

export const FavoritesView = () => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const { user } = useUser();
  const favoriteBookIds = user?.favoriteBookIds ?? [];
  const { data: books = [], isFetching } = useFetchBooksQuery({
    page: 1,
    perPage: 100,
    searchString: "",
    category: [],
  });
  const [addFavoriteBook, { isLoading: isAddingFavoriteBook }] = useAddFavoriteBookMutation();
  const [removeFavoriteBook, { isLoading: isRemovingFavoriteBook }] =
    useRemoveFavoriteBookMutation();

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

  const columns = createBookTableColumns({
    favoriteBookIds,
    favoriteActionLoading: isAddingFavoriteBook || isRemovingFavoriteBook,
    onToggleFavorite: handleToggleFavorite,
  });

  return (
    <div className="flex flex-col gap-xl">
      <section className="relative grid overflow-hidden rounded-m border border-[color-mix(in_srgb,var(--color-brand)_24%,var(--color-border))] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-surface)_82%,var(--color-brand-strong)),color-mix(in_srgb,var(--color-brand-strong)_76%,var(--color-accent))),url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center p-sm text-white shadow-app-m md:grid-cols-[minmax(0,1fr)_auto] md:p-l">
        <div>
          <p className="mb-1 text-xs font-bold text-app-highlight uppercase">Saved collection</p>
          <h1 className="m-0 text-[1.55rem] leading-tight font-bold">Favorite books</h1>
          <p className="mt-xs mb-0 max-w-[640px] leading-6 text-[color-mix(in_srgb,#ffffff_86%,var(--color-highlight))]">
            Keep books you want to revisit, compare, or add to your cart later.
          </p>
        </div>
        <div className="mt-sm grid grid-cols-2 gap-xs self-stretch md:mt-0">
          <div className="flex min-w-28 flex-col justify-center rounded-m border border-white/30 bg-white/15 p-xs backdrop-blur">
            <span className="text-xl font-bold">{favoriteBooks.length}</span>
            <p className="m-0 text-[color-mix(in_srgb,#ffffff_82%,var(--color-highlight))]">
              Saved books
            </p>
          </div>
          <div className="flex min-w-28 flex-col justify-center rounded-m border border-white/30 bg-white/15 p-xs backdrop-blur">
            <span className="text-xl font-bold">{averageFavoriteRating}</span>
            <p className="m-0 text-[color-mix(in_srgb,#ffffff_82%,var(--color-highlight))]">
              Average rating
            </p>
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
