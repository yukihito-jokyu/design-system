import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import { Input } from "@/registry/new-york/ui/input/input";
import { DetailPage } from "./detail-page";
import { EditPage } from "../edit-page/edit-page";

const meta = {
  title: "Patterns/DetailPage",
  component: DetailPage,
  args: {
    title: "顧客詳細",
    back: <a href="#back">顧客一覧に戻る</a>,
    children: <p>顧客の詳細情報</p>,
  },
} satisfies Meta<typeof DetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof DetailPage>) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  if (editing)
    return (
      <EditPage
        title="顧客を編集"
        variant="edit"
        onSubmit={() => {
          setSaved(true);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      >
        <label>
          名前 <Input name="name" defaultValue="山田" required />
        </label>
      </EditPage>
    );
  return (
    <>
      <DetailPage {...args} actions={<Button onClick={() => setEditing(true)}>編集</Button>} />
      {saved && <p role="status">保存しました。</p>}
    </>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const EmptyOrFailure: Story = { ...Default, args: { status: "missing" } };

export const Narrow: Story = {
  ...Default,
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const Forbidden: Story = { ...Default, args: { status: "forbidden" } };
export const Loading: Story = { ...Default, args: { status: "loading" } };
