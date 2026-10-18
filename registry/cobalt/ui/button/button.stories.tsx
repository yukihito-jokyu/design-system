import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

const meta = {
  title: "Cobalt/UI/Button",
  component: Button,
  parameters: { designSystem: "cobalt" },
  args: {
    children: "予約する",
    variant: "default",
    size: "default",
    motion: "inherit",
    disabled: false,
    loading: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"] },
    motion: {
      description:
        "押した手応えを返し、実行を少し楽しみにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Outline: Story = { args: { variant: "outline", children: "プレビュー" } };
export const Secondary: Story = { args: { variant: "secondary", children: "一時保存" } };
export const Destructive: Story = { args: { variant: "destructive", children: "削除する" } };
export const Ghost: Story = { args: { variant: "ghost", children: "閉じる" } };
export const Link: Story = { args: { variant: "link", children: "詳しく見る" } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };

export const LongLabel: Story = {
  name: "長い文言",
  args: { size: "lg", children: "入力内容を確認して無料相談を予約する" },
};

export const Icon: Story = {
  args: { size: "icon", children: <span aria-hidden="true">+</span>, "aria-label": "追加" },
};

export const Disabled: Story = { args: { disabled: true, children: "利用できません" } };
export const Loading: Story = { args: { loading: true, children: "保存しています…" } };

export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };

export const AsChild: Story = {
  args: { asChild: true, children: <a href="#button-example">詳細を見る</a> },
};

// 白い面でも閉じる操作の範囲が分かるように、淡い背景と枠を使う。
export const Close: Story = {
  args: {
    variant: "secondary",
    size: "icon",
    children: <X aria-hidden="true" />,
    "aria-label": "閉じる",
  },
};

export const SmallIcon: Story = {
  name: "小さい閉じるボタン",
  args: { ...Close.args, size: "icon-sm" },
};

function LoadingExample(args: React.ComponentProps<typeof Button>) {
  const [loading, setLoading] = useState(false);
  return <Button {...args} loading={loading} onClick={() => setLoading(true)} />;
}

export const MotionInteraction: Story = {
  render: (args) => <LoadingExample {...args} />,
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "予約する" });
    const background = getComputedStyle(button).backgroundImage;
    await userEvent.click(button);
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(getComputedStyle(button).backgroundImage).toBe(background);
    const spinner = button.querySelector(".cobalt-button-spinner")!;
    if (button.dataset.cobaltMotion === "on") {
      await waitFor(() =>
        expect(
          spinner
            .getAnimations()
            .some((animation) =>
              (animation.effect as KeyframeEffect)
                .getKeyframes()
                .some((frame) => "transform" in frame),
            ),
        ).toBe(true),
      );
    } else await expect(spinner.getAnimations()).toHaveLength(0);
  },
};

export const MotionInteractionOff: Story = { ...MotionInteraction, args: { motion: "off" } };
