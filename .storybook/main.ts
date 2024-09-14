import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/shared/components/**/*.mdx",
    "../src/shared/components/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "@storybook/blocks",
    "@storybook/test",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: { builder: { viteConfigPath: "vite.config.ts" } },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
