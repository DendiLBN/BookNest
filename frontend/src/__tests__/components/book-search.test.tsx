import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BookSearch } from "@/features/book-page/components/filters/book-search";

describe("BookSearch", () => {
  it("debounces typed search text before calling onSearch", async () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();

    render(<BookSearch bookSearchText="" onSearch={onSearch} />);
    onSearch.mockClear();

    fireEvent.change(screen.getByPlaceholderText(/search by title or author/i), {
      target: { value: "Dune" },
    });
    expect(onSearch).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });
    expect(onSearch).toHaveBeenCalledWith("Dune");

    vi.useRealTimers();
  });
});
