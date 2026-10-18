import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { Switch } from "./switch";
import { Label } from "@/registry/cobalt/ui/label/label";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Cobalt/UI/Switch",
  component: Switch,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "切り替えをつまみの移動で追えるようにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Switch>) {
  const id = useId();
  const [checked, setChecked] = useState(args.defaultChecked ?? false);
  return (
    <div className="cobalt-stack">
      <div className="cobalt-choice">
        <Switch {...args} id={id} checked={checked} onCheckedChange={setChecked} />
        <Label htmlFor={id}>メールで更新を受け取る</Label>
      </div>
      <p className="cobalt-note" role="status">
        通知：{checked ? "ON" : "OFF"}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Checked: Story = { ...Default, args: { defaultChecked: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Small: Story = { ...Default, args: { size: "sm" } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
export const Invalid: Story = { ...Default, args: { "aria-invalid": true } };

export const Keyboard: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole("switch", { name: "メールで更新を受け取る" });
    control.focus();
    await userEvent.keyboard(" ");
    await expect(control).toBeChecked();
    const thumb = control.querySelector(".cobalt-switch-thumb")!;
    const animations = thumb.getAnimations();
    if (control.dataset.cobaltMotion === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect)
            .getKeyframes()
            .some((frame) => frame.scale === "0.84 1.12"),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
    await expect(canvas.getByRole("status")).toHaveTextContent("通知：ON");
    await expect(getComputedStyle(control, "::before").backgroundImage).toContain(
      "linear-gradient",
    );
    await userEvent.keyboard(" ");
    await expect(control).not.toBeChecked();
    await userEvent.click(canvas.getByText("メールで更新を受け取る"));
    await expect(control).toBeChecked();
    await expect(control).toHaveFocus();
  },
};

export const KeyboardMotionOff: Story = { ...Keyboard, args: { motion: "off" } };
