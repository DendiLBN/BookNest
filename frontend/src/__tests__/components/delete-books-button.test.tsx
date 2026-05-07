import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DeleteBooksButton } from "@/features/book-page/components/delete-button";

describe("DeleteBooksButton", () => {
  it("shows selected count and calls onDelete", async () => {
    const onDelete = vi.fn();

    render(
      <DeleteBooksButton
        selectedBookRowKeys={["book-1", "book-2"]}
        loading={false}
        onDelete={onDelete}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /delete selected/i }));

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("is disabled when there are no selected books", () => {
    render(<DeleteBooksButton selectedBookRowKeys={[]} loading={false} onDelete={vi.fn()} />);

    expect(screen.getByRole("button", { name: /delete selected/i })).toBeDisabled();
  });
});
