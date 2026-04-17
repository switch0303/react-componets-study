import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

/**
 * 📝 学习要点：
 *
 * 1. 测试文件命名：
 *    - 与被测试文件同名 + .test.ts 或 .spec.ts
 *    - 放在 __tests__ 目录下
 *
 * 2. describe：
 *    - 用于分组相关的测试用例
 *    - 第一个参数是描述字符串，第二个是包含测试的函数
 *
 * 3. it / test：
 *    - 定义一个测试用例
 *    - 第一个参数是描述，第二个是测试函数
 *
 * 4. expect：
 *    - 用于断言测试结果
 *    - 链式调用各种匹配器（toBe, toBeInTheDocument, toHaveClass 等）
 */

describe("Button", () => {
  // 📝 基础渲染测试
  it("应该正确渲染默认按钮", () => {
    render(<Button>点击我</Button>);

    // 查找按钮元素
    const button = screen.getByRole("button", { name: /点击我/i });

    // 断言按钮在文档中
    expect(button).toBeInTheDocument();
  });

  // 📝 变体样式测试
  it("应该渲染不同变体的按钮", () => {
    const { rerender } = render(<Button variant="primary">主要</Button>);

    let button = screen.getByRole("button", { name: /主要/i });
    expect(button).toHaveClass("bg-blue-600");

    rerender(<Button variant="destructive">危险</Button>);
    button = screen.getByRole("button", { name: /危险/i });
    expect(button).toHaveClass("bg-red-600");
  });

  // 📝 尺寸测试
  it("应该渲染不同尺寸的按钮", () => {
    const { rerender } = render(<Button size="sm">小</Button>);

    let button = screen.getByRole("button", { name: /小/i });
    expect(button).toHaveClass("h-8");

    rerender(<Button size="lg">大</Button>);
    button = screen.getByRole("button", { name: /大/i });
    expect(button).toHaveClass("h-11");
  });

  // 📝 禁用状态测试
  it("禁用状态下应该不可点击", () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        禁用
      </Button>,
    );

    const button = screen.getByRole("button", { name: /禁用/i });

    // 验证禁用状态
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");

    // 验证点击事件不会被触发
    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 📝 加载状态测试
  it("加载状态下应该显示加载指示器", () => {
    render(<Button loading>加载中</Button>);

    const button = screen.getByRole("button", { name: /加载中/i });

    // 验证加载状态类
    expect(button).toHaveClass("opacity-70", "cursor-wait");

    // 验证 aria-busy 属性
    expect(button).toHaveAttribute("aria-busy", "true");

    // 验证加载动画存在
    const spinner = button.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  // 📝 点击事件测试
  it("点击时应该触发 onClick 事件", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>点击</Button>);

    const button = screen.getByRole("button", { name: /点击/i });
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 📝 ref 转发测试
  it("应该正确转发 ref", () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(<Button ref={ref}>Ref 测试</Button>);

    // 验证 ref 是否正确绑定到 button 元素
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
