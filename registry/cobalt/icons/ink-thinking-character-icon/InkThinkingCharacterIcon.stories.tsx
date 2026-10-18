import type { Meta, StoryObj } from "@storybook/react-vite";
import { InkThinkingCharacterIcon } from "./InkThinkingCharacterIcon";

const meta = {
  title: "Cobalt/Icons/InkThinkingCharacterIcon",
  component: InkThinkingCharacterIcon,
  parameters: { designSystem: "cobalt" },
  args: { size: 48, label: "InkThinkingCharacterIcon" },
  argTypes: { size: { control: { type: "number", min: 12, max: 512 } } },
} satisfies Meta<typeof InkThinkingCharacterIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 24 } };
export const Large: Story = { args: { size: 96 } };
export const Decorative: Story = { args: { label: "" } };
