import path from "path";
import { defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";
// import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/shared/components"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@home": path.resolve(__dirname, "src/home"),
      "@watch-list": path.resolve(__dirname, "src/watch-list"),
    },
  },
});
