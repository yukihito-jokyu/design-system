import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "./popover";
import { Button } from "@/registry/cobalt/ui/button/button";

const meta = {
  title: "Cobalt/UI/Popover",
  component: Popover,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "補足を操作した場所から取り出す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Popover>) {
  return (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">公開設定を確認</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="公開設定">
        <PopoverHeader>
          <PopoverTitle>公開設定</PopoverTitle>
          <PopoverDescription>公開後は誰でも記事を閲覧できます。</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Open: Story = { ...Default, args: { defaultOpen: true } };

export const MotionInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "公開設定を確認" });
    await userEvent.click(trigger);
    const doc = canvasElement.ownerDocument;
    await waitFor(() => expect(doc.querySelector('[data-slot="popover-content"]')).toBeVisible());
    const popup = doc.querySelector<HTMLElement>('[data-slot="popover-content"]')!;
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
    await userEvent.keyboard("{Escape}");
    await expect(popup).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
