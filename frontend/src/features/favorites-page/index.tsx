import { Empty, Spin, Table } from "antd";
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
        </div>
      </section>

      <Spin tip="Loading..." size="large" spinning={isFetching}>
        {favoriteBooks.length ? (
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
            <Empty description="No favorite books yet" />
          </div>
        )}
      </Spin>
    </div>
  );
};
