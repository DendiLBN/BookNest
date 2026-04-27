import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { CategorySelect } from "./category-select";

const meta = {
  title: "Book/Filters/CategorySelect",
  component: CategorySelect,
  args: {
    selectedCategories: [],
    onChangeCategories: fn(),
  },
} satisfies Meta<typeof CategorySelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithSelectedCategories: Story = {
  args: {
    selectedCategories: ["Fantasy", "Science Fiction"],
  },
};
