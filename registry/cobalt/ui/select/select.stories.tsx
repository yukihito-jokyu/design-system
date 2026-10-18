import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Cobalt/UI/Select",
  component: Select,
  parameters: { designSystem: "cobalt" },
  argTypes: {
    motion: {
      description:
        "選択肢が操作した場所から現れるようにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: { defaultValue: "下書き", motion: "inherit" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-label="公開状況">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        {["公開済み", "確認待ち", "要修正", "下書き"].map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = { ...Default, args: { disabled: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Keyboard: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("combobox", { name: "公開状況" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(body.getByRole("listbox")).toBeVisible());
    const popup = body.getByRole("listbox");
    if (popup.dataset.cobaltMotion === "on") {
      await waitFor(() =>
        expect(
          popup
            .getAnimations()
            .some((animation) =>
              (animation.effect as KeyframeEffect)
                .getKeyframes()
                .some((frame) => parseFloat(String(frame.scale)) < 1),
            ),
        ).toBe(true),
      );
      await Promise.allSettled(popup.getAnimations().map((animation) => animation.finished));
    } else await expect(popup.getAnimations()).toHaveLength(0);
    await userEvent.keyboard("{Home}{Enter}");
    await waitFor(() => expect(body.queryByRole("listbox")).not.toBeInTheDocument());
    await expect(trigger).toHaveTextContent("公開済み");
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(body.getByRole("listbox")).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(body.queryByRole("listbox")).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveTextContent("公開済み");
  },
};

export const KeyboardMotionOff: Story = { ...Keyboard, args: { motion: "off" } };
