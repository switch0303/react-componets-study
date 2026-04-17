# 项目搭建指南

> 🎯 **学习目标**：从零开始配置一个现代化的 React 组件库开发环境

## 本章节学习要点

通过本章节，你将学习到：

1. **现代前端工具链的选择逻辑** - 为什么选这些工具？
2. **Monorepo 架构的优劣** - 何时使用？何时不用？
3. **配置文件的深层含义** - 不只是复制粘贴

---

## 第一步：项目初始化

### 🏆 优秀实践：使用 pnpm 作为包管理器

```bash
# 创建项目目录
mkdir react-componets-study
cd react-componets-study

# 初始化项目
pnpm init
```

**📝 学习要点：为什么选择 pnpm？**

| 包管理器 | 磁盘占用 | 安装速度 | Monorepo 支持 | 推荐场景 |
|---------|---------|---------|--------------|---------|
| npm | 高（每个项目独立） | 中等 | 一般（npm workspaces） | 小型项目 |
| yarn | 中（全局缓存） | 快 | 好（yarn workspaces） | 中大型项目 |
| **pnpm** | **低（硬链接共享）** | **最快** | **最好（原生支持）** | **组件库/Monorepo** |

**🤔 设计决策**：pnpm 的硬链接机制特别适合组件库开发，因为它能高效处理多包依赖，而且安装速度在持续集成（CI）环境中优势明显。

---

## 第二步：配置 Monorepo 结构

### 📝 学习要点：什么是 Monorepo？

Monorepo（单一仓库）是指在一个版本控制仓库中管理多个相关项目的策略。

**✅ 适合使用 Monorepo 的场景：**
- 组件库 + 文档站点 + 示例项目
- 多个相关的 npm 包（如 @zenui/core、@zenui/icons）
- 前后端共享类型的全栈项目

**❌ 不适合的场景：**
- 完全独立的多个项目（如一个电商网站和一个博客系统）
- 超大团队（>100人）同时开发（权限管理复杂）

**🏆 优秀实践：组件库领域的 Monorepo 案例**

- **Ant Design**: packages/antd（组件）+ site（文档站点）
- **MUI (Material-UI)**: packages/mui-material + docs
- **Chakra UI**: packages/components + website

### 🛠 实战：配置 pnpm-workspace.yaml

```yaml
# pnpm-workspace.yaml
packages:
  # 组件包
  - 'packages/*'
  # 文档站点
  - 'docs'
  # 示例项目
  - 'playground'
```

**📝 学习要点：pnpm workspace 的工作原理**

```
项目根目录
├── packages/
│   ├── components/     ← 可通过 @zenui/components 引用
│   ├── hooks/          ← 可通过 @zenui/hooks 引用
│   └── utils/          ← 可通过 @zenui/utils 引用
├── docs/               ← 独立站点
├── playground/         ← 开发调试环境
└── package.json      ← root package.json（管理公共依赖）
```

---

## 第三步：配置 Root Package.json

### 🛠 创建根目录 package.json

```json
{
  "name": "@zenui/monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "ZenUI React 组件库 - 研究与学习项目",
  "scripts": {
    "dev": "pnpm --filter @zenui/playground dev",
    "build": "pnpm -r build",
    "test": "vitest",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "storybook": "pnpm --filter @zenui/playground storybook",
    "clean": "pnpm -r exec rm -rf dist node_modules && rm -rf node_modules"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-react": "^7.0.0",
    "eslint-plugin-react-hooks": "^4.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.0.0"
}
```

**📝 学习要点：根 package.json 的作用**

| 字段 | 作用 | 说明 |
|------|------|------|
| `private: true` | 防止意外发布 | 根目录不应该发布到 npm |
| `scripts` | 统一命令入口 | 所有子包的命令都在这里聚合 |
| `devDependencies` | 共享开发依赖 | 避免每个子包重复安装 ESLint、TypeScript 等 |
| `engines` | 环境约束 | 明确 Node.js 和 pnpm 版本要求 |
| `packageManager` | 包管理器锁定 | 确保团队使用相同的包管理器 |

**🤔 设计决策：为什么 devDependencies 放在根目录？**

这是一种优化策略，原因如下：

1. **减少磁盘占用**：ESLint、Prettier、TypeScript 等工具每个子包都装会重复占用大量空间
2. **版本一致性**：确保所有子包使用相同版本的工具
3. **安装速度**：pnpm 的依赖提升机制让根目录的依赖可以被所有子包共享

**⚠️ 例外情况**：某些子包需要特定版本的工具时，可以在子包的 package.json 中单独声明，会覆盖根目录的版本。

---

## 第四步：安装依赖并验证

```bash
# 安装所有依赖（包括根目录和 workspace 中的所有包）
pnpm install

# 验证安装
pnpm --version
node --version
```

**📝 学习要点：pnpm install 的工作原理**

```
执行 pnpm install 时：

1. 读取 pnpm-workspace.yaml 识别 workspace 结构
2. 安装根目录 package.json 中的 devDependencies
3. 遍历每个 workspace 包，安装它们的 dependencies
4. 使用硬链接机制将所有依赖存储在全局存储（~/.pnpm-store）
5. 在每个包的 node_modules 中创建硬链接指向全局存储

优势：
- 所有项目共享同一个依赖副本（节省磁盘空间）
- 安装速度极快（硬链接比复制快得多）
- 严格的依赖隔离（不会出现幽灵依赖）
```

---

## ✅ 本章节学习总结

通过本章节，你应该已经理解并实践了：

1. **✅ 为什么选 pnpm**：硬链接机制、Monorepo 原生支持、安装速度优势
2. **✅ Monorepo 架构**：何时使用、何时不用、pnpm workspace 配置
3. **✅ 根 package.json 的作用**：共享 devDependencies、统一命令入口、环境约束
4. **✅ 依赖管理原理**：pnpm 的全局存储和硬链接机制

---

## 🎯 下一步

现在你已经完成了项目的基础配置。接下来可以选择：

**A. 配置 Vite + TypeScript + React** → 继续[开发环境配置](./02-dev-environment.md)

**B. 直接开始开发组件** → 跳转到[Button 组件开发](../learning/button-deep-dive.md)

**C. 了解主题系统设计** → 阅读[主题系统架构](../architecture/theme-system.md)

---

## 📚 延伸阅读

- [pnpm 官方文档 - Workspaces](https://pnpm.io/workspaces)
- [Monorepo 工具对比](https://monorepo.tools/)
- [Why pnpm?](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html)
- [Ant Design 的 Monorepo 实践](https://github.com/ant-design/ant-design)
