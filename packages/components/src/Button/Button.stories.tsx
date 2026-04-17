import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * 📝 学习要点：
 *
 * Storybook 使用 stories 文件来描述组件的各种状态。
 *
 * 1. Meta：组件的元数据
 *    - title: 在 Storybook 侧边栏显示的路径
 *    - component: 要展示的组件
 *    - tags: 用于自动生成的文档
 *    - argTypes: 控制参数的显示方式
 *
 * 2. StoryObj：单个故事（组件的特定状态）
 *    - args: 传递给组件的 props
 *    - parameters: 故事的特定参数
 *    - play: 交互测试函数
 */

const meta: Meta<typeof Button> = {
  // 🏷️ 在 Storybook 侧边栏显示的路径
  title: "Components/Button",
  // 🔧 要展示的组件
  component: Button,
  // 📄 自动生成文档
  tags: ["autodocs"],
  // 🎛️ 参数配置
  argTypes: {
    variant: {
      description: "按钮的视觉样式变体",
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "outline",
        "ghost",
        "destructive",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description: "按钮的尺寸规格",
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    loading: {
      description: "是否显示加载状态",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "是否禁用按钮",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      description: "点击事件处理函数",
      action: "clicked",
    },
    children: {
      description: "按钮内容",
      control: "text",
    },
  },
  // 🌟 默认参数
  args: {
    children: "Button",
    variant: "default",
    size: "md",
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 📝 基础示例
 *
 * 这是 Button 组件的最基础用法，展示了默认状态下的外观。
 */
export const Default: Story = {
  args: {
    children: "默认按钮",
    variant: "default",
  },
};

/**
 * 📝 变体展示
 *
 * 展示了所有可用的变体样式，用于不同语义场景。
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">默认</Button>
      <Button variant="primary">主要</Button>
      <Button variant="secondary">次要</Button>
      <Button variant="outline">描边</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="destructive">危险</Button>
    </div>
  ),
};

/**
 * 📝 尺寸展示
 *
 * 展示了所有可用的尺寸规格。
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">小尺寸</Button>
      <Button size="md">默认尺寸</Button>
      <Button size="lg">大尺寸</Button>
      <Button size="icon">🔔</Button>
    </div>
  ),
};

/**
 * 📝 状态展示
 *
 * 展示了禁用和加载状态。
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>禁用状态</Button>
      <Button loading>加载状态</Button>
      <Button disabled loading>
        禁用+加载
      </Button>
    </div>
  ),
};

/**
 * 📝 组合示例
 *
 * 展示了多种属性的组合使用。
 */
export const Combinations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="primary" size="lg">
          大号主要按钮
        </Button>
        <Button variant="secondary" size="sm">
          小号次要按钮
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" loading>
          加载中的描边按钮
        </Button>
        <Button variant="ghost" disabled>
          禁用的幽灵按钮
        </Button>
      </div>
    </div>
  ),
};

/**
 * 📝 交互测试
 *
 * 展示了如何使用 play 函数进行交互测试。
 */
export const Interactive: Story = {
  args: {
    children: "点击我",
    variant: "primary",
  },
  // 🎮 play 函数用于在 Storybook 中进行交互测试
  play: async ({ canvasElement }) => {
    // 这里可以添加自动化交互测试
    // 例如：点击按钮、验证状态变化等
    console.log("交互测试运行中...");
  },
};
