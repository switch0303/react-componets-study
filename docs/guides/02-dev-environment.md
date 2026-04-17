# 开发环境配置

> 🎯 **学习目标**：深入理解 Vite + TypeScript + React 开发环境的配置原理和最佳实践

## 本章节学习要点

通过本章节，你将学习到：

1. **Vite 的工作原理** - 为什么它比 Webpack 快？
2. **TypeScript 配置详解** - 每个选项的作用和选择理由
3. **测试环境搭建** - Vitest + React Testing Library 完整配置
4. **代码质量保证** - ESLint + Prettier + Git hooks 工程化实践

---

## 1. Vite 配置详解

### 1.1 为什么选择 Vite？

**📝 学习要点：Vite vs Webpack 的核心差异**

在传统的前端开发中，Webpack 是主流选择。但随着项目规模增大，Webpack 的启动速度和热更新速度变得越来越慢。Vite 的出现解决了这些问题。

| 特性               | Webpack                  | Vite                     | 优势说明                      |
| ------------------ | ------------------------ | ------------------------ | ----------------------------- |
| **开发服务器启动** | 慢（需要打包整个应用）   | 快（原生 ESM，无需打包） | 大型项目差异可达 10-100 倍    |
| **热更新（HMR）**  | 中等（需要重新编译模块） | 极快（ESM 原生支持）     | 修改立即生效，接近原生速度    |
| **生产构建**       | 成熟优化                 | 使用 Rollup，同样成熟    | 两者相当                      |
| **生态成熟度**     | 非常成熟                 | 快速发展中               | Webpack 插件更多，Vite 在追赶 |

**🏆 优秀实践：何时选择 Vite？**

- ✅ **推荐场景**：
  - 新项目启动（特别是中小型项目）
  - 需要极快开发体验的项目
  - Vue 3 / React 新项目
  - 组件库开发（需要频繁调试）

- ⚠️ **谨慎场景**：
  - 需要大量特定 Webpack 插件的遗留项目
  - 企业级超大型项目（需要充分测试）
  - 需要复杂自定义构建流程的项目

**📚 延伸阅读**：

