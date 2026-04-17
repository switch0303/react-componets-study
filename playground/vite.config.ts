import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Playground 自身路径
      "@": path.resolve(__dirname, "./src"),
      // 映射 @zenui/* 到 packages 目录
      "@zenui/components": path.resolve(
        __dirname,
        "../packages/components/src",
      ),
      "@zenui/components/*": path.resolve(
        __dirname,
        "../packages/components/src/*",
      ),
      "@zenui/utils": path.resolve(__dirname, "../packages/utils/src"),
      "@zenui/utils/*": path.resolve(__dirname, "../packages/utils/src/*"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 3000,
    open: true,
  },
});
