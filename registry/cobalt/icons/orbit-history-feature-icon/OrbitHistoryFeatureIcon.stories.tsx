import type { Meta, StoryObj } from "@storybook/react-vite";
import { OrbitHistoryFeatureIcon } from "./OrbitHistoryFeatureIcon";

const meta = {
  title: "Cobalt/Icons/OrbitHistoryFeatureIcon",
  component: OrbitHistoryFeatureIcon,
  parameters: { designSystem: "cobalt" },
  args: { size: 48, label: "OrbitHistoryFeatureIcon" },
  argTypes: { size: { control: { type: "number", min: 12, max: 512 } } },
} satisfies Meta<typeof OrbitHistoryFeatureIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 24 } };
export const Large: Story = { args: { size: 96 } };
export const Decorative: Story = { args: { label: "" } };
