import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell } from "./app-shell";

const meta = {
  title: "Patterns/AppShell",
  component: AppShell,
  args: {
    navigation: (
      <div className="stack">
        <a href="#home">ホーム</a>
        <a href="#settings">設定</a>
      </div>
    ),
    children: (
      <div className="stack">
        <h2>作業領域</h2>
        <p>Tabキーでスキップリンクとメニューを確認できます。</p>
      </div>
    ),
    aside: <p>補助情報</p>,
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
