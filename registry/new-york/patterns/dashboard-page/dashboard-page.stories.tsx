import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/registry/new-york/ui/dialog/dialog";
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
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const DashboardExample = (args: React.ComponentProps<typeof DashboardPage>) => {
  const [open, setOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);
  return (
    <>
      <DashboardPage
        {...args}
        actions={<Button onClick={() => setOpen(true)}>作業へ</Button>}
        onRetry={() => setRetrying(true)}
        error={retrying ? undefined : args.error}
      />
      {retrying && <p role="status">指標を再読み込みしました。</p>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>作業へ</DialogTitle>
          <DialogDescription>未処理の作業一覧を確認します。</DialogDescription>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const Default: Story = { render: (args) => <DashboardExample {...args} /> };

export const EmptyOrFailure: Story = {
  ...Default,
  args: { metrics: [], error: "指標を読み込めませんでした" },
};

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Loading: Story = { ...Default, args: { loading: true } };
