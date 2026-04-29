import type { Meta, StoryObj } from "@storybook/react";

import ChangePasswordForm from "../change-password-form";

const meta = {
  title: "Auth/ChangePasswordForm",
  component: ChangePasswordForm,
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
