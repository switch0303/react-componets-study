# 可访问性指南

> 🎯 **学习目标**：掌握 WCAG 标准，打造无障碍的 Web 体验

## 本章节学习要点

通过本章节，你将学习到：

1. **可访问性基础** - 理解 WCAG 标准和无障碍设计原则
2. **语义化 HTML** - 使用正确的 HTML 标签和 ARIA 属性
3. **键盘导航** - 确保组件可通过键盘完全操作
4. **屏幕阅读器** - 为视障用户提供良好的屏幕阅读体验
5. **可访问性测试** - 使用工具和方法验证可访问性

---

## 一、可访问性基础

### 1.1 什么是可访问性？

**可访问性（Accessibility，简称 a11y）** 是指让尽可能多的人能够使用你的产品，包括：

- **视障用户** - 使用屏幕阅读器或放大镜
- **听障用户** - 需要视觉反馈替代音频
- **运动障碍用户** - 无法使用鼠标，依赖键盘
- **认知障碍用户** - 需要简单清晰的界面
- **老年人** - 视力下降、动作迟缓
- **临时性障碍** - 手臂受伤、环境嘈杂

### 1.2 WCAG 标准

**Web Content Accessibility Guidelines (WCAG)** 是 W3C 制定的国际可访问性标准，目前最新版本是 **WCAG 2.1**。

#### 四大原则（POUR）

| 原则 | 含义 | 关键要求 |
|------|------|---------|
| **P**erceivable（可感知） | 信息必须可被用户感知 | 提供文本替代、颜色对比度、文本大小调整 |
| **O**perable（可操作） | 界面组件必须可操作 | 键盘可访问、充足的操作时间、避免引发癫痫 |
| **U**nderstandable（可理解） | 信息和操作必须可理解 | 可读文本、可预测行为、输入帮助 |
| **R**obust（健壮） | 内容必须健壮可靠 | 兼容辅助技术、有效的 HTML |

#### 三个符合等级

- **A（最低）** - 基本的可访问性要求
- **AA（推荐）** - 大多数组织的目标等级
- **AAA（最高）** - 最高级别的可访问性

**建议**：组件库至少达到 **AA 级别**。

### 1.3 关键指标

#### 颜色对比度

根据 WCAG AA 标准：

| 文本类型 | 普通文本 | 大文本（18pt+ 或 14pt+ 粗体） |
|---------|---------|---------------------------|
| AA 级别 | 4.5:1 | 3:1 |
| AAA 级别 | 7:1 | 4.5:1 |

