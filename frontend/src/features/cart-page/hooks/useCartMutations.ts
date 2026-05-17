import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { getApiErrorMessage } from "@/common/utils/get-api-error-message";
import { useRemoveCartItemMutation, useUpdateCartItemMutation } from "@/store/api/users";

export const useCartMutations = () => {
  const { openNotification } = useNotificationContext();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const handleUpdateQuantity = async (bookId: string, quantity: number) => {
    try {
      await updateCartItem({ bookId, quantity }).unwrap();
    } catch (error) {
      openNotification(
        "topRight",
        "error",
        getApiErrorMessage(error, "Could not update cart item."),
        false,
      );
    }
  };

  const handleRemoveItem = async (bookId: string) => {
    try {
      await removeCartItem(bookId).unwrap();
    } catch (error) {
      openNotification(
        "topRight",
        "error",
        getApiErrorMessage(error, "Could not remove cart item."),
        false,
      );
    }
  };

  return {
    handleRemoveItem,
    handleUpdateQuantity,
  };
};
