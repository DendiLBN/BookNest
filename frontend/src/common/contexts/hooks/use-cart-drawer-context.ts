import { useContext } from "react";

import { CartDrawerContext } from "@/common/contexts/cart-drawer-context";

export const useCartDrawerContext = () => {
  const context = useContext(CartDrawerContext);

  if (!context) {
    throw new Error("useCartDrawerContext must be used within CartDrawerProvider");
  }

  return context;
};
