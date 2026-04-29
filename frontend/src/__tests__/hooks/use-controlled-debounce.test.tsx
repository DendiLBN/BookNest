import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useControledDebounce } from "@/common/hooks/debounce/useControledDebounce";

describe("useControledDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("updates the visible input value immediately", () => {
    const { result } = renderHook(() => useControledDebounce());

    act(() => {
      result.current.handleDebouncedValue("Dune");
    });

    expect(result.current.value).toBe("Dune");
    expect(result.current.debouncedValue).toBe("");
  });

  it("updates debounced value after the debounce delay", async () => {
    const { result } = renderHook(() => useControledDebounce());

    act(() => {
      result.current.handleDebouncedValue("Foundation");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(801);
    });

    expect(result.current.debouncedValue).toBe("Foundation");
  });
});
