# 主题系统架构

> 🎯 **学习目标**：理解现代组件库的主题系统设计，掌握 CSS 变量和动态主题切换的实现

## 本章节学习要点

通过本章节，你将学习到：

1. **CSS 变量系统** - 如何设计可扩展的 CSS 变量
2. **主题切换机制** - 实现明暗主题切换的技术方案
3. **Tailwind CSS 集成** - 与原子化 CSS 框架的结合
4. **主题配置系统** - 类型安全的主题配置

---

## 一、主题系统概述

### 1.1 为什么需要主题系统？

现代 UI 组件库需要支持多种主题模式：

- **明暗主题切换** - 适应不同使用场景和用户偏好
- **品牌定制** - 支持企业品牌色定制
- **无障碍支持** - 高对比度主题满足特殊需求
- **多主题并存** - 不同区域使用不同主题

### 1.2 主题系统的核心要素

```
主题系统
├── 设计令牌 (Design Tokens)
│   ├── 颜色 (Colors)
│   ├── 间距 (Spacing)
│   ├── 字体 (Typography)
│   ├── 阴影 (Shadows)
│   └── 圆角 (Border Radius)
├── 主题模式 (Theme Modes)
│   ├── 亮色主题 (Light)
│   ├── 暗色主题 (Dark)
│   └── 高对比度 (High Contrast)
├── 主题配置 (Theme Config)
│   ├── 基础配置
│   ├── 组件配置
│   └── 扩展配置
└── 主题切换 (Theme Switching)
    ├── 系统偏好检测
    ├── 手动切换
    └── 持久化存储
```

---

## 二、CSS 变量设计

### 2.1 基础 CSS 变量

```css
/* src/index.css */

/* ========================================
   基础 CSS 变量定义
   ======================================== */

:root {
  /* 颜色系统 - 主色调 */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* 颜色系统 - 中性色 */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* 语义化颜色 - 亮色主题 */
  --color-background: #ffffff;
  --color-foreground: #111827;
  --color-muted: #f3f4f6;
  --color-muted-foreground: #6b7280;
  --color-border: #e5e7eb;
  --color-input: #e5e7eb;
  --color-ring: #3b82f6;
  
  /* 组件颜色 */
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f3f4f6;
  --color-secondary-foreground: #111827;
  --color-destructive: #ef4444;
  --color-destructive-foreground: #ffffff;
  --color-accent: #f3f4f6;
  --color-accent-foreground: #111827;

  /* 间距系统 */
  --spacing-0: 0px;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */

  /* 字体系统 */
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */

  /* 圆角系统 */
  --radius-sm: 0.125rem;  /* 2px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-full: 9999px;

  /* 阴影系统 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

### 2.2 暗色主题变量

```css
/* 暗色主题 - 通过 .dark 类切换 */
.dark {
  /* 语义化颜色 - 暗色主题 */
  --color-background: #0c0a09;
  --color-foreground: #fafaf9;
  --color-muted: #292524;
  --color-muted-foreground: #a8a29e;
  --color-border: #44403c;
  --color-input: #44403c;
  --color-ring: #d97706;
  
  /* 组件颜色 */
  --color-primary: #d97706;
  --color-primary-foreground: #fafaf9;
  --color-secondary: #292524;
  --color-secondary-foreground: #fafaf9;
  --color-destructive: #ef4444;
  --color-destructive-foreground: #fafaf9;
  --color-accent: #292524;
  --color-accent-foreground: #fafaf9;

  /* 阴影调整 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
}
```

### 2.3 变量命名规范

```
命名模式：--{类别}-{属性}-{修饰符}

类别：
- color: 颜色
- spacing: 间距
- font: 字体
- radius: 圆角
- shadow: 阴影

属性：
- background: 背景色
- foreground: 前景色（文字）
- border: 边框色
- primary: 主色
- secondary: 次要色

修饰符：
- 50-900: 颜色深浅
- sm/lg: 尺寸大小
- hover/focus: 状态

示例：
--color-primary-500      # 主色 500
--color-background       # 背景色
--spacing-4              # 间距 16px
--radius-md              # 圆角 6px
--shadow-lg              # 大阴影
```

---

## 三、Tailwind CSS 集成

### 3.1 配置 Tailwind 使用 CSS 变量

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // 使用 class 策略切换暗色主题
  content: [
    './playground/src/**/*.{js,ts,jsx,tsx}',
    './packages/components/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 颜色系统 - 映射到 CSS 变量
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
      },
      
      // 间距系统
      spacing: {
        '0': 'var(--spacing-0)',
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
      },
      
      // 字体系统
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
      },
      
      // 圆角系统
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      
      // 阴影系统
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
}
```

### 3.2 使用示例

```tsx
// 使用 Tailwind 类名，自动映射到 CSS 变量
<button className="
  bg-primary           /* var(--color-primary) */
  text-primary-foreground  /* var(--color-primary-foreground) */
  px-4                 /* var(--spacing-4) = 16px */
  py-2                 /* var(--spacing-2) = 8px */
  rounded-md           /* var(--radius-md) = 6px */
  shadow-md            /* var(--shadow-md) */
  hover:bg-primary/90  /* 主色 90% 透明度 */
