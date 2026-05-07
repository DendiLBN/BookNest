import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CategorySelect } from "@/features/book-page/components/filters/category-select";

describe("CategorySelect behavior", () => {
  it("opens available category options without backend data", () => {
    const { container } = render(
      <CategorySelect selectedCategories={[]} onChangeCategories={vi.fn()} />,
    );

    fireEvent.mouseDown(container.querySelector(".ant-select-selector")!);

    expect(screen.getByTitle("Fantasy")).toBeInTheDocument();
    expect(screen.getByTitle("Science Fiction")).toBeInTheDocument();
  });

  it("returns selected category values through props callback", () => {
    const onChangeCategories = vi.fn();
    const { container } = render(
      <CategorySelect selectedCategories={[]} onChangeCategories={onChangeCategories} />,
    );

    fireEvent.mouseDown(container.querySelector(".ant-select-selector")!);
    fireEvent.click(screen.getByTitle("Romance"));

    expect(onChangeCategories).toHaveBeenCalledWith(["Romance"], expect.anything());
  });
});
