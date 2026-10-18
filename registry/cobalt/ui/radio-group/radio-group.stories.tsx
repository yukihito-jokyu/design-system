import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "@/registry/cobalt/ui/label/label";

const meta = {
  title: "Cobalt/UI/RadioGroup",
  component: RadioGroup,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", "aria-label": "公開状況" },
  argTypes: {
    motion: {
      description:
        "選んだ一つへ視線を導く。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof RadioGroup>) {
  const id = useId();
  const [value, setValue] = useState("draft");
  return (
    <RadioGroup {...args} value={value} onValueChange={setValue}>
      {[
        ["draft", "下書きで保存"],
        ["review", "確認を依頼"],
        ["publish", "すぐに公開"],
      ].map(([key, label]) => (
        <div className="cobalt-choice" key={key}>
          <RadioGroupItem id={`${id}-${key}`} value={key} />
          <Label htmlFor={`${id}-${key}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Disabled: Story = { ...Default, args: { disabled: true } };

export const Invalid: Story = { ...Default, args: { "aria-invalid": true } };
