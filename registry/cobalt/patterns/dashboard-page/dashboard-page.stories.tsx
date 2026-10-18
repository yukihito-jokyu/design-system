import { expect, userEvent, within, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/registry/cobalt/ui/dialog/dialog";
import { DashboardPage } from "./dashboard-page";

const meta = {
  title: "Cobalt/Patterns/DashboardPage",
  parameters: { designSystem: "cobalt" },
  component: DashboardPage,
  argTypes: {
    motion: {
      description:
        "数値の読み取りを邪魔せず次の操作を促す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
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
  const actionRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);
  return (
    <div className="cobalt-stack">
      <DashboardPage
        {...args}
        actions={
          <Button ref={actionRef} onClick={() => setOpen(true)}>
            作業へ
          </Button>
        }
        onRetry={() => setRetrying(true)}
        error={retrying ? undefined : args.error}
      />
      {retrying && <p role="status">指標を再読み込みしました。</p>}
      <Dialog motion={args.motion} open={open} onOpenChange={setOpen}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            actionRef.current?.focus();
          }}
        >
          <DialogTitle>作業へ</DialogTitle>
          <DialogDescription>未処理の作業一覧を確認します。</DialogDescription>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
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

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const WithSections: Story = {
  ...Default,
  args: {
    description: "現在の作業の状況を確認できます。",
    metrics: [
      { label: "未処理", value: 12, description: "対応が必要な作業" },
      { label: "確認待ち", value: 8 },
      { label: "完了", value: 38 },
    ],
    sections: (
      <section className="cobalt-stack">
        <h2>お知らせ</h2>
        <p>現在の状況を確認して、作業を進めてください。</p>
      </section>
    ),
  },
};

export const Empty: Story = { ...Default, args: { metrics: [] } };
export const LoadingMotionOff: Story = { ...Loading, args: { loading: true, motion: "off" } };

export const Interaction: Story = {
  ...EmptyOrFailure,
  args: { error: "指標を読み込めませんでした" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getByRole("button", { name: "再試行" }));
    await waitFor(() => expect(canvas.getByText("指標を再読み込みしました。")).toBeVisible());
    await waitFor(() => expect(canvas.getByText("38", { exact: true })).toBeVisible());
    await userEvent.click(canvas.getByRole("button", { name: "作業へ" }));
    await waitFor(() => expect(body.getByRole("dialog", { name: "作業へ" })).toBeVisible());
    if (args.motion === "off")
      await expect(body.getByRole("dialog")).toHaveAttribute("data-cobalt-motion", "off");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(canvas.getByRole("button", { name: "作業へ" })).toHaveFocus());
  },
};

export const InteractionMotionOff: Story = {
  ...Interaction,
  args: { error: "指標を読み込めませんでした", motion: "off" },
};
