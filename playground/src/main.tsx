import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 导入主题系统 CSS 变量
// 使用 Vite 的别名路径
import "@zenui/theme/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