">
  按钮
</button>

// 暗色主题自动生效
// 当父元素有 .dark 类时，所有颜色自动切换到暗色主题值
```

---

## 四、主题切换实现

### 4.1 主题上下文设计

```typescript
// packages/theme/src/ThemeContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

// 主题类型
type Theme = 'light' | 'dark' | 'system';

// 主题上下文接口
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';  // 实际应用的主题
  toggleTheme: () => void;
}

// 创建上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供者 Props
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// 主题提供者组件
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'zenui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 从 localStorage 读取主题设置
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    handleChange();  // 初始化
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // 应用主题
  useEffect(() => {
    const root = window.document.documentElement;
    
    // 移除旧主题类
    root.classList.remove('light', 'dark');
    
    // 确定实际应用的主题
    let appliedTheme: 'light' | 'dark';
    if (theme === 'system') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      appliedTheme = theme;
    }
    
    // 添加新主题类
    root.classList.add(appliedTheme);
    setResolvedTheme(appliedTheme);
    
    // 保存到 localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // 切换主题
  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用主题的 Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 4.2 主题切换组件

```tsx
// packages/components/src/ThemeToggle/ThemeToggle.tsx

import React from 'react';
import { useTheme } from '@zenui/theme';
import { Button } from '../Button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={theme === 'light' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('light')}
      >
        ☀️ 亮色
      </Button>
      <Button
        variant={theme === 'dark' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('dark')}
      >
        🌙 暗色
      </Button>
      <Button
        variant={theme === 'system' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('system')}
      >
        💻 系统
      </Button>
      <span className="text-sm text-muted-foreground">
        当前: {resolvedTheme === 'dark' ? '暗色' : '亮色'}
      </span>
    </div>
  );
}
```

### 4.3 应用集成

```tsx
// playground/src/App.tsx

import { ThemeProvider } from '@zenui/theme';
import { Button, ThemeToggle } from '@zenui/components';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">ZenUI 组件库</h1>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">按钮组件</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">主要按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">描边按钮</Button>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

---

## 五、高级主题配置

### 5.1 主题配置对象

```typescript
// packages/theme/src/config.ts

// 颜色配置
export interface ColorConfig {
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  accent: string;
  'accent-foreground': string;
  background: string;
  foreground: string;
  muted: string;
  'muted-foreground': string;
  border: string;
  input: string;
  ring: string;
}

// 完整主题配置
export interface ThemeConfig {
  name: string;
  colors: ColorConfig;
  spacing: Record<string, string>;
  fontSize: Record<string, string>;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
}

// 预设主题
export const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    primary: '#3b82f6',
    'primary-foreground': '#ffffff',
    secondary: '#f3f4f6',
    'secondary-foreground': '#111827',
    destructive: '#ef4444',
    'destructive-foreground': '#ffffff',
    accent: '#f3f4f6',
    'accent-foreground': '#111827',
    background: '#ffffff',
    foreground: '#111827',
    muted: '#f3f4f6',
    'muted-foreground': '#6b7280',
    border: '#e5e7eb',
    input: '#e5e7eb',
    ring: '#3b82f6',
  },
  spacing: {
    '0': '0px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '6': '1.5rem',
    '8': '2rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
};

