import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/registry/new-york/ui/input/input";
import { FormField } from "./form-field";

const meta = {
  title: "Patterns/FormField",
  component: FormField,
  args: {
    label: "メールアドレス",
    description: "連絡可能なアドレスを入力してください。",
    children: (binding) => <Input type="email" {...binding} />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Required: Story = { args: { required: true } };

export const Error: Story = {
  args: { required: true, error: "メールアドレスを入力してください。" },
};
