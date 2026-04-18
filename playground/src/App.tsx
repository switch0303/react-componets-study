// 使用 Vite 别名导入组件
import { Button, ThemeToggle } from "@zenui/components";
import { ThemeProvider } from "@zenui/theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background p-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* 头部：标题和主题切换 */}
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground transition-colors duration-300">
              ZenUI 组件演示
            </h1>
            <ThemeToggle variant="outline" showLabel />
          </header>

          {/* 主题说明 */}
          <section className="mb-8 p-4 bg-background-secondary rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              🎨 主题系统
            </h2>
            <p className="text-foreground-secondary">
              点击右上角的切换按钮，可以在亮色、暗色和系统主题之间切换。
              主题切换会自动保存到 localStorage。
            </p>
          </section>

          {/* 变体展示 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-300">
              按钮变体
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">默认</Button>
              <Button variant="primary">主要</Button>
              <Button variant="secondary">次要</Button>
              <Button variant="outline">描边</Button>
              <Button variant="ghost">幽灵</Button>
              <Button variant="destructive">危险</Button>
            </div>
          </section>

          {/* 尺寸展示 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-300">
              按钮尺寸
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">小</Button>
              <Button size="md">中</Button>
              <Button size="lg">大</Button>
              <Button size="icon">🔔</Button>
            </div>
          </section>

          {/* 状态展示 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-300">
              按钮状态
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button disabled>禁用</Button>
              <Button loading>加载中</Button>
              <Button disabled loading>
                禁用+加载
              </Button>
            </div>
          </section>

          {/* 组合示例 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-300">
              组合使用
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                大号主要按钮
              </Button>
              <Button variant="secondary" size="sm">
                小号次要按钮
              </Button>
              <Button variant="outline" loading>
                加载中的描边按钮
              </Button>
              <Button variant="ghost" disabled>
                禁用的幽灵按钮
              </Button>
            </div>
          </section>

          {/* 页脚 */}
          <footer className="mt-12 pt-8 border-t border-border">
            <p className="text-center text-foreground-muted text-sm">
              ZenUI React 组件库 - 学习与演示项目
            </p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;