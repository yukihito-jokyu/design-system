import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SuggestionChip } from "./suggestion-chip";

const meta = {
  title: "Cobalt/Character/SuggestionChip",
  component: SuggestionChip,
  parameters: { designSystem: "cobalt" },
  args: { label: "文章を読みやすく整える", onSelect: () => {}, motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "提案を選ぶ行為に小さな手応えを付ける。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof SuggestionChip>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof SuggestionChip>) {
  const [selected, setSelected] = useState(false);
  return (
    <div className="cobalt-stack" style={{ alignItems: "flex-start" }}>
      <SuggestionChip
        {...args}
        onSelect={() => {
          args.onSelect();
          setSelected(true);
        }}
      />
      <p className="cobalt-note" role="status">
        {selected && "提案を選びました。"}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Disabled: Story = { ...Default, args: { disabled: true } };

export const LongLabel: Story = {
  ...Default,
  args: { label: "初めて読む人にも伝わるように文章を整理する" },
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
