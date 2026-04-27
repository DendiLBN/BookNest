import type { Preview } from "@storybook/react";
import { ConfigProvider } from "antd";
import React from "react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ConfigProvider>
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
