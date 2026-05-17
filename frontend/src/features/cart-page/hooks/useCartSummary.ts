import useUser from "@/common/users/useUser";
import { FULL_CATALOG_PAGE_SIZE } from "@/features/book-page/consts/book-query";
import { calculateCartTotal } from "@/features/cart-page/utils/calculate-cart-total";
import { resolveCartItems } from "@/features/cart-page/utils/resolve-cart-items";
import { useFetchBooksQuery } from "@/store/api/books";

export const useCartSummary = () => {
  const { user } = useUser();
  const { data: booksResponse } = useFetchBooksQuery({
    page: 1,
    perPage: FULL_CATALOG_PAGE_SIZE,
    searchString: "",
    category: [],
  });
  const cartItems = user?.cartItems ?? [];
  const resolvedCartItems = resolveCartItems({
    books: booksResponse?.data ?? [],
    cartItems,
  });

  return {
    resolvedCartItems,
    totalPriceCents: calculateCartTotal(resolvedCartItems),
  };
};
