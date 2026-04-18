import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@zenui/theme",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      // 外部依赖
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    // 确保 CSS 被提取
    cssCodeSplit: false,
  },
});
