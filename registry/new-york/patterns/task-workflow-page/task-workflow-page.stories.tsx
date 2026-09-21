import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/new-york/ui/button/button";
import { TaskWorkflowPage } from "./task-workflow-page";

const meta = {
  title: "Patterns/TaskWorkflowPage",
  component: TaskWorkflowPage,
  args: {
    title: "開設準備",
    tasks: [
      {
        id: "one",
        title: "情報入力",
        status: "in-progress" as const,
        action: <Button onClick={() => alert("再開")}>再開</Button>,
      },
      { id: "two", title: "書類確認", status: "not-started" as const },
    ],
  },
} satisfies Meta<typeof TaskWorkflowPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const EmptyOrFailure: Story = {
  args: { tasks: [{ id: "one", title: "情報入力", status: "blocked" as const }] },
};

export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };

export const Complete: Story = {
  args: { tasks: [{ id: "one", title: "情報入力", status: "complete" as const }] },
};
