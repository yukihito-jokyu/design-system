import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import { TaskWorkflowPage } from "./task-workflow-page";

const meta = {
  title: "Patterns/TaskWorkflowPage",
  component: TaskWorkflowPage,
  args: {
    title: "開設準備",
    tasks: [
      { id: "one", title: "情報入力", status: "in-progress" as const },
      { id: "two", title: "書類確認", status: "not-started" as const },
    ],
  },
} satisfies Meta<typeof TaskWorkflowPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function Example() {
      const [resumed, setResumed] = useState(false);
      return (
        <>
          <TaskWorkflowPage
            {...args}
            tasks={args.tasks.map((task) =>
              task.id === "one"
                ? { ...task, action: <Button onClick={() => setResumed(true)}>再開</Button> }
                : task,
            )}
          />
          {resumed && <p role="status">情報入力を再開しました。</p>}
        </>
      );
    }

    return <Example />;
  },
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
