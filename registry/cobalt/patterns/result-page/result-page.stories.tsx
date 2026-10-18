import { expect, userEvent, within, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import { ResultPage } from "./result-page";

const meta = {
  title: "Cobalt/Patterns/ResultPage",
  parameters: { designSystem: "cobalt" },
  component: ResultPage,
  argTypes: {
    motion: {
      description:
        "完了から次の一歩へつなぐ。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    title: "登録結果",
    description: "登録を受け付けました",
    status: "success" as const,
    details: <p>受付番号: 123</p>,
  },
} satisfies Meta<typeof ResultPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof ResultPage>) {
  const [message, setMessage] = useState("");
  return (
    <div className="cobalt-stack">
      <ResultPage
        {...args}
        action={<Button onClick={() => setMessage("次の手続きへ進みます。")}>次へ</Button>}
        onRetry={() => setMessage("再試行しました。結果を確認してください。")}
      />
      {message && <p role="status">{message}</p>}
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };

export const EmptyOrFailure: Story = {
  ...Default,
  args: {
    status: "failure",
    description: "登録できませんでした",
    details: <p>通信エラーが発生しました。</p>,
    action: undefined,
  },
};

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Partial: Story = {
  ...Default,
  args: {
    status: "partial",
    description: "一部を処理しました",
    details: <p>一部の項目を再試行してください。</p>,
    action: undefined,
  },
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const FailureMotionOff: Story = {
  ...EmptyOrFailure,
  args: { ...EmptyOrFailure.args, motion: "off" },
};

export const Interaction: Story = {
  ...EmptyOrFailure,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(canvas.getByText("完了できませんでした", { exact: true })).toBeVisible(),
    );
    const retry = canvas.getByRole("button", { name: "再試行" });
    if (args.motion === "off") {
      await expect(retry).toHaveAttribute("data-cobalt-motion", "off");
      await expect(getComputedStyle(retry).transitionDuration).toBe("0s");
    }
    await userEvent.click(retry);
    await waitFor(() =>
      expect(canvas.getByText("再試行しました。結果を確認してください。")).toBeVisible(),
    );
  },
};

export const InteractionMotionOff: Story = {
  ...Interaction,
  args: { ...EmptyOrFailure.args, motion: "off" },
};
