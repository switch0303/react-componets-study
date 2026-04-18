// 主题系统入口文件
export { ThemeProvider, useTheme, useThemeToggle } from './ThemeContext';
export type { 
  Theme, 
  ResolvedTheme, 
  ThemeContextType, 
  ThemeProviderProps 
} from './ThemeContext';

// 导入 CSS 变量（用户需要在使用主题时导入）
import './styles.css';
