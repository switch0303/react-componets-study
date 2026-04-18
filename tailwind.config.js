/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 使用 class 策略，通过 .dark 类切换暗色主题
  content: [
    "./packages/**/*.{js,ts,jsx,tsx}",
    "./playground/**/*.{js,ts,jsx,tsx}",
    "./docs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 颜色系统 - 使用 CSS 变量
      colors: {
        // 背景色
        background: 'var(--color-background)',
        'background-primary': 'var(--color-background-primary)',
        'background-secondary': 'var(--color-background-secondary)',
        
        // 前景色（文字）
        foreground: 'var(--color-foreground)',
        'foreground-primary': 'var(--color-foreground-primary)',
        'foreground-secondary': 'var(--color-foreground-secondary)',
        'foreground-muted': 'var(--color-foreground-muted)',
        
        // 主色调
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          foreground: 'var(--color-primary-foreground)',
        },
        
        // 次要色
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          active: 'var(--color-secondary-active)',
          foreground: 'var(--color-secondary-foreground)',
        },
        
        // 强调色
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          foreground: 'var(--color-accent-foreground)',
        },
        
        // 危险色
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          hover: 'var(--color-destructive-hover)',
          active: 'var(--color-destructive-active)',
          foreground: 'var(--color-destructive-foreground)',
        },
        
        // 成功色
        success: {
          DEFAULT: 'var(--color-success)',
          hover: 'var(--color-success-hover)',
          foreground: 'var(--color-success-foreground)',
        },
        
        // 警告色
        warning: {
          DEFAULT: 'var(--color-warning)',
          hover: 'var(--color-warning-hover)',
          foreground: 'var(--color-warning-foreground)',
        },
        
        // 边框
        border: {
          DEFAULT: 'var(--color-border)',
          hover: 'var(--color-border-hover)',
          active: 'var(--color-border-active)',
        },
        
        // 输入框
        input: {
          DEFAULT: 'var(--color-input)',
          hover: 'var(--color-input-hover)',
          focus: 'var(--color-input-focus)',
        },
        
        // 焦点环
        ring: {
          DEFAULT: 'var(--color-ring)',
          offset: 'var(--color-ring-offset)',
        },
        
        // 禁用状态
        disabled: {
          DEFAULT: 'var(--color-disabled)',
          foreground: 'var(--color-disabled-foreground)',
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
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
        '32': 'var(--spacing-32)',
        '40': 'var(--spacing-40)',
        '48': 'var(--spacing-48)',
        '56': 'var(--spacing-56)',
        '64': 'var(--spacing-64)',
      },
      
      // 字体系统
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
        '8xl': 'var(--font-size-8xl)',
        '9xl': 'var(--font-size-9xl)',
      },
      
      fontWeight: {
        thin: 'var(--font-weight-thin)',
        extralight: 'var(--font-weight-extralight)',
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
        black: 'var(--font-weight-black)',
      },
      
      lineHeight: {
        '3': 'var(--line-height-3)',
        '4': 'var(--line-height-4)',
        '5': 'var(--line-height-5)',
        '6': 'var(--line-height-6)',
        '7': 'var(--line-height-7)',
        '8': 'var(--line-height-8)',
        '9': 'var(--line-height-9)',
        '10': 'var(--line-height-10)',
        none: 'var(--line-height-none)',
        tight: 'var(--line-height-tight)',
        snug: 'var(--line-height-snug)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },
      
      letterSpacing: {
        tighter: 'var(--letter-spacing-tighter)',
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
        widest: 'var(--letter-spacing-widest)',
      },
      
      // 圆角系统
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },
      
      // 阴影系统
      boxShadow: {
        none: 'var(--shadow-none)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        ring: 'var(--shadow-ring)',
      },
      
      // 过渡动画
      transitionDuration: {
        '0': 'var(--duration-0)',
        '75': 'var(--duration-75)',
        '100': 'var(--duration-100)',
        '150': 'var(--duration-150)',
        '200': 'var(--duration-200)',
        '300': 'var(--duration-300)',
        '500': 'var(--duration-500)',
        '700': 'var(--duration-700)',
        '1000': 'var(--duration-1000)',
      },
      
      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      
      // Z-Index
      zIndex: {
        '0': 'var(--z-index-0)',
        '10': 'var(--z-index-10)',
        '20': 'var(--z-index-20)',
        '30': 'var(--z-index-30)',
        '40': 'var(--z-index-40)',
        '50': 'var(--z-index-50)',
        auto: 'var(--z-index-auto)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        toast: 'var(--z-toast)',
      },
    },
  },
  plugins: [],
};