import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Cobalt/UI/Checkbox",
  component: Checkbox,
  parameters: { designSystem: "cobalt" },
  args: { "aria-label": "記事を選択", disabled: false, motion: "inherit" },
  argTypes: {
    checked: { control: "select", options: [false, true, "indeterminate"] },
    motion: {
      description:
        "選択が確定する小さな達成感を作る。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { checked: "indeterminate" } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { "aria-invalid": true } };
export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };

export const MotionInteraction: Story = {
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", { name: "記事を選択" });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    const animations = checkbox.getAnimations({ subtree: true });
    if (checkbox.dataset.cobaltMotion === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect)
            .getKeyframes()
            .some((frame) => "strokeDashoffset" in frame),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
    await expect(checkbox).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
