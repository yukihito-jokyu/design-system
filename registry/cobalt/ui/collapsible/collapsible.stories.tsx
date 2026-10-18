import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "../button/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible";

const meta = {
  title: "Cobalt/UI/Collapsible",
  component: Collapsible,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "追加情報の出現位置を見失わせない。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Collapsible>) {
  const [open, setOpen] = useState(args.defaultOpen ?? false);
  return (
    <Collapsible
      {...args}
      open={open}
      onOpenChange={setOpen}
      style={{ maxWidth: 560, ...args.style }}
    >
      <CollapsibleTrigger asChild>
        <Button variant="outline" disabled={args.disabled}>
          {open ? <ChevronUpIcon aria-hidden="true" /> : <ChevronDownIcon aria-hidden="true" />}
          {open ? "詳細を閉じる" : "詳細を表示"}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="cobalt-note">
          相談時間は約30分です。オンライン・対面のどちらでもご参加いただけます。
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Open: Story = { ...Default, args: { defaultOpen: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
