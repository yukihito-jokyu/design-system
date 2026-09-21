import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditPage } from "./edit-page";

const meta = {
  title: "Patterns/EditPage",
  component: EditPage,
  args: {
    title: "顧客を作成",
    variant: "create" as const,
    children: (
      <label>
        名前 <input name="name" required />
      </label>
    ),
    onSubmit: () => alert("保存"),
    onCancel: () => alert("取消"),
  },
} satisfies Meta<typeof EditPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const EmptyOrFailure: Story = { args: { error: "名前を確認してください", dirty: true } };
export const Narrow: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
export const Submitting: Story = { args: { submitting: true, dirty: true } };
