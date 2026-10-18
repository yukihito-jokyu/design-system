import type { Meta, StoryObj } from "@storybook/react-vite";
import { OrbitSavedStatusIcon } from "./OrbitSavedStatusIcon";

const meta = {
  title: "Cobalt/Icons/OrbitSavedStatusIcon",
  component: OrbitSavedStatusIcon,
  parameters: { designSystem: "cobalt" },
  args: { size: 48, label: "OrbitSavedStatusIcon" },
  argTypes: { size: { control: { type: "number", min: 12, max: 512 } } },
} satisfies Meta<typeof OrbitSavedStatusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 24 } };
export const Large: Story = { args: { size: 96 } };
export const Decorative: Story = { args: { label: "" } };
