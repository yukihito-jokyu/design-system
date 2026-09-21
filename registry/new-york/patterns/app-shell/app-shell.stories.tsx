import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AppShell } from "./app-shell";

const meta = {
  title: "Patterns/AppShell",
  component: AppShell,
  args: {
    navigation: (
      <a href="#home" aria-current="page">
        ホーム
      </a>
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

function Example(args: React.ComponentProps<typeof AppShell>) {
  const [current, setCurrent] = useState<"home" | "settings">("home");

  const navigation = (
    <div className="stack">
      <a
        href="#home"
        aria-current={current === "home" ? "page" : undefined}
        onClick={() => setCurrent("home")}
      >
        ホーム
      </a>
      <a
        href="#settings"
        aria-current={current === "settings" ? "page" : undefined}
        onClick={() => setCurrent("settings")}
      >
        設定
      </a>
    </div>
  );

  return <AppShell {...args} navigation={navigation} />;
}

export const Default: Story = { render: (args) => <Example {...args} /> };

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
