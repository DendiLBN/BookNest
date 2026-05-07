import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DeleteBooksButton } from "@/features/book-page/components/delete-button";

describe("DeleteBooksButton behavior", () => {
  it("does not call onDelete while loading", async () => {
    const onDelete = vi.fn();

    render(
      <DeleteBooksButton selectedBookRowKeys={["book-1"]} loading={true} onDelete={onDelete} />,
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("renders a large selected count from props", () => {
    const selectedBookRowKeys = Array.from({ length: 100 }, (_, index) => index);

    render(
      <DeleteBooksButton
        selectedBookRowKeys={selectedBookRowKeys}
        loading={false}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /delete selected/i })).toBeEnabled();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
