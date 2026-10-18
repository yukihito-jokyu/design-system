import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { DatePicker, dateText } from "./date-picker";
import { Label } from "@/registry/cobalt/ui/label/label";

const meta = {
  title: "Cobalt/UI/DatePicker",
  component: DatePicker,
  parameters: { designSystem: "cobalt" },
  args: { label: "公開日", onValueChange: () => {}, motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "日付入力と候補の関係を見失わせない。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof DatePicker>) {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 17));
  return (
    <div className="cobalt-field">
      <Label htmlFor={id}>{args.label}</Label>
      <DatePicker {...args} id={id} value={date} onValueChange={setDate} />
      <p className="cobalt-note" role="status">
        選択日：{dateText(date) || "未選択"}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Disabled: Story = { ...Default, args: { disabled: true } };

export const Restricted: Story = {
  ...Default,
  args: { disabledDate: (date) => date < new Date(2026, 9, 17) },
};
