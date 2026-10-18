import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "Cobalt/UI/ToggleGroup",
  component: ToggleGroup,
  parameters: { designSystem: "cobalt" },
  args: {
    type: "single",
    defaultValue: "all",
    variant: "outline",
    spacing: 2,
    motion: "inherit",
    "aria-label": "表示する記事",
  },
  argTypes: {
    motion: {
      description:
        "複数の選択操作に統一した手応えを付ける。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof ToggleGroup>) {
  return (
    <ToggleGroup {...args}>
      {[
        ["all", "すべて"],
        ["published", "公開済み"],
        ["draft", "下書き"],
      ].map(([value, label]) => (
        <ToggleGroupItem key={value} value={value}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Multiple: Story = {
  ...Default,
  args: { type: "multiple", defaultValue: ["published", "draft"] },
};

export const Joined: Story = { ...Default, args: { spacing: 0 } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
