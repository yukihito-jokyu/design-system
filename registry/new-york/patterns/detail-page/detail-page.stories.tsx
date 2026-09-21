import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/new-york/ui/button/button";
import { DetailPage } from "./detail-page";

const meta = {
  title: "Patterns/DetailPage",
  component: DetailPage,
  args: {
    title: "顧客詳細",
    back: <a href="#back">顧客一覧に戻る</a>,
    children: <p>顧客の詳細情報</p>,
    actions: <Button onClick={() => alert("編集")}>編集</Button>,
  },
} satisfies Meta<typeof DetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const EmptyOrFailure: Story = { args: { status: "missing" } };
export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
export const Forbidden: Story = { args: { status: "forbidden" } };
export const Loading: Story = { args: { status: "loading" } };
