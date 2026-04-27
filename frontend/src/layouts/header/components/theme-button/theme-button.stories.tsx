import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider } from "@/common/contexts/theme-context";

import { ThemeButton } from "./index.tsx";

const meta = {
  title: "Layout/Header/ThemeButton",
  component: ThemeButton,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