- [Vite 官方文档 - 为什么选 Vite](https://vitejs.dev/guide/why.html)
- [Webpack vs Vite 深度对比](https://www.vitejs.dev/guide/comparisons.html)

---

### 1.2 配置文件解析

现在让我们深入分析 `vite.config.ts` 的每一部分：

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // ...
});
```

**📝 学习要点：defineConfig 的作用**

`defineConfig` 是 Vite 提供的一个辅助函数，它的作用是：

1. **类型提示**：提供完整的 TypeScript 类型支持，配置时会有智能提示
2. **配置校验**：在开发阶段就能发现配置错误
3. **文档提示**： hover 时可以看到每个选项的说明

虽然可以直接导出普通对象，但强烈推荐使用 `defineConfig`。

---

#### 插件配置

```typescript
plugins: [react()],
```

**📝 学习要点：@vitejs/plugin-react**

这是 Vite 官方提供的 React 插件，它集成了以下功能：

| 功能                 | 说明                                            |
| -------------------- | ----------------------------------------------- |
| **Fast Refresh**     | React 的热更新（HMR），修改组件代码后状态不丢失 |
| **JSX 转换**         | 自动处理 `.jsx` 和 `.tsx` 文件                  |
| **自动 JSX Runtime** | React 17+ 的新 JSX 转换，无需手动引入 React     |
| **Source Maps**      | 生成源码映射，方便调试                          |

**🤔 设计决策：为什么选择官方插件而不是 @vitejs/plugin-react-swc？**

Vite 提供了两个 React 插件：

- `@vitejs/plugin-react`（基于 Babel）
- `@vitejs/plugin-react-swc`（基于 SWC，用 Rust 编写）

| 特性     | Babel 版本 | SWC 版本        |
| -------- | ---------- | --------------- |
| 构建速度 | 快         | 更快（10-20倍） |
| 兼容性   | 极好       | 良好            |
| 插件生态 | 丰富       | 较少            |
| 稳定性   | 非常稳定   | 快速迭代中      |

**推荐选择**：

- 对于学习和中小型项目：Babel 版本（更好的兼容性和稳定性）
- 对于超大型生产项目：SWC 版本（更快的构建速度）

---

#### 路径别名配置

```typescript
resolve: {
  alias: {
    '@zenui/components': path.resolve(__dirname, './packages/components/src'),
    '@zenui/hooks': path.resolve(__dirname, './packages/hooks/src'),
    '@zenui/utils': path.resolve(__dirname, './packages/utils/src'),
    '@zenui/theme': path.resolve(__dirname, './packages/theme/src'),
    '@zenui/icons': path.resolve(__dirname, './packages/icons/src'),
  },
},
```

**📝 学习要点：路径别名的作用**

在 Monorepo 项目中，不同包之间需要相互引用。使用路径别名可以：

1. **简化导入路径**：

   ```typescript
   // 不使用别名
   import { Button } from "../../../packages/components/src";

   // 使用别名
   import { Button } from "@zenui/components";
   ```

2. **提高可维护性**：当文件移动时，不需要修改导入路径

3. **清晰的包边界**：通过 `@zenui/*` 前缀，清楚知道哪些是内部包

**📝 学习要点：Vite 和 TypeScript 都需要配置**

路径别名需要在两个地方配置：

1. **Vite** (`vite.config.ts`)：构建时解析路径
2. **TypeScript** (`tsconfig.json`)：开发时类型检查和智能提示

两者必须保持一致，否则会出现：

- 运行时找不到模块
- VS Code 提示 "找不到模块" 错误
- 类型推断失效

---

#### 开发服务器配置

```typescript
server: {
  port: 3000,
  open: true,
},
```

**📝 学习要点：开发服务器选项**

| 选项    | 类型                | 默认值  | 说明                        |
| ------- | ------------------- | ------- | --------------------------- |
| `port`  | `number`            | `5173`  | 服务器端口，3000 是常见选择 |
| `open`  | `boolean \| string` | `false` | 启动时自动打开浏览器        |
| `host`  | `boolean \| string` | `false` | 设置为 `true` 允许外部访问  |
| `https` | `boolean \| object` | `false` | 启用 HTTPS                  |

**🤔 设计决策：为什么选择 3000 端口？**

- 3000 是 Node.js 应用的常用端口
- 易于记忆
- 不会与系统服务冲突（如 80、443）
- 在 Create React App 等传统工具中也常用

---

#### 构建配置

```typescript
build: {
  outDir: 'dist',
  sourcemap: true,
},
```

**📝 学习要点：构建选项**

| 选项        | 类型                 | 默认值      | 说明                         |
| ----------- | -------------------- | ----------- | ---------------------------- |
| `outDir`    | `string`             | `dist`      | 输出目录                     |
| `sourcemap` | `boolean \| string`  | `false`     | 生成 Source Map，便于调试    |
| `minify`    | `boolean \| string`  | `esbuild`   | 代码压缩工具                 |
| `target`    | `string \| string[]` | `'modules'` | 目标浏览器版本               |
| `lib`       | `object`             | -           | 库模式配置（用于打包组件库） |

**📝 学习要点：为什么要开启 sourcemap？**

在生产环境构建中，Source Map 是调试的关键：

1. **错误追踪**：生产环境的报错可以映射回源代码位置
2. **性能分析**：可以查看原始代码的性能瓶颈
3. **监控分析**：错误监控工具（如 Sentry）需要 Source Map 来显示正确的错误堆栈

但注意：在生产环境部署时，Source Map 文件通常不对外暴露，只用于内部调试。

---

## 2. TypeScript 配置详解

TypeScript 配置是项目类型安全的基础。让我们深入解析 `tsconfig.json` 的每个部分。

### 2.1 编译目标与模块系统

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true
  }
}
```

**📝 学习要点：编译目标选择**

| 选项     | 当前值                          | 说明                                |
| -------- | ------------------------------- | ----------------------------------- |
| `target` | `ES2020`                        | 编译到 ES2020，平衡兼容性和现代特性 |
| `module` | `ESNext`                        | 使用 ES 模块，Vite 原生支持         |
| `lib`    | `ES2020`, `DOM`, `DOM.Iterable` | 包含的 API 类型定义                 |

**🤔 设计决策：为什么选择 ES2020？**

- **兼容性**：ES2020 被所有现代浏览器支持（Chrome 80+, Firefox 72+, Safari 13.1+）
- **特性平衡**：支持 Optional Chaining (`?.`)、Nullish Coalescing (`??`) 等实用特性
- **Vite 优化**：Vite 在开发环境使用原生 ESM，ES2020 目标让转换开销最小化

对比其他选项：

- `ES2015`：太老，很多现代语法需要转换
- `ESNext`：太新，可能包含浏览器尚未支持的语法
- `ES2022`/`ES2023`：较新特性，但浏览器支持不如 2020 广泛

**📝 学习要点：`useDefineForClassFields` 的作用**

这是 TypeScript 4.3 引入的选项，用于处理类字段的语义：

```typescript
// 当 useDefineForClassFields: true 时
class Person {
  name = "John"; // 编译为 Object.defineProperty
}

// 当 useDefineForClassFields: false 时（旧行为）
class Person {
  name = "John"; // 编译为构造函数中赋值
}
```

**为什么要开启？**

1. **符合 TC39 标准**：新的类字段提案使用 `define` 语义
2. **更好的兼容性**：与原生 JavaScript 类行为一致
3. **避免潜在问题**：某些继承场景下旧行为会产生 bug

---

### 2.2 Bundler 模式配置

```json
{
  "compilerOptions": {
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

**📝 学习要点：`moduleResolution: "bundler"`**

TypeScript 4.7 引入了 `"bundler"` 模块解析策略，专为与打包工具配合使用而设计。

对比三种模块解析策略：

| 策略        | 适用场景     | 特点                                           |
| ----------- | ------------ | ---------------------------------------------- |
| `"classic"` | 旧项目       | TypeScript 1.6 之前的解析方式，已很少使用      |
| `"node"`    | Node.js 项目 | 模拟 Node.js 的 CommonJS 模块解析              |
| `"bundler"` | 前端项目     | 支持 ESM 和 CJS 混合，允许导入没有扩展名的文件 |

**为什么选择 `"bundler"`？**

1. **更好的 ESM 支持**：与 Vite 的 ESM-first 策略一致
2. **灵活的导入**：支持 `import './file'`（无扩展名），打包工具会自动解析
3. **类型安全**：在保持灵活性的同时提供完整的类型检查

**📝 学习要点：`allowImportingTsExtensions`**

这个选项允许直接导入 `.ts` 和 `.tsx` 文件：

```typescript
// 开启 allowImportingTsExtensions 后
import { Button } from "./Button.tsx"; // ✅ 允许

// 关闭时
import { Button } from "./Button"; // ✅ 只能这样写
```

**注意事项**：

- 需要配合 `"noEmit": true` 使用（因为直接导入 TS 文件不需要编译输出）
- 只在 `"bundler"` 或 `"node16"` 模块解析策略下可用

**📝 学习要点：`isolatedModules: true`**

这个选项强制每个文件必须是独立的模块，不能依赖其他文件的类型信息。这是 Babel 等工具处理 TypeScript 时的要求。

**为什么需要开启？**

1. **Babel 兼容**：Babel 的 TypeScript 插件只进行类型擦除，不进行跨文件类型检查
2. **编译速度**：每个文件独立编译，可以并行处理
3. **明确依赖**：强制显式导入类型，代码更清晰

**开启后需要注意的问题：**

```typescript
// ❌ 错误：不能直接重新导出类型
export { SomeType } from "./types";

// ✅ 正确：必须使用 type 关键字显式导出
export type { SomeType } from "./types";
```

```typescript
// ❌ 错误：const enum 在隔离模块中无法内联
const enum Direction {
  Up,
  Down,
}

// ✅ 解决方案：使用普通 enum（有运行时开销）或字面量类型（无开销）
type Direction = "up" | "down";
```

**📝 学习要点：`noEmit: true`**

这个选项告诉 TypeScript 只进行类型检查，不输出编译后的文件。

**为什么需要开启？**

在我们的项目中：

1. **Vite 处理编译**：Vite 使用 esbuild 进行 TypeScript 编译，速度更快
2. **不需要 .js 输出**：开发时直接使用 .ts 文件
3. **类型检查分离**：TypeScript 专注于类型检查，构建交给 Vite

**工作流程对比：**

```
传统方式：
.ts → tsc 编译 → .js → 浏览器执行

我们的方式：
.ts → Vite (esbuild) 即时编译 → 浏览器执行
      ↓
    TypeScript 并行进行类型检查（不输出文件）
```

**📝 学习要点：`jsx: "react-jsx"`**

这个选项控制 JSX 的转换方式。 `"react-jsx"` 是 React 17 引入的新 JSX 转换模式。

**新旧对比：**

```typescript
// 旧模式（"jsx": "react"）
// 需要手动导入 React
import React from "react";

function Component() {
  return React.createElement("div", null, "Hello");
}

// 新模式（"jsx": "react-jsx"）
// 不需要导入 React
function Component() {
  return <div>Hello < /div>  / / 自动转换;
}
```

**新模式的优势：**

1. **无需导入 React**：代码更简洁
2. **更小的包体积**：不需要 `React` 对象
3. **更好的 Tree Shaking**：只导入需要的 jsx 运行时函数

**配置详解：**

| 值               | 说明                          | 适用场景                 |
| ---------------- | ----------------------------- | ------------------------ |
| `"react"`        | 传统转换，需要 `import React` | React 16 及以下          |
| `"react-jsx"`    | 新转换，自动导入 jsx 运行时   | React 17+（推荐）        |
| `"react-jsxdev"` | 开发模式，包含更好的错误信息  | 开发环境                 |
| `"preserve"`     | 保留 JSX 语法                 | 需要后续处理（如 Babel） |

---

## 3. 严格模式配置

```json
{
  "compilerOptions": {
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**📝 学习要点：严格模式选项详解**

| 选项                                 | 作用                     | 为什么开启                             |
| ------------------------------------ | ------------------------ | -------------------------------------- |
| `"strict": true`                     | 启用所有严格类型检查选项 | 启用一系列类型安全检查，提高代码质量   |
| `"noUnusedLocals": true`             | 检查未使用的局部变量     | 防止代码中遗留无用的变量，保持代码整洁 |
| `"noUnusedParameters": true`         | 检查未使用的函数参数     | 发现可能遗漏的参数使用，或清理无用参数 |
| `"noFallthroughCasesInSwitch": true` | 防止 switch case 穿透    | 避免意外的 case 穿透导致的 bug         |

**`strict: true` 包含的子选项：**

```json
{
  "compilerOptions": {
    // strict: true 等价于启用以下所有选项：
    "strictBindCallApply": true, // 严格的 bind/call/apply 检查
    "strictFunctionTypes": true, // 严格的函数类型检查
    "strictNullChecks": true, // 严格的 null/undefined 检查
    "strictPropertyInitialization": true, // 严格的属性初始化检查
    "noImplicitAny": true, // 禁止隐式 any 类型
    "noImplicitThis": true, // 禁止隐式 this 类型
    "alwaysStrict": true // 在严格模式下解析代码
  }
}
```

**严格模式的重要性：**

1. **类型安全**：在编译阶段捕获潜在错误
2. **代码质量**：强制更清晰的类型定义
3. **可维护性**：减少运行时错误
4. **团队协作**：统一的类型检查标准

---

## 4. 路径映射配置

```json
{
  "compilerOptions": {
    /* Path Mapping */
    "baseUrl": ".",
    "paths": {
      "@zenui/components": ["./packages/components/src"],
      "@zenui/components/*": ["./packages/components/src/*"],
      "@zenui/hooks": ["./packages/hooks/src"],
      "@zenui/hooks/*": ["./packages/hooks/src/*"],
      "@zenui/utils": ["./packages/utils/src"],
      "@zenui/utils/*": ["./packages/utils/src/*"],
      "@zenui/theme": ["./packages/theme/src"],
      "@zenui/theme/*": ["./packages/theme/src/*"],
      "@zenui/icons": ["./packages/icons/src"],
      "@zenui/icons/*": ["./packages/icons/src/*"]
    }
  }
}
```

**📝 学习要点：路径映射配置详解**

| 配置项           | 作用             | 说明                           |
| ---------------- | ---------------- | ------------------------------ |
| `"baseUrl": "."` | 设置基准目录     | 以项目根目录为基准解析相对路径 |
| `"paths"`        | 定义路径别名映射 | 将别名映射到实际路径           |

**路径别名的两种模式：**

```json
{
  "paths": {
    // 模式 1：精确匹配
    "@zenui/components": ["./packages/components/src"],

    // 模式 2：通配匹配（用于子路径）
    "@zenui/components/*": ["./packages/components/src/*"]
  }
}
```

**使用示例：**

```typescript
// 使用精确匹配别名
import { Button } from "@zenui/components";

