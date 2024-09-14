import type { Preview } from "@storybook/react";

// import '@shared/styles/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "custom",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
        { name: "custom", value: "#f8f9fa" },
      ],
    },
  },
};

export default preview;
