import type { Meta, StoryObj } from "@storybook/react-vite";
import { XIcon } from "lucide-react";
import { IconButton } from "./icon-button";

const meta = {
  title: "Cobalt/UI/IconButton",
  component: IconButton,
  parameters: { designSystem: "cobalt" },
  args: {
    "aria-label": "閉じる",
    children: <XIcon />,
    variant: "secondary",
    size: "md",
    motion: "inherit",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    motion: {
      description:
        "小さな操作にも手応えを返す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };
