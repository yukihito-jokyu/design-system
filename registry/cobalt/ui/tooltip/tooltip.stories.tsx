import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { InfoIcon } from "lucide-react";
import { Button } from "../button/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./tooltip";

const meta = {
  title: "Cobalt/UI/Tooltip",
  component: Tooltip,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "短い補足を軽く現し、操作を邪魔しない。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Tooltip>) {
  return (
    <div className="cobalt-stack" style={{ maxWidth: 480 }}>
      <p className="cobalt-note">無料相談はオンラインでも受け付けています。</p>
      <TooltipProvider>
        <Tooltip {...args}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="オンライン相談の補足"
              style={{ alignSelf: "flex-start" }}
            >
              <InfoIcon aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            カメラとマイクが使える端末から参加できます。
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Open: Story = { ...Default, args: { defaultOpen: true } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const OpenMotionOff: Story = {
  ...Default,
  args: { motion: "off", defaultOpen: true },
};

export const MotionInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "オンライン相談の補足" });
    trigger.focus();
    const doc = canvasElement.ownerDocument;
    await waitFor(() => expect(doc.querySelector('[data-slot="tooltip-content"]')).toBeVisible());
    const popup = doc.querySelector<HTMLElement>('[data-slot="tooltip-content"]')!;
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
