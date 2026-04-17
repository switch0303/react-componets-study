import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    include: ["packages/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: ["node_modules/", "test/", "**/*.d.ts"],
    },
  },
  resolve: {
    alias: {
      "@zenui/components": path.resolve(__dirname, "./packages/components/src"),
      "@zenui/hooks": path.resolve(__dirname, "./packages/hooks/src"),
      "@zenui/utils": path.resolve(__dirname, "./packages/utils/src"),
      "@zenui/theme": path.resolve(__dirname, "./packages/theme/src"),
      "@zenui/icons": path.resolve(__dirname, "./packages/icons/src"),
    },
  },
});
