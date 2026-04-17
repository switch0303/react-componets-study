import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@zenui/components": path.resolve(__dirname, "./packages/components/src"),
      "@zenui/hooks": path.resolve(__dirname, "./packages/hooks/src"),
      "@zenui/utils": path.resolve(__dirname, "./packages/utils/src"),
      "@zenui/theme": path.resolve(__dirname, "./packages/theme/src"),
      "@zenui/icons": path.resolve(__dirname, "./packages/icons/src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
