import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { Button } from "../button/button";
import { Progress } from "./progress";

const meta = {
  title: "Cobalt/UI/Progress",
  component: Progress,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", value: 40 },
  argTypes: {
    motion: {
      description:
        "前進と到達を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Progress>) {
  const [value, setValue] = useState(args.value ?? 0);
  const id = useId();
  const max = args.max && args.max > 0 ? args.max : 100;
  return (
    <div className="cobalt-stack" style={{ width: "100%", maxWidth: 480 }}>
      <p id={id} className="cobalt-note">
        アップロードの進捗：{Math.round((value / max) * 100)}%
      </p>
      <Progress {...args} value={value} aria-labelledby={id} />
      <div className="cobalt-actions">
        <Button
          size="sm"
          disabled={value >= max}
          onClick={() => setValue(Math.min(max, value + max / 10))}
        >
          進める
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(0)}>
          リセット
        </Button>
      </div>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Empty: Story = { ...Default, args: { value: 0 } };
export const Complete: Story = { ...Default, args: { value: 100 } };
export const CustomMax: Story = { ...Default, args: { value: 2, max: 5 } };

export const Indeterminate: Story = {
  render: (args) => (
    <div className="cobalt-stack" style={{ width: "100%", maxWidth: 480 }}>
      <p className="cobalt-note">アップロードの準備中です。</p>
      <Progress {...args} value={null} aria-label="アップロードの準備中" />
    </div>
  ),
};

export const IndeterminateMotionOff: Story = {
  ...Indeterminate,
  args: { motion: "off" },
};
