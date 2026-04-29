import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BookSearch } from "../book-search";
import { bookSearchDefaultArgs } from "./fixtures/bookSearchData";

const meta = {
  title: "Book/Filters/BookSearch",
  component: BookSearch,
  args: {
    ...bookSearchDefaultArgs,
    onSearch: fn(),
  },
} satisfies Meta<typeof BookSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
