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
    <div className="book-page">
      <section className="book-page__header">
        <div>
          <p className="book-page__eyebrow">Saved collection</p>
          <h1 className="book-page__title">Favorite books</h1>
          <p className="book-page__subtitle">
            Keep books you want to revisit, compare, or add to your cart later.
          </p>
        </div>
        <div className="book-page__stats">
          <div className="book-page__stat">
            <span>{favoriteBooks.length}</span>
            <p>Saved books</p>
          </div>
          <div className="book-page__stat">
            <span>{averageFavoriteRating}</span>
            <p>Average rating</p>
          </div>
        </div>
      </section>

      {hasFavoriteBooks ? (
        <section className="book-page__toolbar">
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
