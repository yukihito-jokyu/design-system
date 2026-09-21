import type { Meta, StoryObj } from "@storybook/react-vite";
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
    action: <Button onClick={() => alert("次へ")}>次へ</Button>,
  },
} satisfies Meta<typeof ResultPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const EmptyOrFailure: Story = {
  args: { status: "failure" as const, onRetry: () => alert("再試行") },
};

export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };

export const Partial: Story = {
  args: {
    status: "partial" as const,
    description: "一部を処理しました",
    details: <p>一部の項目を再試行してください。</p>,
    onRetry: () => alert("再試行"),
  },
};
