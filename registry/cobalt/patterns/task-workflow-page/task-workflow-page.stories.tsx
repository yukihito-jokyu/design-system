import { expect, userEvent, within, waitFor } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/registry/cobalt/ui/button/button";
import { TaskWorkflowPage } from "./task-workflow-page";

const meta = {
  title: "Cobalt/Patterns/TaskWorkflowPage",
  parameters: { designSystem: "cobalt" },
  component: TaskWorkflowPage,
  argTypes: {
    motion: {
      description:
        "作業を一つずつ終える達成感を作る。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
  args: {
    motion: "inherit",
    title: "開設準備",
    tasks: [
      { id: "one", title: "情報入力", status: "in-progress" as const },
      { id: "two", title: "書類確認", status: "not-started" as const },
    ],
  },
} satisfies Meta<typeof TaskWorkflowPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function TaskWorkflowPageExample(args: React.ComponentProps<typeof TaskWorkflowPage>) {
  const [resumed, setResumed] = useState(false);
  return (
    <div className="cobalt-stack">
      <TaskWorkflowPage
        {...args}
        tasks={args.tasks.map((task) =>
          task.id === "one" && task.status !== "complete"
            ? { ...task, action: <Button onClick={() => setResumed(true)}>再開</Button> }
            : task,
        )}
      />
      {resumed && <p role="status">情報入力を再開しました。</p>}
    </div>
  );
}

export const Default: Story = {
  render: (args) => <TaskWorkflowPageExample {...args} />,
};

export const EmptyOrFailure: Story = {
  ...Default,
  args: { tasks: [{ id: "one", title: "情報入力", status: "blocked" as const }] },
};

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Complete: Story = {
  ...Default,
  args: { tasks: [{ id: "one", title: "情報入力", status: "complete" as const }] },
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const AllStatuses: Story = {
  ...Default,
  args: {
    tasks: [
      {
        id: "one",
        title: "情報入力",
        status: "in-progress",
        description: "途中の内容から再開できます。",
      },
      {
        id: "two",
        title: "書類確認",
        status: "not-started",
        description: "必要な書類を準備してください。",
      },
      {
        id: "three",
        title: "連絡先の登録",
        status: "complete",
        description: "連絡先の確認が完了しました。",
      },
      {
        id: "four",
        title: "公開内容の確認",
        status: "blocked",
        description: "不足している項目を確認してください。",
      },
    ],
  },
};

export const CompleteWithAction: Story = {
  ...Complete,
  args: {
    tasks: [{ id: "one", title: "情報入力", status: "complete" }],
    completionAction: (
      <Button asChild>
        <a href="#next-task">次の作業へ</a>
      </Button>
    ),
  },
};

export const Empty: Story = { ...Default, args: { tasks: [] } };
export const ForceComplete: Story = { ...Default, args: { complete: true } };

export const Interaction: Story = {
  ...AllStatuses,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    for (const label of ["未開始", "進行中", "完了", "問題あり"])
      await waitFor(() => expect(canvas.getByText(label, { exact: true })).toBeVisible());
    if (args.motion === "off")
      for (const element of canvasElement.querySelectorAll("[data-cobalt-motion]"))
        await expect(element).toHaveAttribute("data-cobalt-motion", "off");
    await userEvent.click(canvas.getByRole("button", { name: "再開" }));
    await waitFor(() => expect(canvas.getByText("情報入力を再開しました。")).toBeVisible());
  },
};

export const InteractionMotionOff: Story = {
  ...Interaction,
  args: { ...AllStatuses.args, motion: "off" },
};
