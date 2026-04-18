import React from 'react';
import { useTheme } from '@zenui/theme';
import { Button } from '../Button';

export interface ThemeToggleProps {
  /** 按钮变体 */
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 自定义类名 */
  className?: string;
  /** 是否显示文字 */
  showLabel?: boolean;
}

/**
 * 主题切换组件
 * 
 * @example
 * ```tsx
 * // 基础使用
 * <ThemeToggle />
 * 
 * // 自定义样式
 * <ThemeToggle variant="outline" size="sm" showLabel />
 * ```
 */
export function ThemeToggle({
  variant = 'ghost',
  size = 'md',
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 切换主题：light -> dark -> system -> light
  const handleToggle = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // 根据当前主题显示图标
  const getIcon = () => {
    switch (resolvedTheme) {
      case 'dark':
        return <MoonIcon className="h-5 w-5" />;
      case 'light':
      default:
        return <SunIcon className="h-5 w-5" />;
    }
  };

  // 根据当前设置的主题显示标签
  const getLabel = () => {
    switch (theme) {
      case 'dark':
        return '暗色';
      case 'light':
        return '亮色';
      case 'system':
        return '系统';
      default:
        return '';
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={className}
      aria-label={`当前主题: ${getLabel()}，点击切换`}
    >
      {getIcon()}
      {showLabel && <span className="ml-2">{getLabel()}</span>}
    </Button>
  );
}

// 太阳图标（亮色模式）
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

// 月亮图标（暗色模式）
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
}

// 组件显示名称
ThemeToggle.displayName = 'ThemeToggle';