export const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    primary: '#d97706',
    'primary-foreground': '#fafaf9',
    secondary: '#292524',
    'secondary-foreground': '#fafaf9',
    destructive: '#ef4444',
    'destructive-foreground': '#fafaf9',
    accent: '#292524',
    'accent-foreground': '#fafaf9',
    background: '#0c0a09',
    foreground: '#fafaf9',
    muted: '#292524',
    'muted-foreground': '#a8a29e',
    border: '#44403c',
    input: '#44403c',
    ring: '#d97706',
  },
  spacing: lightTheme.spacing,
  fontSize: lightTheme.fontSize,
  borderRadius: lightTheme.borderRadius,
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
  },
};

// 应用主题配置到 CSS 变量
export function applyTheme(config: ThemeConfig) {
  const root = document.documentElement;
  
  // 应用颜色
  Object.entries(config.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // 应用间距
  Object.entries(config.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
  
  // 应用字体大小
  Object.entries(config.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--font-size-${key}`, value);
  });
  
  // 应用圆角
  Object.entries(config.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
  
  // 应用阴影
  Object.entries(config.boxShadow).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });
}
```

### 5.2 自定义主题

```typescript
// 创建自定义主题
import { ThemeConfig, applyTheme } from '@zenui/theme';

const customTheme: ThemeConfig = {
  name: 'brand',
  colors: {
    primary: '#e11d48',  // 品牌红色
    'primary-foreground': '#ffffff',
    secondary: '#f1f5f9',
    'secondary-foreground': '#0f172a',
    destructive: '#dc2626',
    'destructive-foreground': '#ffffff',
    accent: '#f1f5f9',
    'accent-foreground': '#0f172a',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    'muted-foreground': '#64748b',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#e11d48',
  },
  spacing: {
    '0': '0px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '6': '24px',
    '8': '32px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
};

// 应用自定义主题
applyTheme(customTheme);
```

---

## 六、最佳实践总结

### 6.1 设计原则

1. **语义化命名**：使用 `primary`、`secondary`、`background` 等语义化名称，而非具体颜色值
2. **分层设计**：基础色板 → 语义颜色 → 组件颜色
3. **一致性**：保持间距、圆角、阴影等设计令牌的统一
4. **可扩展性**：预留扩展接口，支持自定义主题

### 6.2 技术实现

1. **CSS 变量**：使用原生 CSS 变量，无需额外依赖
2. **Tailwind 集成**：通过配置扩展 Tailwind 主题
3. **React Context**：使用 Context 管理主题状态
4. **持久化存储**：使用 localStorage 保存用户偏好

### 6.3 性能优化

1. **避免闪烁**：在 HTML 中内联主题脚本，避免页面加载时的主题闪烁
2. **按需加载**：主题配置按需加载，不阻塞渲染
3. **CSS 变量**：利用浏览器原生支持，无需 JavaScript 运行时计算

---

## 七、下一步学习

掌握主题系统架构后，建议继续学习：

- **[组件组合模式](./composition-patterns.md)** - 学习灵活的组件组合技巧
- **[状态管理策略](./state-management.md)** - 掌握组件间通信方案
- **[可访问性指南](../best-practices/accessibility.md)** - 打造无障碍的用户体验

---

## 📚 延伸阅读

- [CSS 变量 MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)
- [Tailwind CSS 主题配置](https://tailwindcss.com/docs/theme)
- [Radix UI 主题系统](https://www.radix-ui.com/themes/docs/theme/overview)
- [Shadcn UI 主题](https://ui.shadcn.com/docs/theming)