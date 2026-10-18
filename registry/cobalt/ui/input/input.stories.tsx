import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "./input";

const meta = {
  title: "Cobalt/UI/Input",
  component: Input,
  parameters: { designSystem: "cobalt" },
  args: {
    "aria-label": "お名前",
    placeholder: "お名前を入力してください",
    controlSize: "md",
    motion: "inherit",
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    controlSize: { control: "select", options: ["sm", "md", "lg"] },
    motion: {
      description:
        "入力の場所と修正が必要な場所を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { controlSize: "sm" } };
export const Large: Story = { args: { controlSize: "lg" } };
export const Disabled: Story = { args: { disabled: true } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: "入力済みのお名前" } };

export const Error: Story = {
  args: {
    type: "email",
    "aria-label": "メールアドレス",
    "aria-invalid": true,
    "aria-describedby": "cobalt-input-error",
    defaultValue: "hello@",
  },
  render: (args) => (
    <div>
      <Input {...args} />
      <p id="cobalt-input-error" style={{ color: "var(--cobalt-danger-action)" }}>
        メールアドレスを確認してください。
      </p>
    </div>
  ),
};

export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };

function ValidationExample(args: React.ComponentProps<typeof Input>) {
  const [invalid, setInvalid] = useState(false);
  return (
    <Input
      {...args}
      aria-invalid={invalid}
      onKeyDown={(event) => {
        if (event.key === "Enter") setInvalid(true);
      }}
    />
  );
}

export const MotionInteraction: Story = {
  render: (args) => <ValidationExample {...args} />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "お名前" });
    await userEvent.type(input, "入力を保持{Enter}");
    const animations = input.getAnimations();
    if (input.dataset.cobaltMotion === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect).getKeyframes().some((frame) => "translate" in frame),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
    await expect(input).toHaveValue("入力を保持");
    await expect(input).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