// 使用通配匹配别名
import { cn } from "@zenui/utils";
import type { ButtonProps } from "@zenui/components/Button";

// 不使用别名（相对路径，难以维护）
import { Button } from "../../../packages/components/src";
```

**双配置的必要性：**

路径别名需要在两个地方配置，且必须保持一致：

1. **Vite 配置** (`vite.config.ts`)：
   - 作用：构建时解析路径
   - 运行时：Vite 根据配置找到实际文件

2. **TypeScript 配置** (`tsconfig.json`)：
   - 作用：开发时类型检查
   - 编辑器：VS Code 根据配置提供路径提示和跳转

**不一致的后果：**

```typescript
// 场景：Vite 配置了别名，但 TS 没配置
import { Button } from "@zenui/components";
// ❌ VS Code 报错："找不到模块 '@zenui/components'"
// ✅ 但能正常运行（Vite 能解析）

// 场景：TS 配置了别名，但 Vite 没配置
import { Button } from "@zenui/components";
// ✅ VS Code 正常，有类型提示
// ❌ 浏览器报错："Failed to resolve '@zenui/components'"
```

---

## 5. 测试环境配置

### 5.1 Vitest 配置详解

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    include: ["packages/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: ["node_modules/", "test/", "**/*.d.ts"],
    },
  },
  resolve: {
    alias: {
      "@zenui/components": path.resolve(__dirname, "./packages/components/src"),
      "@zenui/hooks": path.resolve(__dirname, "./packages/hooks/src"),
      "@zenui/utils": path.resolve(__dirname, "./packages/utils/src"),
      "@zenui/theme": path.resolve(__dirname, "./packages/theme/src"),
      "@zenui/icons": path.resolve(__dirname, "./packages/icons/src"),
    },
  },
});
```

