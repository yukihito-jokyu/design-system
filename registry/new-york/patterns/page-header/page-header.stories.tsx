import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/registry/new-york/ui/button/button";
import { PageHeader } from "./page-header";

const meta = {
  title: "Patterns/PageHeader",
  component: PageHeader,
  args: { title: "設定", description: "利用環境を変更します。" },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function Example() {
      const [saved, setSaved] = useState(false);
      return (
        <>
          <PageHeader {...args} actions={<Button onClick={() => setSaved(true)}>保存</Button>} />
          {saved && <p role="status">設定を保存しました。</p>}
        </>
      );
    }

    return <Example />;
  },
};
