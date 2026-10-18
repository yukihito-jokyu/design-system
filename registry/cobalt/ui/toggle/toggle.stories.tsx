import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BookmarkIcon } from "lucide-react";
import { Toggle } from "./toggle";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Cobalt/UI/Toggle",
  component: Toggle,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", variant: "outline", "aria-label": "お気に入り" },
  argTypes: {
    motion: {
      description:
        "押した状態の確定を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Toggle>) {
  const [pressed, setPressed] = useState(args.defaultPressed ?? false);
  return (
    <Toggle {...args} pressed={pressed} onPressedChange={setPressed}>
      <BookmarkIcon aria-hidden="true" />
      お気に入り
    </Toggle>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Pressed: Story = { ...Default, args: { defaultPressed: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
export const Small: Story = { ...Default, args: { size: "sm" } };

export const Large: Story = { ...Default, args: { size: "lg" } };

export const Keyboard: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("button", { name: "お気に入り" });
    toggle.focus();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.keyboard(" ");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(getComputedStyle(toggle).color).toBe("rgb(255, 255, 255)");
    await expect(getComputedStyle(toggle).backgroundImage).toContain("linear-gradient");
    await userEvent.keyboard("{Enter}");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.keyboard("{Enter}");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
  },
};

export const KeyboardMotionOff: Story = { ...Keyboard, args: { motion: "off" } };
