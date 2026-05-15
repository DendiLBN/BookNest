import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import useUser from "@/common/users/useUser";
import { useAddFavoriteBookMutation, useRemoveFavoriteBookMutation } from "@/features/users/api";
import { setIsLoggedIn } from "@/store/reducers/auth";

export const useBookFavorites = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { openNotification } = useNotificationContext();
  const [addFavoriteBook, { isLoading: isAddingFavoriteBook }] = useAddFavoriteBookMutation();
  const [removeFavoriteBook, { isLoading: isRemovingFavoriteBook }] =
    useRemoveFavoriteBookMutation();

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

  return {
    favoriteBookIds,
    favoriteActionLoading,
    handleToggleFavorite,
  };
};
