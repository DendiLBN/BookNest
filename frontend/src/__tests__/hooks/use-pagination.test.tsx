import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { usePagination } from "@/common/hooks/pagination/usePagination";

describe("usePagination", () => {
  it("starts on the first page with twenty items per page", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.itemsPerPage).toBe(20);
  });

  it("updates the current page", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.handleChangePagination(3, 10);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.itemsPerPage).toBe(10);
  });

  it("caps page size at one hundred items", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.handleChangePagination(2, 200);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.itemsPerPage).toBe(100);
  });
});
