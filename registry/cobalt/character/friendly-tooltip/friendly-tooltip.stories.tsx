import type { Meta, StoryObj } from "@storybook/react-vite";
import { FriendlyTooltip } from "./friendly-tooltip";
import { Button } from "../../ui/button/button";
import { TooltipProvider } from "../../ui/tooltip/tooltip";

const meta = {
  title: "Cobalt/Character/FriendlyTooltip",
  component: FriendlyTooltip,
  parameters: { designSystem: "cobalt" },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  args: {
    content: "下書きは自分だけが閲覧できます。",
    children: <Button variant="outline">下書きについて</Button>,
    motion: "inherit",
  },
  argTypes: {
    motion: {
      description:
        "短い案内を気軽に確かめられるようにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof FriendlyTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };
