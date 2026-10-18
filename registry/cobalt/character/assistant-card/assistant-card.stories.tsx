import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AssistantCard } from "./assistant-card";
import { directions } from "../character-icons/index";

const meta = {
  title: "Cobalt/Character/AssistantCard",
  component: AssistantCard,
  parameters: { designSystem: "cobalt" },
  args: {
    title: "記事づくりをお手伝いします",
    body: "下書きの内容をもとに、次の作業を選べます。",
    direction: "fold",
    motion: "inherit",
  },
  argTypes: {
    direction: { control: "select", options: directions },
    motion: {
      description:
        "案内を親しみやすく迎える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof AssistantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof AssistantCard>) {
  const [selected, setSelected] = useState("");
  return (
    <div className="cobalt-stack" style={{ width: "100%", maxWidth: 640 }}>
      <AssistantCard
        {...args}
        suggestions={[
          { label: "見出しを考える", onSelect: () => setSelected("見出しを考える") },
          { label: "文章を整える", onSelect: () => setSelected("文章を整える") },
        ]}
      />
      <p className="cobalt-note" role="status">
        {selected && `「${selected}」を選びました。`}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Thinking: Story = { ...Default, args: { status: "thinking" } };
export const Saved: Story = { ...Default, args: { status: "saved" } };
export const MotionOn: Story = { ...Thinking, args: { status: "thinking", motion: "on" } };
export const MotionOff: Story = { ...Thinking, args: { status: "thinking", motion: "off" } };
