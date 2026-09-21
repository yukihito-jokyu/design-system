import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/new-york/ui/button/button";
import { DashboardPage } from "./dashboard-page";

const meta = {
  title: "Patterns/DashboardPage",
  component: DashboardPage,
  args: {
    title: "業務概要",
    metrics: [
      { label: "未処理", value: 12 },
      { label: "完了", value: 38 },
    ],
    actions: <Button onClick={() => alert("作業へ")}>作業へ</Button>,
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const EmptyOrFailure: Story = {
  args: { metrics: [], error: "指標を読み込めませんでした", onRetry: () => alert("再試行") },
};

export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
export const Loading: Story = { args: { loading: true } };
