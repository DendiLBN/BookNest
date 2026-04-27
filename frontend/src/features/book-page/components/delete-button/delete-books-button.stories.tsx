import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { DeleteBooksButton } from ".";

const meta = {
  title: "Book/DeleteBooksButton",
  component: DeleteBooksButton,
  args: {
    selectedBookRowKeys: ["book-1", "book-2"],
    loading: false,
    onDelete: fn(),
  },
} satisfies Meta<typeof DeleteBooksButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Disabled: Story = {
  args: {
    selectedBookRowKeys: [],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
