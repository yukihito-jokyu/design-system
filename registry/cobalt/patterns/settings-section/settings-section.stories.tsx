import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "../form-field/form-field";
import { Input } from "@/registry/cobalt/ui/input/input";
import { SettingsSection } from "./settings-section";

const meta = {
  title: "Cobalt/Patterns/SettingsSection",
  parameters: { designSystem: "cobalt" },
  component: SettingsSection,
  argTypes: {
    headingLevel: { control: "select", options: [2, 3] },
    motion: {
      description:
        "設定のまとまりを読みやすく保つ。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    title: "プロフィール",
    description: "表示名を変更できます。",
    children: <FormField label="表示名">{(binding) => <Input {...binding} />}</FormField>,
  },
} satisfies Meta<typeof SettingsSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const HeadingLevelTwo: Story = { args: { headingLevel: 2 } };

export const Interaction: Story = {
  ...Default,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "表示名" });
    if (args.motion === "off") {
      await expect(input).toHaveAttribute("data-cobalt-motion", "off");
      await expect(getComputedStyle(input).transitionDuration).toBe("0s");
    }
    await userEvent.type(input, "山田");
    await expect(input).toHaveValue("山田");
  },
};

export const InteractionMotionOff: Story = { ...Interaction, args: { motion: "off" } };
