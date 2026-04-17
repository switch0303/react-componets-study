import React, { forwardRef } from "react";
import { cn } from "@zenui/utils";

// 📝 学习要点：
// 1. 使用接口定义 Props 是 TypeScript 组件开发的基础
// 2. 所有可选属性使用 ? 标记
// 3. 为复杂类型提供默认值

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体样式
   * @default 'default'
   */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";

  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: "sm" | "md" | "lg" | "icon";

  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 子元素
   */
  children?: React.ReactNode;
}

// 🏆 优秀实践：
// 1. 使用 forwardRef 转发 ref，让父组件可以获取 DOM 节点
// 2. 这是表单集成和可访问性的重要基础
// 3. 泛型参数 <ButtonProps> 确保类型推断正确

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // 📝 学习要点：
    // 1. cn() 工具函数用于条件性地组合 className
    // 2. 通过数组形式分组，提高可读性
    // 3. 基础样式 -> 变体样式 -> 尺寸样式 -> 自定义样式的优先级顺序

    const buttonClasses = cn(
      // 基础样式：所有按钮共享的基础样式
      "inline-flex items-center justify-center",
      "whitespace-nowrap rounded-md text-sm font-medium",
      "transition-colors focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",

      // 🎨 变体样式：不同语义下的外观
      {
        // 默认变体：中性背景
        "bg-slate-900 text-slate-50 hover:bg-slate-900/90":
          variant === "default",

        // 主色变体：品牌色背景
        "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",

        // 次要变体：辅助操作
        "bg-slate-100 text-slate-900 hover:bg-slate-200":
          variant === "secondary",

        // 描边变体：带边框样式
        "border border-slate-300 bg-transparent hover:bg-slate-100":
          variant === "outline",

        // 幽灵变体：透明背景，悬停显示
        "hover:bg-slate-100 hover:text-slate-900": variant === "ghost",

        // 危险变体：破坏性操作
        "bg-red-600 text-white hover:bg-red-700": variant === "destructive",
      },

      // 📏 尺寸样式：不同大小规格
      {
        // 小尺寸：紧凑布局
        "h-8 px-3 text-xs": size === "sm",
        // 默认尺寸：标准按钮
        "h-10 px-4 py-2": size === "md",
        // 大尺寸：强调按钮
        "h-11 px-8 text-lg": size === "lg",
        // 图标尺寸：方形按钮
        "h-10 w-10": size === "icon",
      },

      // 加载状态：禁用交互并显示加载指示器
      loading && "opacity-70 cursor-wait",

      // 自定义类名：允许外部覆盖样式
      className,
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonClasses}
        // 🏆 优秀实践：
        // 1. aria-busy 告知屏幕阅读器组件正在加载
        // 2. 这是可访问性的重要组成部分
        aria-busy={loading}
        {...props}
      >
        {/* 🔄 加载指示器：在加载状态时显示 */}
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

// 📝 学习要点：
// 1. displayName 用于 React DevTools 中显示组件名称
// 2. 在使用 forwardRef 时尤其重要，否则显示为 "ForwardRef"
Button.displayName = "Button";

export { Button };
