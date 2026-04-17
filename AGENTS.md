# ZenUI - React 组件库研究项目

## 🎯 项目目标

> **边做边学，深度理解现代组件库的设计与实现**

这是一个以学习为目的的 React 组件库项目，通过实际开发深入理解：
- 组件设计模式与架构
- 类型安全的 TypeScript 实践
- 可访问性（a11y）工程化
- 现代工程化工具链

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm 8+

### 启动项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动 Storybook 文档
pnpm storybook
```

## 📚 学习路径

### 阶段一：基础（Week 1）
| 主题 | 核心内容 | 预计时间 |
|------|----------|----------|
| 项目搭建 | Vite + TypeScript + Tailwind 配置 | 2h |
| 主题系统 | CSS 变量 + 主题切换 | 3h |
| 首个组件 | Button 组件完整实现 | 4h |

**👉 [开始学习：项目搭建指南](./docs/guides/01-project-setup.md)**

### 阶段二：核心组件（Week 2-3）
- 表单组件：Input、Select、Checkbox、Radio
- 反馈组件：Modal、Message、Loading
- 布局组件：Grid、Space、Divider

### 阶段三：高级特性（Week 4-5）
- 数据展示：Table、List、Tree
- 导航组件：Menu、Tabs、Steps
- 日期时间：DatePicker、Calendar

### 阶段四：工程化（Week 6-8）
- 测试策略与覆盖率
- 文档自动化
- 性能优化与发布

## 📖 文档导航

### 学习文档
- [项目搭建指南](./docs/guides/01-project-setup.md) - 从零开始配置开发环境
- [组件开发规范](./docs/guides/02-component-development.md) - 如何编写高质量组件
- [TypeScript 最佳实践](./docs/guides/03-typescript-patterns.md) - 类型安全的组件设计

### 架构设计
- [主题系统架构](./docs/architecture/theme-system.md) - 如何实现动态主题
- [组件组合模式](./docs/architecture/composition-patterns.md) - 可复用的设计模式
- [状态管理策略](./docs/architecture/state-management.md) - 组件间通信方案

### 最佳实践
- [可访问性指南](./docs/best-practices/accessibility.md) - 打造无障碍体验
- [性能优化技巧](./docs/best-practices/performance.md) - 组件级性能优化
- [测试策略](./docs/best-practices/testing.md) - 全面的测试覆盖

### 学习案例
- [Button 组件实现解析](./docs/learning/button-deep-dive.md) - 首个组件的完整开发过程
- [从 Ant Design 学习](./docs/learning/from-ant-design.md) - 解析 Ant Design 的设计智慧
- [从 Radix UI 学习](./docs/learning/from-radix-ui.md) - Headless UI 的设计哲学

## 🛠 技术栈

| 类别 | 技术 | 用途 |
|------|------|------|
| 框架 | React 18 | UI 组件基础 |
| 语言 | TypeScript 5 | 类型安全 |
| 构建 | Vite 5 | 快速开发与构建 |
| 样式 | Tailwind CSS 3 | 原子化样式 |
| 测试 | Vitest + React Testing Library | 单元测试 |
| 文档 | Storybook 7 | 组件文档与交互测试 |
| 规范 | ESLint + Prettier | 代码规范 |

## 📁 项目结构

```
react-componets-study/
├── packages/
│   ├── components/          # 组件源代码
│   │   ├── Button/
│   │   ├── Input/
│   │   └── ...
│   ├── hooks/              # 自定义 Hooks
│   ├── utils/              # 工具函数
│   ├── theme/              # 主题系统
│   └── icons/              # 图标库
├── docs/                   # 文档（学习资料）
│   ├── guides/             # 入门指南
│   ├── architecture/       # 架构设计
│   ├── best-practices/     # 最佳实践
│   └── learning/           # 学习案例
├── playground/             # 组件预览环境
└── scripts/                # 构建脚本
```

## 🤝 参与贡献

这是一个以学习为目的的项目，欢迎：
- 提出问题或建议
- 分享学习心得
- 一起探讨最佳实践

## 📄 许可证

MIT License

---

> 💡 **提示**：本文档是入口指南，详细内容请查看 `docs/` 目录下的专题文档。建议按照【学习路径】的顺序进行学习。
