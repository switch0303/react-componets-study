# TypeScript 最佳实践

> 🎯 **学习目标**：掌握类型安全的组件设计模式，提升代码质量和可维护性

## 本章节学习要点

通过本章节，你将学习到：

1. **组件 Props 类型设计** - 如何设计清晰、可扩展的 Props 接口
2. **类型推断与泛型** - 让 TypeScript 为你工作，减少冗余类型
3. **类型工具函数** - 掌握内置工具类型和自定义工具类型
4. **类型安全最佳实践** - 避免常见类型陷阱

---

## 一、组件 Props 类型设计

### 1.1 基础 Props 设计模式

```typescript
// ✅ 推荐：使用接口定义 Props
export interface ButtonProps {
  /** 按钮变体样式 */
  variant?: 'default' | 'primary' | 'secondary';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}

// ❌ 避免：使用 type 定义对象类型（语义不够清晰）
export type ButtonProps = {
  variant?: string;
  size?: string;
};
```

**设计原则**：
- 使用 `interface` 定义组件 Props（语义更清晰，支持声明合并）
- 使用 JSDoc 注释说明每个属性的用途
- 可选属性使用 `?` 标记
- 有限的选项使用字面量联合类型（如 `'sm' | 'md' | 'lg'`）

### 1.2 继承原生属性

```typescript
import React from 'react';

// ✅ 推荐：扩展原生 HTML 属性
export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 自定义属性 */
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// 使用方式
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}  // 透传所有原生属性
      />
    );
  }
);
```

**优势**：
- 自动获得所有原生 HTML 属性（`onClick`, `disabled`, `type` 等）
- 保持与原生按钮相同的类型安全
- 支持所有标准事件处理器

**常用基础类型**：

| 元素类型 | 继承接口 | 使用场景 |
|---------|---------|---------|
| `<button>` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | 按钮组件 |
| `<input>` | `React.InputHTMLAttributes<HTMLInputElement>` | 输入框组件 |
| `<div>` | `React.HTMLAttributes<HTMLDivElement>` | 容器组件 |
| `<a>` | `React.AnchorHTMLAttributes<HTMLAnchorElement>` | 链接组件 |

### 1.3 泛型组件设计

```typescript
// 定义选项类型
interface SelectOption {
  label: string;
  value: string;
}

// ✅ 推荐：使用泛型支持不同类型的选项
interface SelectProps<T extends SelectOption> {
  options: T[];
  value?: T['value'];
  onChange?: (value: T['value'], option: T) => void;
  placeholder?: string;
}

// 使用示例
interface UserOption extends SelectOption {
  avatar?: string;
  email: string;
}

const UserSelect = () => {
  const users: UserOption[] = [
    { label: '张三', value: '1', email: 'zhangsan@example.com' },
    { label: '李四', value: '2', email: 'lisi@example.com' },
  ];

  return (
    <Select<UserOption>
      options={users}
      onChange={(value, option) => {
        console.log('选中用户:', option.email);
      }}
    />
  );
};
```

**泛型组件的优势**：
- 支持扩展选项类型，添加额外字段
- 保持类型推断，无需显式声明类型
- 提供智能提示和类型检查

---

## 二、类型推断与工具类型

### 2.1 利用类型推断减少冗余

```typescript
// ❌ 避免：重复声明类型
const buttonVariants: 'default' | 'primary' | 'secondary' = 'primary';

// ✅ 推荐：使用 const assertion 获取精确类型
const buttonVariants = ['default', 'primary', 'secondary'] as const;
type ButtonVariant = typeof buttonVariants[number]; // 'default' | 'primary' | 'secondary'

// 使用
const variant: ButtonVariant = 'primary'; // ✅ 正确
const invalid: ButtonVariant = 'invalid'; // ❌ 类型错误
```

### 2.2 常用工具类型

