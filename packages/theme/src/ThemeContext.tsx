import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// 主题类型
type Theme = 'light' | 'dark' | 'system';

// 实际应用的主题（只能是 light 或 dark）
type ResolvedTheme = 'light' | 'dark';

// 主题上下文接口
interface ThemeContextType {
  /** 当前设置的主题（可能为 'system'） */
  theme: Theme;
  /** 实际应用的主题（'light' 或 'dark'） */
  resolvedTheme: ResolvedTheme;
  /** 设置主题 */
  setTheme: (theme: Theme) => void;
  /** 切换主题（light -> dark -> system -> light） */
  toggleTheme: () => void;
  /** 当前是否为暗色主题 */
  isDark: boolean;
}

// 创建上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供者 Props
interface ThemeProviderProps {
  children: React.ReactNode;
  /** 默认主题 */
  defaultTheme?: Theme;
  /** localStorage 键名 */
  storageKey?: string;
  /** 是否禁用系统主题检测 */
  disableTransitionOnChange?: boolean;
}

// 从 localStorage 读取主题
function getInitialTheme(storageKey: string, defaultTheme: Theme): Theme {
  if (typeof window === 'undefined') return defaultTheme;
  
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch (e) {
    // localStorage 可能不可用
  }
  
  return defaultTheme;
}

// 获取系统主题偏好
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
}

// 主题提供者组件
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'zenui-theme',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => 
    getInitialTheme(storageKey, defaultTheme)
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (theme === 'system') return getSystemTheme();
    return theme;
  });

  // 应用主题到 DOM
  const applyTheme = useCallback((newResolvedTheme: ResolvedTheme) => {
    const root = document.documentElement;
    
    // 移除旧主题
    root.classList.remove('light', 'dark');
    
    // 添加新主题
    root.classList.add(newResolvedTheme);
    
    // 设置 data-theme 属性（可选，用于 CSS 选择器）
    root.setAttribute('data-theme', newResolvedTheme);
  }, []);

  // 设置主题
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    // 保存到 localStorage
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      // localStorage 可能不可用
    }
    
    // 计算实际应用的主题
    const newResolvedTheme = newTheme === 'system' 
      ? getSystemTheme() 
      : newTheme;
    
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  }, [applyTheme, storageKey]);

  // 切换主题（light -> dark -> system -> light）
  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  // 监听系统主题变化
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const newResolvedTheme = getSystemTheme();
      setResolvedTheme(newResolvedTheme);
      applyTheme(newResolvedTheme);
    };
    
    // 使用 addEventListener（现代浏览器）
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, applyTheme]);

  // 初始化主题
  useEffect(() => {
    const initialResolvedTheme = theme === 'system' 
      ? getSystemTheme() 
      : theme;
    
    setResolvedTheme(initialResolvedTheme);
    applyTheme(initialResolvedTheme);
  }, []); // 只在组件挂载时执行一次

  // 处理禁用过渡动画
  useEffect(() => {
    if (!disableTransitionOnChange) return;
    
    const root = document.documentElement;
    
    const disableTransitions = () => {
      root.style.setProperty('--transition-duration', '0ms');
    };
    
    const enableTransitions = () => {
      root.style.removeProperty('--transition-duration');
    };
    
    disableTransitions();
    const timeout = setTimeout(enableTransitions, 0);
    
    return () => clearTimeout(timeout);
  }, [resolvedTheme, disableTransitionOnChange]);

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用主题的 Hook
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// 便捷 Hook：用于在组件中快速切换主题
export function useThemeToggle() {
  const { toggleTheme, isDark, setTheme } = useTheme();
  
  return {
    toggle: toggleTheme,
    setLight: () => setTheme('light'),
    setDark: () => setTheme('dark'),
    setSystem: () => setTheme('system'),
    isDark,
    isLight: !isDark,
  };
}

// 重新导出类型
export type { Theme, ResolvedTheme, ThemeContextType, ThemeProviderProps };