import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BookSearch } from "@/features/book-page/components/filters/book-search";

describe("BookSearch behavior", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("passes a long search value to onSearch after debounce", async () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();
    const longSearchValue = "a".repeat(100);

    render(<BookSearch bookSearchText="" onSearch={onSearch} />);
    onSearch.mockClear();

    fireEvent.change(screen.getByPlaceholderText(/search by title or author/i), {
      target: { value: longSearchValue },
    });

    expect(onSearch).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });

    expect(onSearch).toHaveBeenCalledWith(longSearchValue);
  });
});
