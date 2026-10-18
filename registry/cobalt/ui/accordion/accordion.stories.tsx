import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button/button";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

const meta = {
  title: "Cobalt/UI/Accordion",
  component: Accordion,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", type: "single", collapsible: true, defaultValue: "reservation" },
  argTypes: {
    motion: {
      description:
        "説明がその場でほどけるように開く。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...args} style={{ maxWidth: 640, ...args.style }}>
      <AccordionItem value="reservation">
        <AccordionTrigger>無料相談はどのように予約できますか？</AccordionTrigger>
        <AccordionContent>
          予約フォームでお名前とメールアドレスを入力してください。担当者が日程をご案内します。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="cancel">
        <AccordionTrigger>予約後に日程を変更できますか？</AccordionTrigger>
        <AccordionContent>
          はい。予約確認メールに記載された連絡先へ、ご希望の日程をお知らせください。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="disabled" disabled>
        <AccordionTrigger>準備中のご案内</AccordionTrigger>
        <AccordionContent>現在準備中です。</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Multiple: Story = {
  ...Default,
  args: { type: "multiple", defaultValue: ["reservation", "cancel"] },
};

export const Closed: Story = { ...Default, args: { defaultValue: "" } };
export const Disabled: Story = { ...Default, args: { disabled: true } };

export const MotionInteraction: Story = {
  ...Closed,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "無料相談はどのように予約できますか？" });
    await userEvent.click(trigger);

    const content = await canvas.findByRole("region", {
      name: "無料相談はどのように予約できますか？",
    });

    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const animations = content.getAnimations();
    if (content.dataset.cobaltMotion === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect).getKeyframes().some((frame) => "height" in frame),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
    await expect(content).toBeVisible();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(content).not.toBeVisible();
    await expect(trigger).toHaveFocus();
  },
};

export const MotionInteractionOff: Story = {
  ...MotionInteraction,
  args: { ...MotionInteraction.args, motion: "off" },
};

function MotionSettingsExample(args: React.ComponentProps<typeof Accordion>) {
  const [motion, setMotion] = useState<"on" | "off">("on");
  return (
    <div className="cobalt-stack">
      <Button variant="outline" onClick={() => setMotion(motion === "on" ? "off" : "on")}>
        {motion === "on" ? "動きを止める" : "動きを戻す"}
      </Button>
      <Example {...args} motion={motion} />
    </div>
  );
}

export const MotionPriority: Story = {
  ...Closed,
  render: (args) => <MotionSettingsExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "無料相談はどのように予約できますか？" });
    await userEvent.click(trigger);

    const content = await canvas.findByRole("region", {
      name: "無料相談はどのように予約できますか？",
    });

    if (content.dataset.cobaltMotion === "on")
      await expect(content.getAnimations().length).toBeGreaterThan(0);
    await userEvent.click(canvas.getByRole("button", { name: "動きを止める" }));
    await waitFor(() => expect(content).toHaveAttribute("data-cobalt-motion", "off"));
    await expect(content.getAnimations()).toHaveLength(0);
    await expect(content).not.toHaveAttribute("data-cobalt-entry");
    await userEvent.click(canvas.getByRole("button", { name: "動きを戻す" }));
    await expect(content.getAnimations()).toHaveLength(0);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    await userEvent.click(trigger);

    const reopened = await canvas.findByRole("region", {
      name: "無料相談はどのように予約できますか？",
    });

    if (reopened.dataset.cobaltMotion === "on")
      await waitFor(() => expect(reopened.getAnimations().length).toBeGreaterThan(0));
  },
};