```typescript
// 1. Partial<T> - 将所有属性设为可选
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// 结果: { name?: string; age?: number; email?: string; }

// 应用场景：表单更新
const updateUser = (id: string, data: Partial<User>) => {
  // 只更新提供的字段
};

// 2. Pick<T, K> - 从类型中选择部分属性
interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

type PublicUser = Pick<User, 'name' | 'email'>;
// 结果: { name: string; email: string; }

// 应用场景：API 响应类型
const getPublicUser = (): PublicUser => {
  return { name: '张三', email: 'zhangsan@example.com' };
};

// 3. Omit<T, K> - 从类型中排除部分属性
type UserWithoutPassword = Omit<User, 'password'>;
// 结果: { name: string; age: number; email: string; }

// 应用场景：表单提交（不包含密码）
const submitUserForm = (data: Omit<User, 'password'>) => {
  // 处理表单数据
};

// 4. Required<T> - 将所有属性设为必需
interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<Config>;
// 结果: { apiUrl: string; timeout: number; retries: number; }

// 应用场景：配置初始化后的类型
const initializeConfig = (config: Config): RequiredConfig => {
  return {
    apiUrl: config.apiUrl || 'https://api.example.com',
    timeout: config.timeout || 5000,
    retries: config.retries || 3,
  };
};

// 5. Record<K, T> - 创建键值对类型
type UserRoles = 'admin' | 'editor' | 'viewer';

interface Permission {
  read: boolean;
  write: boolean;
  delete: boolean;
}

type RolePermissions = Record<UserRoles, Permission>;
// 结果: { admin: Permission; editor: Permission; viewer: Permission; }

// 应用场景：权限系统
const permissions: RolePermissions = {
  admin: { read: true, write: true, delete: true },
  editor: { read: true, write: true, delete: false },
  viewer: { read: true, write: false, delete: false },
};

// 6. ReturnType<T> - 提取函数返回值类型
function createUser(name: string, age: number) {
  return { name, age, createdAt: new Date() };
}

type User = ReturnType<typeof createUser>;
// 结果: { name: string; age: number; createdAt: Date; }

// 应用场景：API 响应类型
async function fetchUser(): Promise<User> {
  const response = await fetch('/api/user');
  return response.json();
}
```

### 2.3 自定义工具类型

```typescript
// 1. Nullable<T> - 允许 null 和 undefined
type Nullable<T> = T | null | undefined;

// 应用场景：表单字段
interface FormData {
  name: string;
  email: Nullable<string>;  // 可选字段
  phone: Nullable<string>;
}

// 2. NonNullableProperties<T> - 移除所有可空性
type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// 应用场景：确保所有字段都有值
interface UserInput {
  name: string | null;
  age: number | undefined;
}

type ValidatedUser = NonNullableProperties<UserInput>;
// 结果: { name: string; age: number; }

// 3. DeepPartial<T> - 深度可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// 应用场景：嵌套对象的更新
interface User {
  name: string;
  address: {
    street: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

const updateUser: DeepPartial<User> = {
  address: {
    city: 'Beijing'
  }
};

// 4. DeepReadonly<T> - 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// 应用场景：配置对象
interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
  };
}

type ImmutableConfig = DeepReadonly<AppConfig>;
// 所有嵌套属性都变为 readonly

// 5. EventHandler<T> - 标准化事件处理器
type EventHandler<T = Element> = (
  event: React.SyntheticEvent<T>
) => void | Promise<void>;

// 应用场景：组件事件
interface ButtonEvents {
  onClick?: EventHandler<HTMLButtonElement>;
  onMouseEnter?: EventHandler<HTMLButtonElement>;
  onMouseLeave?: EventHandler<HTMLButtonElement>;
}

// 6. AsyncReturnType<T> - 异步函数返回值类型
type AsyncReturnType<T extends (...args: any[]) => Promise<any>> =
  T extends (...args: any[]) => Promise<infer R> ? R : never;

// 应用场景：API 函数
async function fetchUser(id: string) {
  return { id, name: '张三', age: 25 };
}

type User = AsyncReturnType<typeof fetchUser>;
// 结果: { id: string; name: string; age: number; }

// 7. StrictOmit<T, K> - 严格的 Omit
type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// 应用场景：确保只删除存在的属性
interface User {
  name: string;
  age: number;
}

// ❌ 编译错误：'email' 不是 User 的属性
type Test = StrictOmit<User, 'email'>;

// ✅ 正确
type PublicUser = StrictOmit<User, 'age'>;
// 结果: { name: string; }
```

---

## 三、类型安全最佳实践

### 3.1 Props 命名规范

```typescript
// ✅ 推荐：使用描述性名称
interface ButtonProps {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
}

// ❌ 避免：使用模糊名称
interface ButtonProps {
  type?: string;  // 太模糊
  s?: string;     // 不清晰
  l?: boolean;    // 不明确
  click?: () => void;  // 不符合规范
}
```

### 3.2 避免 any 类型

