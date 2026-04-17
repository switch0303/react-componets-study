// 使用相对路径导入 Button 组件
import { Button } from "../../packages/components/src/Button";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          ZenUI Button 组件演示
        </h1>

        {/* 变体展示 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">变体</h2>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">尺寸</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">小</Button>
            <Button size="md">中</Button>
            <Button size="lg">大</Button>
            <Button size="icon">🔔</Button>
          </div>
        </section>

        {/* 状态展示 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">状态</h2>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">组合</h2>
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
      </div>
    </div>
  );
}

export default App;
