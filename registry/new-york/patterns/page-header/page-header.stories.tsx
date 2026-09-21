import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/new-york/ui/button/button";
import { PageHeader } from "./page-header";

const meta = {
  title: "Patterns/PageHeader",
  component: PageHeader,
  args: {
    title: "設定",
    description: "利用環境を変更します。",
    actions: <Button onClick={() => alert("保存")}>保存</Button>,
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
