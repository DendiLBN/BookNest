import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BookSearch } from "./book-search";

const meta = {
  title: "Book/Filters/BookSearch",
  component: BookSearch,
  args: {
    bookSearchText: "",
    onSearch: fn(),
  },
} satisfies Meta<typeof BookSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