**工具推荐**：
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools 颜色选择器
- [Stark](https://www.getstark.co/) 插件

---

## 二、语义化 HTML

### 2.1 为什么语义化很重要？

**语义化 HTML** 是指使用具有特定含义的 HTML 标签，而非仅仅为了实现视觉效果。

**好处**：
- **屏幕阅读器** - 能正确解析页面结构
- **搜索引擎** - 更好地理解内容
- **开发者** - 代码更易理解和维护
- **可维护性** - 减少 CSS 和 JavaScript 的依赖

### 2.2 常见的语义化错误

```html
<!-- ❌ 错误：使用 div 模拟按钮 -->
<div onclick="handleClick()">点击我</div>

<!-- ✅ 正确：使用 button 标签 -->
<button onclick="handleClick()">点击我</button>

<!-- ❌ 错误：使用 div 模拟标题 -->
<div class="title">页面标题</div>

<!-- ✅ 正确：使用 h1 标签 -->
<h1>页面标题</h1>

<!-- ❌ 错误：使用 div 模拟列表 -->
<div class="list">
  <div class="item">项目 1</div>
  <div class="item">项目 2</div>
</div>

<!-- ✅ 正确：使用 ul 和 li 标签 -->
<ul>
  <li>项目 1</li>
  <li>项目 2</li>
</ul>
```

### 2.3 重要的语义化标签

#### 结构性标签

| 标签 | 用途 | 示例场景 |
|------|------|---------|
| `<header>` | 页面或区域的头部 | 页面顶部导航、文章标题区 |
| `<nav>` | 导航链接区域 | 主导航菜单、面包屑导航 |
| `<main>` | 页面主要内容 | 每个页面只能有一个 |
| `<article>` | 独立的内容块 | 博客文章、评论、卡片 |
| `<section>` | 文档中的节或区块 | 章节分组、功能区块 |
| `<aside>` | 侧边栏内容 | 相关链接、广告、作者简介 |
| `<footer>` | 页面或区域的底部 | 版权信息、联系方式 |

#### 内容性标签

| 标签 | 用途 | 注意 |
|------|------|------|
| `<h1>` - `<h6>` | 标题层级 | 不要跳级，每个页面只能有一个 h1 |
| `<p>` | 段落 | 不要用于分组 |
| `<ul>` / `<ol>` | 无序/有序列表 | 列表项必须用 `<li>` |
| `<li>` | 列表项 | 必须嵌套在 ul 或 ol 中 |
| `<dl>` | 定义列表 | 配合 `<dt>` 和 `<dd>` 使用 |
| `<figure>` | 独立的内容单元 | 可包含 `<figcaption>` |
| `<figcaption>` | 内容单元的标题 | 必须是 figure 的第一个或最后一个子元素 |

### 2.4 ARIA 属性

当 HTML 语义不足时，使用 ARIA（Accessible Rich Internet Applications）属性补充语义信息。

#### 常见的 ARIA 属性

```tsx
// 1. aria-label - 为元素提供标签
<button aria-label="关闭对话框">
  <XIcon />
</button>

// 2. aria-labelledby - 引用其他元素作为标签
<h2 id="modal-title">确认删除</h2>
<Modal aria-labelledby="modal-title" />

// 3. aria-describedby - 提供额外描述
<button
  aria-label="复制链接"
  aria-describedby="copy-hint"
>
  <CopyIcon />
</button>
<p id="copy-hint">点击复制当前页面链接到剪贴板</p>

// 4. aria-expanded - 展开/折叠状态
<button
  aria-expanded={isOpen}
  aria-controls="menu-content"
>
  菜单
</button>
<div id="menu-content" hidden={!isOpen}>
  {/* 菜单内容 */}
</div>

// 5. aria-hidden - 隐藏元素
< decorative-icon aria-hidden="true" />

// 6. role - 定义元素角色
<div role="alert">错误信息</div>
<div role="status">操作成功</div>
<nav role="navigation">...</nav>

// 7. aria-live - 动态内容更新
<div aria-live="polite" aria-atomic="true">
  {notification}
</div>
```

#### ARIA 角色

```tsx
// 对话框
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">对话框标题</h2>
  <p>对话框内容</p>
</div>

// 选项卡
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    选项卡 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    选项卡 2
  </button>
</div>
<div id="panel-1" role="tabpanel">...</div>
<div id="panel-2" role="tabpanel" hidden>...</div>

// 手风琴
<div>
  <button
    aria-expanded={isOpen}
    aria-controls="section-1"
    id="accordion-1"
  >
    标题
  </button>
  <div
    id="section-1"
    role="region"
    aria-labelledby="accordion-1"
    hidden={!isOpen}
  >
    内容
  </div>
</div>
```

### 2.5 组件库中的语义化实践

```tsx
// Button 组件示例
import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // 如果按钮只有图标没有文字，必须有 aria-label
    const isIconOnly = !children && (leftIcon || rightIcon);
    
    if (isIconOnly && !ariaLabel) {
      console.warn(
        'Button: Icon-only buttons must have an aria-label for accessibility'
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={isLoading}
        className={buttonClasses}
        {...props}
      >
        {isLoading && (
          <span className="sr-only">加载中...</span>
        )}
        {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        {children}
        {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

---

## 三、键盘导航

### 3.1 键盘操作基础

可访问的组件必须支持完整的键盘操作：

| 按键 | 功能 | 适用组件 |
|------|------|---------|
| `Tab` | 移动到下一个可聚焦元素 | 所有可交互组件 |
| `Shift + Tab` | 移动到上一个可聚焦元素 | 所有可交互组件 |
| `Enter` | 激活按钮或链接 | Button、Link |
| `Space` | 激活按钮或切换状态 | Button、Checkbox |
| `Escape` | 关闭对话框或菜单 | Modal、Dropdown |
| `Arrow Keys` | 在选项间导航 | Select、Menu、Radio |
| `Home` | 移动到第一个选项 | List、Menu |
| `End` | 移动到最后一个选项 | List、Menu |

### 3.2 焦点管理

```tsx
// 1. 可见的焦点指示器
<button className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary 
  focus:ring-offset-2
">
  按钮
</button>

// 2. 焦点陷阱（模态框）
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 保存当前焦点
      previousFocus.current = document.activeElement as HTMLElement;
      
      // 将焦点移到模态框
      modalRef.current?.focus();
      
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复焦点
      previousFocus.current?.focus();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // 处理 Tab 键焦点陷阱
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </div>
  );
}
```

---

## 四、屏幕阅读器

### 4.1 重要属性

```tsx
// 1. aria-label - 为元素提供可访问名称
<button aria-label="关闭对话框">
  <XIcon />
