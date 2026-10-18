import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Cobalt/UI/Skeleton",
  component: Skeleton,
  parameters: { designSystem: "cobalt" },
  args: {
    className: "cobalt-loading-content",
    motion: "inherit",
    role: "status",
    "aria-label": "記事を読み込み中",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
