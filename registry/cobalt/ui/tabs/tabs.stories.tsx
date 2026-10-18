import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta = {
  title: "Cobalt/UI/Tabs",
  component: Tabs,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", defaultValue: "overview" },
  argTypes: {
    motion: {
      description:
        "選択先へ面がつながって移動する楽しさを作る。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({
  variant = "default",
  ...args
}: React.ComponentProps<typeof Tabs> & { variant?: "default" | "line" }) {
  return (
    <Tabs {...args} style={{ maxWidth: 640, ...args.style }}>
      <TabsList aria-label="相談のご案内" variant={variant}>
        <TabsTrigger value="overview">概要</TabsTrigger>
        <TabsTrigger value="flow">当日の流れ</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          準備中
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p>ご相談の内容に合わせて、担当者が進め方をご案内します。</p>
      </TabsContent>
      <TabsContent value="flow">
        <p>はじめに現状を伺い、課題を整理して、次の一歩を一緒に考えます。</p>
      </TabsContent>
      <TabsContent value="disabled">現在準備中です。</TabsContent>
    </Tabs>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Line: Story = { render: (args) => <Example {...args} variant="line" /> };
export const Vertical: Story = { ...Default, args: { orientation: "vertical" } };

export const VerticalLine: Story = {
  args: { orientation: "vertical" },
  render: (args) => <Example {...args} variant="line" />,
};

export const Manual: Story = { ...Default, args: { activationMode: "manual" } };

export const MotionInteraction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole("tab", { name: "当日の流れ" });
    await userEvent.click(tab);
    await expect(tab).toHaveAttribute("aria-selected", "true");
    const list = canvas.getByRole("tablist");
    const marker = list.querySelector<HTMLElement>(".cobalt-tabs-indicator")!;
    const animations = marker.getAnimations();
    if (list.dataset.cobaltMotion === "on") {
      await expect(animations.length).toBeGreaterThan(0);
      const frames = (animations[0].effect as KeyframeEffect).getKeyframes();
      await expect(frames[0].left).not.toBe(frames.at(-1)?.left);
      await Promise.allSettled(animations.map((animation) => animation.finished));
      await expect(
        Math.abs(marker.getBoundingClientRect().left - tab.getBoundingClientRect().left),
      ).toBeLessThan(1);
    } else {
      await expect(animations).toHaveLength(0);
      await expect(marker).not.toBeVisible();
    }
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("はじめに現状を伺い");
    await userEvent.keyboard("{ArrowLeft}");
    await expect(canvas.getByRole("tab", { name: "概要" })).toHaveFocus();
    await expect(canvas.getByRole("tab", { name: "概要" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
