# ZenUI 组件库 - Button 组件

## 概述

Button 组件是 ZenUI 组件库的基础组件，提供了丰富的变体、尺寸和状态支持。

## 安装

```bash
pnpm add @zenui/components
```

## 基础用法

```tsx
import { Button } from "@zenui/components";

function App() {
  return <Button>点击我</Button>;
}
```

## 变体

Button 支持 6 种变体样式：

```tsx
<div className="flex gap-2">
  <Button variant="default">默认</Button>
  <Button variant="primary">主要</Button>
  <Button variant="secondary">次要</Button>
  <Button variant="outline">描边</Button>
  <Button variant="ghost">幽灵</Button>
  <Button variant="destructive">危险</Button>
</div>
```

## 尺寸

Button 支持 4 种尺寸：

```tsx
<div className="flex items-center gap-2">
  <Button size="sm">小</Button>
  <Button size="md">中</Button>
  <Button size="lg">大</Button>
  <Button size="icon">🔔</Button>
</div>
```

## 状态

### 禁用状态

```tsx
<Button disabled>禁用按钮</Button>
```

### 加载状态

```tsx
<Button loading>加载中</Button>
```

## API

### Props

| 属性        | 类型                                                                             | 默认值      | 说明             |
| ----------- | -------------------------------------------------------------------------------- | ----------- | ---------------- |
| `variant`   | `'default' \| 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'default'` | 按钮变体样式     |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'icon'`                                                 | `'md'`      | 按钮尺寸         |
| `loading`   | `boolean`                                                                        | `false`     | 是否显示加载状态 |
| `disabled`  | `boolean`                                                                        | `false`     | 是否禁用按钮     |
| `className` | `string`                                                                         | -           | 自定义类名       |
| `children`  | `ReactNode`                                                                      | -           | 按钮内容         |
| `onClick`   | `(event: MouseEvent) => void`                                                    | -           | 点击事件处理函数 |

## 最佳实践

1. **语义化使用变体**
   - `primary` - 主要操作（保存、提交）
   - `secondary` - 次要操作（取消、返回）
   - `destructive` - 破坏性操作（删除、移除）
   - `outline` / `ghost` - 低强调操作

2. **加载状态处理**
   - 异步操作时显示 loading 状态
   - 避免用户重复提交
   - 配合 disabled 属性使用

3. **可访问性**
   - 使用语义化的 HTML `<button>`
   - 支持键盘导航
   - 提供清晰的视觉反馈

## 测试

Button 组件包含完整的测试覆盖：

```bash
pnpm test Button
```

测试覆盖场景：

- ✅ 渲染测试
- ✅ 变体样式测试
- ✅ 尺寸样式测试
- ✅ 禁用状态测试
- ✅ 加载状态测试
- ✅ 点击事件测试
- ✅ ref 转发测试

## 更新日志

### 1.0.0

- 初始版本
- 支持 6 种变体样式
- 支持 4 种尺寸规格
- 支持加载和禁用状态
- 完整的 TypeScript 类型支持
- 11 个单元测试用例
