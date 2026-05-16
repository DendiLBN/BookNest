import { useDispatch } from "react-redux";

import { useCartDrawerContext } from "@/common/contexts/hooks/use-cart-drawer-context";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import useUser from "@/common/users/useUser";
import { useUpdateCartItemMutation } from "@/store/api/users";
import { setIsLoggedIn } from "@/store/reducers/auth";

export const useBookCart = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { openNotification } = useNotificationContext();
  const { openCartDrawer } = useCartDrawerContext();
  const [updateCartItem, { isLoading: isUpdatingCart }] = useUpdateCartItemMutation();

  const handleAddToCart = async (bookId: string) => {
    const existingCartItem = user?.cartItems.find((item) => item.bookId === bookId);

    try {
      const updatedUser = await updateCartItem({
        bookId,
        quantity: (existingCartItem?.quantity ?? 0) + 1,
      }).unwrap();

      dispatch(setIsLoggedIn({ isLoggedIn: true, user: updatedUser }));
      openCartDrawer();
      openNotification("topRight", "success", "Book added to cart.", false);
    } catch {
      openNotification("topRight", "error", "Could not update cart.", false);
    }
  };

  return {
    isUpdatingCart,
    handleAddToCart,
  };
};
