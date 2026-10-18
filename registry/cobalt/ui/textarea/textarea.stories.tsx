import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";

const meta = {
  title: "Cobalt/UI/Textarea",
  component: Textarea,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "長文入力を妨げずエラーを伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: { "aria-label": "概要", placeholder: "概要を入力してください", motion: "inherit" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <Textarea {...args} /> };
export const Invalid: Story = { ...Default, args: { "aria-invalid": true } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