**📝 学习要点：为什么选择 Vitest 而不是 Jest？**

Vitest 是 Vite 团队开发的测试框架，与 Vite 深度集成：

| 特性           | Jest                                           | Vitest                       |
| -------------- | ---------------------------------------------- | ---------------------------- |
| **配置复杂度** | 需要额外配置（transform、moduleNameMapper 等） | 开箱即用，与 Vite 共享配置   |
| **启动速度**   | 快                                             | 极快（复用 Vite 的优化）     |
| **HMR 支持**   | 不支持                                         | 支持（测试也支持热更新）     |
| **TypeScript** | 需要 ts-jest 或 babel-jest                     | 原生支持                     |
| **兼容性**     | 生态成熟，插件丰富                             | 与 Jest API 兼容，迁移成本低 |

**设计决策**：在本项目中选择 Vitest 是因为：

1. **与 Vite 深度集成**：共享配置，无需重复设置路径别名、transform 等
2. **更快的开发体验**：测试启动和热更新速度显著提升
3. **现代 TypeScript 支持**：无需额外配置即可支持最新的 TS 特性
4. **Jest 兼容**：API 设计相似，学习成本低

**📝 学习要点：Vitest 配置选项详解**

| 配置项                 | 值              | 说明                                                 |
| ---------------------- | --------------- | ---------------------------------------------------- |
| `globals: true`        | 启用全局 API    | 可以直接使用 `describe`, `it`, `expect` 等，无需导入 |
| `environment: 'jsdom'` | 使用 jsdom 环境 | 模拟浏览器 DOM API，用于测试 React 组件              |
| `setupFiles`           | 测试前置文件    | 在每个测试文件运行前执行，用于配置测试环境           |
| `include`              | 测试文件匹配    | 定义哪些文件会被识别为测试文件                       |
| `coverage`             | 覆盖率配置      | 配置测试覆盖率报告的生成方式和范围                   |

---

### 5.2 测试设置文件

```typescript
// test/setup.ts
import "@testing-library/jest-dom";
```

**📝 学习要点：setup.ts 的作用**

这个文件在每次运行测试之前执行，用于：

1. **引入测试工具库**：如 `@testing-library/jest-dom` 提供的自定义匹配器
2. **配置测试环境**：如 Mock 全局对象、设置默认时区等
3. **初始化测试数据**：如准备测试数据库、清理缓存等

**`@testing-library/jest-dom` 提供的额外匹配器：**

```typescript
// 更语义化的 DOM 断言
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toHaveClass("btn-primary");
expect(element).toHaveAttribute("disabled");
expect(element).toHaveTextContent("Click me");

// 与原始 Jest 匹配器的对比
expect(element).not.toBeNull(); // ❌ 不够语义化
expect(element).toBeInTheDocument(); // ✅ 更清晰表达意图
```

---

## 6. ESLint + Prettier 配置

### 6.1 ESLint 配置

ESLint 是 JavaScript/TypeScript 的静态代码分析工具，用于检查代码中的潜在问题和风格一致性。

```javascript
// eslint.config.js (ESLint Flat Config)
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

export default [
  // 基础 JS 推荐规则
  js.configs.recommended,

  // TypeScript 配置
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs["strict-type-checked"].rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // React 配置
  {
    files: ["**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // React 17+ 不需要导入 React
      "react/prop-types": "off", // 使用 TypeScript 类型检查
    },
  },

  // Prettier 兼容（必须放最后）
  prettierConfig,
];
```

