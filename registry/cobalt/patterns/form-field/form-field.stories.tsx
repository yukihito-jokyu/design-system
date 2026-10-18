import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./form-field";
import { Input } from "@/registry/cobalt/ui/input/input";

const meta = {
  title: "Cobalt/Patterns/FormField",
  component: FormField,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "入力の手がかりを安定して示す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    label: "タイトル",
    required: true,
    description: "120文字以内で入力してください。",
    children: (binding) => <Input {...binding} placeholder="タイトルを入力してください" />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <FormField {...args} /> };
export const Invalid: Story = { ...Default, args: { error: "タイトルを入力してください。" } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