</button>

// 2. aria-labelledby - 引用其他元素作为标签
<h2 id="modal-title">确认删除</h2>
<Modal aria-labelledby="modal-title" />

// 3. aria-describedby - 提供额外描述
<button
  aria-label="复制链接"
  aria-describedby="copy-hint"
>
  <CopyIcon />
</button>
<p id="copy-hint">点击复制当前页面链接到剪贴板</p>

// 4. aria-live - 动态内容更新
<div aria-live="polite" aria-atomic="true">
  {notification}
</div>

// 5. aria-hidden - 隐藏装饰性元素
< decorative-icon aria-hidden="true" />
```

---

## 五、可访问性测试

### 5.1 自动化测试工具

```bash
# 1. axe-core - 最流行的可访问性测试库
npm install --save-dev @axe-core/react

# 2. jest-axe - Jest 集成
npm install --save-dev jest-axe

# 3. eslint-plugin-jsx-a11y - ESLint 可访问性规则
npm install --save-dev eslint-plugin-jsx-a11y
```

### 5.2 手动测试清单

#### 键盘测试

- [ ] 所有功能都可以通过键盘完成
- [ ] Tab 键顺序符合逻辑
- [ ] 焦点可见且易于识别
- [ ] 支持 Shift+Tab 反向导航
- [ ] Escape 键可以关闭模态框和菜单
- [ ] 方向键可以在列表中导航

#### 屏幕阅读器测试

- [ ] 页面标题描述准确
- [ ] 标题层级结构清晰（h1-h6）
- [ ] 图片有替代文本（alt）
- [ ] 表单有关联标签
- [ ] 按钮和链接描述清晰
- [ ] 动态内容有实时更新提示
- [ ] 状态变化有明确提示

#### 视觉测试

- [ ] 颜色对比度符合 WCAG 标准
- [ ] 不仅依赖颜色传达信息
- [ ] 文字大小可以调整到 200%
- [ ] 焦点指示器清晰可见
- [ ] 错误信息清晰明确

---

## 六、总结

### 可访问性最佳实践清单

1. **语义化 HTML**
   - 使用正确的 HTML 标签
   - 合理使用 ARIA 属性
   - 保持逻辑的焦点顺序

2. **键盘可访问**
   - 所有功能支持键盘操作
   - 提供可见的焦点指示器
   - 实现合理的键盘导航

3. **屏幕阅读器友好**
   - 提供有意义的文本替代
   - 使用 ARIA 标签和描述
   - 确保动态内容可感知

4. **视觉可访问**
   - 足够的颜色对比度
   - 不只依赖颜色传达信息
   - 支持文本大小调整

5. **持续测试**
   - 使用自动化工具检测
   - 定期进行手动测试
   - 收集真实用户反馈

---

## 📚 延伸阅读

- [MDN 可访问性指南](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility)
- [WCAG 2.1 中文翻译](https://www.w3.org/Translations/WCAG21-zh/)
- [WAI-ARIA 实践](https://www.w3.org/WAI/ARIA/apg/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse 可访问性审计](https://developer.chrome.com/docs/lighthouse/accessibility/)