**📝 学习要点：ESLint Flat Config 新配置系统**

ESLint v9 引入了全新的 Flat Config 配置系统，取代了传统的 `.eslintrc.*` 文件：

| 特性         | 旧配置（eslintrc）               | 新配置（Flat Config） |
| ------------ | -------------------------------- | --------------------- |
| **文件格式** | `.eslintrc.json`, `.eslintrc.js` | `eslint.config.js`    |
| **配置格式** | JSON 或 CommonJS                 | ESM (JavaScript 模块) |
| **插件导入** | 通过名称字符串                   | 直接导入模块          |
| **配置合并** | 继承 extends，规则复杂           | 数组形式，顺序明确    |
| **性能**     | 需要动态解析插件                 | 静态导入，更快        |

**为什么迁移到 Flat Config？**

1. **更清晰**：数组形式，配置顺序一目了然
2. **更灵活**：JavaScript 代码，可以使用条件逻辑
3. **性能更好**：静态导入，无需运行时解析
4. **ESM 原生支持**：更好地与现代工具链集成

**📝 学习要点：ESLint 插件配置详解**

| 插件                        | 用途                       | 推荐配置                 |
| --------------------------- | -------------------------- | ------------------------ |
| `@eslint/js`                | ESLint 官方 JS 规则        | `js.configs.recommended` |
| `@typescript-eslint`        | TypeScript 支持            | `strict-type-checked`    |
| `eslint-plugin-react`       | React 规则                 | `recommended`            |
| `eslint-plugin-react-hooks` | React Hooks 规则           | `recommended`            |
| `eslint-config-prettier`    | 关闭与 Prettier 冲突的规则 | 放最后                   |

**重要规则解释：**

```javascript
// React 17+ 不需要在每个文件中导入 React
'react/react-in-jsx-scope': 'off'
// 原因：新的 JSX 转换自动导入 jsx 运行时

// 使用 TypeScript 替代 PropTypes
'react/prop-types': 'off'
// 原因：TypeScript 提供更强大的类型检查

// 允许以 _ 开头的未使用参数（常用于表示故意忽略）
'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
```

---

### 6.2 Prettier 配置

Prettier 是代码格式化工具，确保团队代码风格一致。

```javascript
// prettier.config.js
/** @type {import('prettier').Config} */
const config = {
  // 基本格式
  semi: false, // 不使用分号
  singleQuote: true, // 使用单引号
  tabWidth: 2, // 缩进 2 个空格
  useTabs: false, // 使用空格而非制表符

  // 换行与长度
  printWidth: 100, // 每行最大 100 字符
  proseWrap: "preserve", // 保持 markdown 文本原样

  // 对象与数组
  bracketSpacing: true, // 对象括号间加空格 { foo: bar }
  bracketSameLine: false, // HTML 标签 > 换行
  arrowParens: "always", // 箭头函数参数加括号 (x) => x
  trailingComma: "es5", // 使用 ES5 风格的尾随逗号

  // 特殊文件
  endOfLine: "lf", // 使用 LF 换行符
  singleAttributePerLine: false, // HTML 多个属性可以同行

  // 覆盖特定文件的配置
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 80,
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "always",
        printWidth: 80,
      },
    },
  ],
};

export default config;
```

**📝 学习要点：Prettier 配置详解**

| 配置项           | 当前值     | 说明                                                                            |
| ---------------- | ---------- | ------------------------------------------------------------------------------- |
| `semi`           | `false`    | 不使用分号结尾。现代 JavaScript 中，ASI（自动分号插入）可靠，省略分号代码更简洁 |
| `singleQuote`    | `true`     | 使用单引号。JavaScript 中字符串主要使用单引号，HTML 属性使用双引号，视觉区分    |
| `tabWidth`       | `2`        | 缩进 2 个空格。平衡可读性和屏幕空间占用                                         |
| `printWidth`     | `100`      | 每行最大 100 字符。现代显示器宽度，平衡可读性和紧凑性（默认 80 稍短）           |
| `trailingComma`  | `'es5'`    | ES5 风格尾随逗号。对象和数组最后一个元素后加逗号，diff 更干净                   |
| `bracketSpacing` | `true`     | 对象括号间加空格 `{ foo: bar }`，提高可读性                                     |
| `arrowParens`    | `'always'` | 箭头函数参数始终加括号 `(x) => x`，一致性更好                                   |

**📝 学习要点：`endOfLine: 'lf'` 的重要性**

这是跨平台开发的关键配置：

| 换行符        | 表示                        | 使用系统     |
| ------------- | --------------------------- | ------------ |
| `LF` (\n)     | Line Feed                   | macOS, Linux |
| `CRLF` (\r\n) | Carriage Return + Line Feed | Windows      |
| `CR` (\r)     | Carriage Return             | 旧版 macOS   |

**为什么统一使用 `LF`？**

1. **Git 友好**：Git 默认使用 LF，混合换行符会导致 diff 混乱
2. **CI/CD 兼容**：大多数构建环境基于 Linux，使用 LF
3. **Docker 兼容**：容器化环境通常使用 Linux 基础镜像
4. **跨团队协作**：统一标准避免 "换行符战争"

**📝 学习要点：`overrides` 覆盖配置**

针对不同文件类型应用不同的格式化规则：

```javascript
overrides: [
  {
    files: "*.json",
    options: {
      printWidth: 80, // JSON 通常嵌套深，较短行宽更易读
    },
  },
  {
    files: "*.md",
    options: {
      proseWrap: "always", // Markdown 文本自动换行
      printWidth: 80,
    },
  },
];
```

常见的文件类型覆盖：

| 文件类型           | 特殊配置              | 原因                              |
| ------------------ | --------------------- | --------------------------------- |
| `*.json`           | `printWidth: 80`      | JSON 嵌套深，短行宽更易读         |
| `*.md`             | `proseWrap: 'always'` | 文本内容自动换行，便于版本控制    |
| `*.yml` / `*.yaml` | `tabWidth: 2`         | YAML 规范推荐 2 空格缩进          |
| `*.html`           | `printWidth: 120`     | HTML 标签嵌套多，稍宽行宽减少换行 |

---

## 7. ESLint 与 Prettier 的集成

### 7.1 为什么需要同时使用？

**ESLint** 和 **Prettier** 分别解决不同的问题：

| 工具         | 主要功能               | 示例                                           |
| ------------ | ---------------------- | ---------------------------------------------- |
| **ESLint**   | 代码质量和潜在问题检查 | 未使用的变量、错误的异步处理、React Hooks 规则 |
| **Prettier** | 代码格式一致性         | 缩进、换行、引号、尾随逗号                     |

**为什么两者都需要？**

1. **职责分离**：ESLint 专注"代码对不对"，Prettier 专注"代码美不美"
2. **避免冲突**：Prettier 的格式化可能与 ESLint 的格式规则冲突，需要显式关闭 ESLint 的格式规则
3. **互补优势**：ESLint 能检查逻辑错误，Prettier 能确保团队风格 100% 一致

### 7.2 配置 eslint-config-prettier

`eslint-config-prettier` 是一个 ESLint 配置，用于关闭所有与 Prettier 冲突的 ESLint 规则。

**工作原理：**

```javascript
// eslint-config-prettier 做的事情
module.exports = {
  rules: {
    // 关闭所有与格式相关的 ESLint 规则
    indent: "off", // Prettier 处理缩进
    quotes: "off", // Prettier 处理引号
    semi: "off", // Prettier 处理分号
    "comma-dangle": "off", // Prettier 处理尾随逗号
    "max-len": "off", // Prettier 处理行长度
    "array-bracket-spacing": "off", // Prettier 处理数组括号空格
    "object-curly-spacing": "off", // Prettier 处理对象花括号空格
    // ... 还有更多规则
  },
};
```

