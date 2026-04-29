import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CategorySelect } from "@/features/book-page/components/filters/category-select";

describe("CategorySelect", () => {
  it("renders selected categories", () => {
    render(
      <CategorySelect
        selectedCategories={["Fantasy", "Science Fiction"]}
        onChangeCategories={vi.fn()}
      />,
    );

    expect(screen.getByText("Fantasy")).toBeInTheDocument();
    expect(screen.getByText("Science Fiction")).toBeInTheDocument();
  });

  it("calls onChangeCategories when a category is selected", () => {
    const onChangeCategories = vi.fn();
    const { container } = render(
      <CategorySelect
        selectedCategories={[]}
        onChangeCategories={onChangeCategories}
      />,
    );

    fireEvent.mouseDown(container.querySelector(".ant-select-selector")!);
    fireEvent.click(screen.getByTitle("Fantasy"));

    expect(onChangeCategories).toHaveBeenCalledWith(["Fantasy"], expect.anything());
  });
});
