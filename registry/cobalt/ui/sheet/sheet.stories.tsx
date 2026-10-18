import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./sheet";
import { Button } from "@/registry/cobalt/ui/button/button";

const meta = {
  title: "Cobalt/UI/Sheet",
  component: Sheet,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "パネルが現れる方向を伝える。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Sheet>) {
  return (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button type="button" variant="outline">
          メニューを開く
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>メニュー</SheetTitle>
          <SheetDescription>表示するページを選択してください。</SheetDescription>
        </SheetHeader>
        <p className="cobalt-note">動きを止めても、この内容と閉じる操作は維持されます。</p>
        <SheetClose asChild>
          <Button type="button" variant="outline">
            メニューを閉じる
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const MotionInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "メニューを開く" });
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    const dialog = body.getByRole("dialog");
    const animations = dialog.getAnimations();
    if (dialog.dataset.cobaltMotion === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect).getKeyframes().some((frame) => "translate" in frame),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
    await userEvent.keyboard("{Escape}");
    await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
