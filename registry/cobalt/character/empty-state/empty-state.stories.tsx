import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { EmptyState } from "./empty-state";
import { Button } from "../../ui/button/button";

const meta = {
  title: "Cobalt/Character/EmptyState",
  component: EmptyState,
  parameters: { designSystem: "cobalt" },
  args: {
    title: "記事はまだありません",
    description: "最初の記事を作成して、伝えたいことをまとめましょう。",
    motion: "inherit",
  },
  argTypes: {
    kind: { control: "select", options: ["initial", "search", "filter"] },
    motion: {
      description:
        "空の状態から次の行動を促す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof EmptyState>) {
  const [created, setCreated] = useState(false);
  return (
    <div className="cobalt-stack" style={{ width: "100%", maxWidth: 640 }}>
      <EmptyState
        {...args}
        action={<Button onClick={() => setCreated(true)}>記事を作成する</Button>}
      />
      <p className="cobalt-note" role="status">
        {created && "新しい下書きを作成しました。"}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };

export const Search: Story = {
  args: {
    kind: "search",
    title: "記事が見つかりません",
    description: "キーワードを変えて、もう一度検索してください。",
  },
};

export const Filter: Story = {
  args: {
    kind: "filter",
    title: "条件に合う記事はありません",
    description: "絞り込み条件を見直してください。",
  },
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
