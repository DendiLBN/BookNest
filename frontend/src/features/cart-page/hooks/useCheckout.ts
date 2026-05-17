import { useNavigate } from "react-router-dom";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { getApiErrorMessage } from "@/common/utils/get-api-error-message";
import type { TShippingAddress } from "@/features/orders/types";
import { useCreateOrderMutation } from "@/store/api/orders";
import { useFetchUsersQuery } from "@/store/api/users";

export const useCheckout = () => {
  const navigate = useNavigate();
  const { openNotification } = useNotificationContext();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const { refetch: refetchUser } = useFetchUsersQuery();

  const handleCheckout = async (shippingAddress: TShippingAddress) => {
    try {
      await createOrder(shippingAddress).unwrap();
      await refetchUser();
      openNotification("topRight", "success", "Order created successfully.", false);
      navigate("/orders");
    } catch (error) {
      openNotification(
        "topRight",
        "error",
        getApiErrorMessage(error, "Could not create order."),
        false,
      );
    }
  };

  return {
    handleCheckout,
    isCreatingOrder,
  };
};
