import { useRef, useState } from "react";

import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import useUser from "@/common/users/useUser";
import { FAVORITE_ACTION_COOLDOWN_MS } from "@/features/book-page/consts/book-favorites";
import { useAddFavoriteBookMutation, useRemoveFavoriteBookMutation } from "@/store/api/users";
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
  const favoriteCooldownsRef = useRef<Record<string, number>>({});
  const [cooldownBookIds, setCooldownBookIds] = useState<string[]>([]);

  const handleToggleFavorite = async (bookId: string) => {
    const now = Date.now();
    const cooldownExpiresAt = favoriteCooldownsRef.current[bookId] ?? 0;

    if (favoriteActionLoading || cooldownExpiresAt > now) {
      return;
    }

    favoriteCooldownsRef.current[bookId] = now + FAVORITE_ACTION_COOLDOWN_MS;
    setCooldownBookIds((currentBookIds) => [...currentBookIds, bookId]);

    window.setTimeout(() => {
      setCooldownBookIds((currentBookIds) =>
        currentBookIds.filter((currentBookId) => currentBookId !== bookId),
      );
      delete favoriteCooldownsRef.current[bookId];
    }, FAVORITE_ACTION_COOLDOWN_MS);

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
    cooldownBookIds,
    favoriteBookIds,
    favoriteActionLoading,
    handleToggleFavorite,
  };
};
