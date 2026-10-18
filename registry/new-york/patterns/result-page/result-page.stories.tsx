import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import { ResultPage } from "./result-page";

const meta = {
  title: "Patterns/ResultPage",
  component: ResultPage,
  args: {
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
    <>
      <ResultPage
        {...args}
        action={<Button onClick={() => setMessage("次の手続きへ進みます。")}>次へ</Button>}
        onRetry={() => setMessage("再試行しました。結果を確認してください。")}
      />
      {message && <p role="status">{message}</p>}
    </>
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
