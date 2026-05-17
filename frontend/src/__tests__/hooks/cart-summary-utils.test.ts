import { describe, expect, it } from "vitest";

import { calculateCartTotal } from "@/features/cart-page/utils/calculate-cart-total";
import { resolveCartItems } from "@/features/cart-page/utils/resolve-cart-items";

describe("cart summary utils", () => {
  it("resolves only cart items with matching books", () => {
    const resolvedCartItems = resolveCartItems({
      books: [
        {
          _id: "book-1",
          author: "Adam Mickiewicz",
          category: ["Classic"],
          key: "book-1",
          priceCents: 2999,
          rate: 5,
          tags: [],
          title: "Pan Tadeusz",
        },
      ],
      cartItems: [
        { bookId: "book-1", quantity: 2 },
        { bookId: "missing-book", quantity: 1 },
      ],
    });

    expect(resolvedCartItems).toHaveLength(1);
    expect(resolvedCartItems[0]?.book.title).toBe("Pan Tadeusz");
  });

  it("calculates a cart total from item prices and quantities", () => {
    expect(
      calculateCartTotal([
        {
          bookId: "book-1",
          quantity: 2,
          book: {
            _id: "book-1",
            author: "Adam Mickiewicz",
            category: ["Classic"],
            key: "book-1",
            priceCents: 2999,
            rate: 5,
            tags: [],
            title: "Pan Tadeusz",
          },
        },
      ]),
    ).toBe(5998);
  });
});
