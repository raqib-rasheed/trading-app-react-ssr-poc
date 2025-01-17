/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "vitest.setup.ts",
      include: ["./src/**/*.test.tsx", "./src/**/*.test.ts"],
    },
  })
);
