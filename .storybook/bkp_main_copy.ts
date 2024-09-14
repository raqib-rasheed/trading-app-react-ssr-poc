import type { StorybookConfig } from "@storybook/react-vite";

export default {
  stories: [
    "../src/shared/components/**/*.mdx",
    "../src/shared/components/**/*.stories.@(ts)",
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
  // framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config: StorybookConfig) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");
    const path = await import("path");

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      resolve: {
        alias: {
          "@components": path.resolve(__dirname, "src/shared/components"),
          "@shared": path.resolve(__dirname, "src/shared"),
          "@home": path.resolve(__dirname, "src/home"),
          "@watch-list": path.resolve(__dirname, "src/watch-list"),
        },
      },
    });
  },
  docs: {
    autodocs: "tag",
  },
};
