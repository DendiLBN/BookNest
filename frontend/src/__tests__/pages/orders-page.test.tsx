import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OrdersView } from "@/features/orders-page";

const useFetchMyOrdersQuery = vi.fn();

vi.mock("@/store/api/orders", () => ({
  useFetchMyOrdersQuery: () => useFetchMyOrdersQuery(),
}));

describe("OrdersView", () => {
  it("renders an empty state when the user has no orders", () => {
    useFetchMyOrdersQuery.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<OrdersView />);

    expect(screen.getByText("You have no orders yet.")).toBeInTheDocument();
  });

  it("renders order totals from checkout history", () => {
    useFetchMyOrdersQuery.mockReturnValue({
      data: [
        {
          _id: "order-123456",
          items: [
            {
              bookId: "book-1",
              title: "Pan Tadeusz",
              author: "Adam Mickiewicz",
              quantity: 2,
              unitPriceCents: 2999,
              lineTotalCents: 5998,
            },
          ],
          totalPriceCents: 5998,
          status: "pending",
          createdAt: "2026-05-17T10:00:00.000Z",
          shippingAddress: {
            recipientName: "Reader Booker",
            street: "Book Street 1",
            postalCode: "00-001",
            city: "Warsaw",
          },
        },
      ],
      isLoading: false,
    });

    render(<OrdersView />);

    expect(screen.getByText("Pan Tadeusz x 2")).toBeInTheDocument();
    expect(screen.getAllByText(/59,98/)).toHaveLength(2);
  });
});
