import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      // 可访问性测试配置
      config: {
        rules: [
          {
            // 可以在这里禁用特定规则
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
    },
  },
  // 全局装饰器
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
