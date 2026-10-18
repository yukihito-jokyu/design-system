import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider } from "./slider";

const meta = {
  title: "Cobalt/UI/Slider",
  component: Slider,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", min: 0, max: 100, step: 5, defaultValue: [50], thumbLabels: ["音量"] },
  argTypes: {
    motion: {
      description:
        "ドラッグ中のつまみを掴んだ感覚を作る。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Slider>) {
  const [value, setValue] = useState(args.defaultValue ?? [50]);
  return (
    <div className="cobalt-stack">
      <p className="cobalt-note" role="status">
        設定値：{value.join("〜")}
      </p>
      <Slider {...args} value={value} onValueChange={setValue} />
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Range: Story = {
  ...Default,
  args: { defaultValue: [20, 80], thumbLabels: ["最小値", "最大値"] },
};

export const Vertical: Story = { ...Default, args: { orientation: "vertical" } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
