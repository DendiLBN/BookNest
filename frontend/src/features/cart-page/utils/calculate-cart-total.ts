import type { TResolvedCartItem } from "@/features/cart-page/utils/resolve-cart-items";

export const calculateCartTotal = (cartItems: TResolvedCartItem[]) =>
  cartItems.reduce((total, cartItem) => total + cartItem.book.priceCents * cartItem.quantity, 0);