**配置方法（Flat Config）：**

```javascript
// eslint.config.js
import prettierConfig from "eslint-config-prettier";

export default [
  // ... 其他配置

  // Prettier 配置必须放最后，覆盖冲突的 ESLint 规则
  prettierConfig,
];
```

**⚠️ 重要：顺序很关键！**

```javascript
// ❌ 错误：Prettier 配置放在前面，会被后面的规则覆盖
export default [
  prettierConfig,           // 先关闭格式规则
  someOtherConfig,          // 可能又重新开启格式规则
]

// ✅ 正确：Prettier 配置放在最后，确保格式规则始终关闭
export default [
  someOtherConfig,          // 其他规则
  prettierConfig,           // 最后关闭所有格式规则
]
```

### 7.3 推荐的开发工作流

**方案一：保存时自动修复（推荐）**

配置 VS Code 在保存文件时自动运行 ESLint 和 Prettier：

```json
// .vscode/settings.json
{
  // 保存时自动格式化
  "editor.formatOnSave": true,

  // 使用 Prettier 作为默认格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // 保存时自动修复 ESLint 问题
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

**工作流程：**

1. 编写代码
2. 保存文件（`Cmd/Ctrl + S`）
3. Prettier 自动格式化代码
4. ESLint 自动修复可修复的问题
5. 如果还有未修复的错误，会在编辑器中显示

**方案二：使用 lint-staged + husky（团队项目推荐）**

在 Git 提交前自动检查和修复代码：

```javascript
// lint-staged.config.js
export default {
  "*.{ts,tsx}": [
    "eslint --fix", // 自动修复 ESLint 问题
    "prettier --write", // 格式化代码
  ],
  "*.{json,md}": ["prettier --write"],
};
```

**工作流程：**

1. 开发者编写代码
2. `git add .` 暂存更改
3. `git commit -m "xxx"` 提交
4. husky 触发 pre-commit 钩子
5. lint-staged 只对暂存的文件运行检查和修复
6. 如果有无法自动修复的错误，阻止提交并显示错误
7. 开发者修复后再次提交

---

## 8. 下一步

现在你已经完成了开发环境的完整配置，包括：

✅ **Vite 配置** - 快速的开发服务器和构建工具  
✅ **TypeScript 配置** - 严格的类型检查确保代码质量  
✅ **路径别名** - 清晰的模块导入管理  
✅ **测试环境** - Vitest + React Testing Library 完整测试方案  
✅ **代码质量** - ESLint + Prettier + Git hooks 工程化实践

**🎯 下一步建议：**

1. **验证配置** - 运行测试确保所有配置正常工作
2. **创建 Playground** - 搭建组件预览环境
3. **开始开发组件** - 从 Button 组件开始实践

**👉 [继续学习：创建 Playground 环境](./03-playground-setup.md)**

---

## 附录：完整配置文件

### vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@zenui/components": ["./packages/components/src"],
      "@zenui/components/*": ["./packages/components/src/*"],
      "@zenui/hooks": ["./packages/hooks/src"],
      "@zenui/hooks/*": ["./packages/hooks/src/*"],
      "@zenui/utils": ["./packages/utils/src"],
      "@zenui/utils/*": ["./packages/utils/src/*"],
      "@zenui/theme": ["./packages/theme/src"],
      "@zenui/theme/*": ["./packages/theme/src/*"],
      "@zenui/icons": ["./packages/icons/src"],
      "@zenui/icons/*": ["./packages/icons/src/*"]
    }
  },
  "include": ["packages/*/src", "playground/src", "docs"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    include: ["packages/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: ["node_modules/", "test/", "**/*.d.ts"],
    },
  },
  resolve: {
    alias: {
      "@zenui/components": path.resolve(__dirname, "./packages/components/src"),
      "@zenui/hooks": path.resolve(__dirname, "./packages/hooks/src"),
      "@zenui/utils": path.resolve(__dirname, "./packages/utils/src"),
      "@zenui/theme": path.resolve(__dirname, "./packages/theme/src"),
      "@zenui/icons": path.resolve(__dirname, "./packages/icons/src"),
    },
  },
});
```

---

**文档版本**：1.0  
**最后更新**：2024年1月  
**维护者**：ZenUI Team
