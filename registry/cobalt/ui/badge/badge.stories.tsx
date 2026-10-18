import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Cobalt/UI/Badge",
  component: Badge,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", children: "公開済み", variant: "success" },
  argTypes: {
    motion: {
      description:
        "状態の変化を文字の位置を変えずに伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
    variant: {
      control: "select",
      options: [
        "default",
        "success",
        "warning",
        "destructive",
        "secondary",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Pending: Story = { args: { children: "確認待ち", variant: "warning" } };
export const NeedsRevision: Story = { args: { children: "要修正", variant: "destructive" } };
export const Draft: Story = { args: { children: "下書き", variant: "secondary" } };

export const MotionOn: Story = {
  args: { motion: "on" },
  parameters: {
    docs: {
      description: { story: "Controlsのvariantを変更すると、状態の変化時の動きを確認できます。" },
    },
  },
};

export const MotionOff: Story = { ...MotionOn, args: { motion: "off" } };