```typescript
// ❌ 避免：使用 any
const handleChange = (value: any) => {
  console.log(value);
};

// ✅ 推荐：使用 unknown 或具体类型
const handleChange = (value: unknown) => {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
};

// 或使用泛型
const handleChange = <T>(value: T) => {
  console.log(value);
};
```

### 3.3 使用常量替代魔法字符串

```typescript
// ✅ 推荐：使用常量
export const ButtonVariants = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

export type ButtonVariant = typeof ButtonVariants[keyof typeof ButtonVariants];

// 使用
const variant: ButtonVariant = ButtonVariants.PRIMARY;

// ❌ 避免：直接使用魔法字符串
const variant = 'primary';  // 容易出错，没有类型检查
```

### 3.4 使用 satisfies 关键字

```typescript
// ✅ 推荐：使用 satisfies 进行类型检查
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
} satisfies {
  apiUrl: string;
  timeout: number;
  retries: number;
};

// 类型推断保持精确
const url = config.apiUrl;  // string 类型，不是 string | number

// ❌ 避免：使用类型注解（会丢失具体类型）
const config: { apiUrl: string; timeout: number } = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,  // ✅ 不会报错，因为类型注解中没有 retries
};
```

---

## 四、实战示例：完整组件类型设计

```typescript
import React, { forwardRef } from 'react';

// ========================================
// 1. 常量定义
// ========================================

export const InputVariants = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export const InputSizes = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

// ========================================
// 2. 类型定义
// ========================================

export type InputVariant = typeof InputVariants[keyof typeof InputVariants];
export type InputSize = typeof InputSizes[keyof typeof InputSizes];

// 基础 Props（不包含原生属性）
interface InputBaseProps {
  /** 输入框变体 */
  variant?: InputVariant;
  /** 输入框尺寸 */
  size?: InputSize;
  /** 是否全宽 */
  fullWidth?: boolean;
  /** 左侧图标 */
  leftIcon?: React.ReactNode;
  /** 右侧图标 */
  rightIcon?: React.ReactNode;
  /** 错误信息 */
  errorMessage?: string;
  /** 帮助文本 */
  helperText?: string;
}

// 完整的 Props 类型（交叉类型）
export type InputProps = InputBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

// ========================================
// 3. 组件实现
// ========================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = InputVariants.DEFAULT,
      size = InputSizes.MD,
      fullWidth = false,
      leftIcon,
      rightIcon,
      errorMessage,
      helperText,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // 根据变体确定边框颜色
    const variantClasses = {
      [InputVariants.DEFAULT]: 'border-gray-300 focus:border-blue-500',
      [InputVariants.ERROR]: 'border-red-500 focus:border-red-500',
      [InputVariants.SUCCESS]: 'border-green-500 focus:border-green-500',
    };

    // 根据尺寸确定内边距和字体大小
    const sizeClasses = {
      [InputSizes.SM]: 'px-3 py-1.5 text-sm',
      [InputSizes.MD]: 'px-4 py-2 text-base',
      [InputSizes.LG]: 'px-6 py-3 text-lg',
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className || ''}`}>
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full rounded-md border bg-white transition-colors
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${variantClasses[variant]}
              ${sizeClasses[size]}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </span>
          )}
        </div>
        {(errorMessage || helperText) && (
          <p
            className={`mt-1 text-sm ${
              errorMessage ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### 1.3 实战 Input 组件

这个完整的 Input 组件示例展示了 TypeScript 在组件开发中的最佳实践：

```typescript
import React, { forwardRef } from 'react';

// 1. 常量定义（使用 as const 获取精确类型）
export const InputVariants = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export const InputSizes = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

// 2. 类型定义（从常量中提取）
export type InputVariant = typeof InputVariants[keyof typeof InputVariants];
export type InputSize = typeof InputSizes[keyof typeof InputSizes];

// 3. Props 设计（分层设计，清晰分离）
interface InputBaseProps {
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMessage?: string;
  helperText?: string;
}

// 使用交叉类型组合基础 Props 和原生属性
export type InputProps = InputBaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

// 4. 组件实现
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = InputVariants.DEFAULT,
      size = InputSizes.MD,
      fullWidth = false,
      leftIcon,
      rightIcon,
      errorMessage,
      helperText,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // 变体和尺寸样式映射
    const variantClasses = {
      [InputVariants.DEFAULT]: 'border-gray-300 focus:border-blue-500',
      [InputVariants.ERROR]: 'border-red-500 focus:border-red-500',
      [InputVariants.SUCCESS]: 'border-green-500 focus:border-green-500',
    };

    const sizeClasses = {
      [InputSizes.SM]: 'px-3 py-1.5 text-sm',
      [InputSizes.MD]: 'px-4 py-2 text-base',
      [InputSizes.LG]: 'px-6 py-3 text-lg',
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className || ''}`}>
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full rounded-md border bg-white transition-colors
              focus:outline-none focus:ring-2 focus:ring-opacity-50
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${variantClasses[variant]}
              ${sizeClasses[size]}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </span>
          )}
        </div>
        {(errorMessage || helperText) && (
          <p
            className={`mt-1 text-sm ${
              errorMessage ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### 1.3 Input 组件设计亮点

这个 Input 组件展示了 TypeScript 在组件开发中的最佳实践：

**类型设计**：
- 使用 `as const` 获取精确的字面量类型
- 通过 `typeof` 和索引访问从常量中提取类型
- 使用交叉类型 `&` 组合基础 Props 和原生属性
- 使用 `Omit` 排除冲突的属性名（`size`）

**Props 设计**：
- 分层设计：基础 Props + 原生属性
- 使用 JSDoc 注释说明每个属性的用途
- 提供合理的默认值
- 支持扩展（继承原生属性）

**实现细节**：
- 使用 `forwardRef` 转发 ref
- 使用映射对象管理样式变体
- 支持图标、错误信息、帮助文本等高级功能
- 设置 `displayName` 便于调试

---

## 四、类型安全最佳实践

### 4.1 避免类型断言滥用

```typescript
// ❌ 避免：滥用类型断言
const user = {} as User;
user.name = '张三';  // 不会报错，但运行时会出错

// ✅ 推荐：使用类型守卫
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    typeof (obj as User).name === 'string'
  );
}

const data: unknown = fetchData();
if (isUser(data)) {
  console.log(data.name);  // 类型安全的访问
}
```

### 4.2 使用严格模式

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,                    // 启用所有严格类型检查
    "noImplicitAny": true,            // 禁止隐式 any
    "strictNullChecks": true,          // 严格的 null 检查
    "strictFunctionTypes": true,       // 严格的函数类型
    "strictBindCallApply": true,       // 严格的 bind/call/apply
    "strictPropertyInitialization": true,  // 严格的属性初始化
    "noImplicitThis": true,            // 禁止隐式 this
    "alwaysStrict": true               // 严格模式
  }
}
```

### 4.3 合理使用未知类型

```typescript
// ✅ 推荐：使用 unknown 代替 any
function processData(data: unknown): void {
  // 必须进行类型检查才能使用
  if (typeof data === 'string') {
    console.log(data.toUpperCase());
  } else if (Array.isArray(data)) {
    console.log(data.length);
  }
}

// ❌ 避免：使用 any
function processData(data: any): void {
  // 可以任意使用，没有类型检查
  console.log(data.anyProperty);  // 不会报错，但可能运行时错误
}
```

---

## 五、总结

### 核心要点回顾

1. **Props 设计**：
   - 使用 `interface` 定义 Props
   - 继承原生属性（`React.ButtonHTMLAttributes`）
   - 使用字面量联合类型限定选项
   - 提供合理的默认值

2. **类型工具**：
   - `Partial<T>`：所有属性可选
   - `Pick<T, K>`：选择部分属性
   - `Omit<T, K>`：排除部分属性
   - `Required<T>`：所有属性必需

3. **最佳实践**：
   - 避免使用 `any`，优先使用 `unknown`
   - 启用严格模式（`strict: true`）
   - 使用类型守卫进行类型 narrowing
   - 合理使用类型断言（避免滥用）

### 下一步学习

掌握 TypeScript 最佳实践后，建议继续学习：

- **[主题系统架构](../architecture/theme-system.md)** - 学习如何设计可扩展的主题系统
- **[组件组合模式](../architecture/composition-patterns.md)** - 掌握灵活的组件组合技巧
- **[可访问性指南](../best-practices/accessibility.md)** - 打造无障碍的用户体验

---

## 📚 延伸阅读

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Type Challenges](https://github.com/type-challenges/type-challenges) - 类型体操练习
- [Total TypeScript](https://www.totaltypescript.com/) - Matt Pocock 的 TypeScript 教程