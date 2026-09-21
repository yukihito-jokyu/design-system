import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { EditPage } from "./edit-page";
import { Input } from "@/registry/new-york/ui/input/input";

const meta = {
  title: "Patterns/EditPage",
  component: EditPage,
  args: {
    title: "顧客を作成",
    variant: "create" as const,
    children: (
      <label>
        名前 <Input name="name" required />
      </label>
    ),
    onSubmit: () => {},
  },
} satisfies Meta<typeof EditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof EditPage>) {
  const [result, setResult] = useState("");
  return (
    <>
      <EditPage
        {...args}
        onSubmit={() => setResult("保存しました。")}
        onCancel={() => setResult("入力を取り消しました。")}
      />
      {result && <p role="status">{result}</p>}
    </>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };

export const EmptyOrFailure: Story = {
  ...Default,
  args: { error: "名前を確認してください", dirty: true },
};

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Submitting: Story = { ...Default, args: { submitting: true, dirty: true } };
