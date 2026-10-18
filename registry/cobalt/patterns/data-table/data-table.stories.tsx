import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DataTable } from "./data-table";
import { Badge } from "@/registry/cobalt/ui/badge/badge";
import { Button } from "@/registry/cobalt/ui/button/button";
import { expect, userEvent, waitFor, within } from "storybook/test";

const rows = Array.from({ length: 8 }, (_, index) => ({
  id: String(index + 1),
  title: `記事 ${index + 1}`,
  published: index % 2 === 0,
  views: (index + 1) * 12,
}));

type Row = (typeof rows)[number];

const meta = {
  title: "Cobalt/Patterns/DataTable",
  component: DataTable,
  parameters: { designSystem: "cobalt" },
  args: {
    rows,
    columns: [
      {
        id: "title",
        header: "タイトル",
        value: (row: unknown) => (row as Row).title,
        sortable: true,
      },
      {
        id: "status",
        header: "公開状況",
        value: (row: unknown) => ((row as Row).published ? "公開済み" : "下書き"),
        render: (row: unknown) => (
          <Badge variant={(row as Row).published ? "success" : "secondary"}>
            {(row as Row).published ? "公開済み" : "下書き"}
          </Badge>
        ),
      },
      {
        id: "views",
        header: "閲覧数",
        value: (row: unknown) => (row as Row).views,
        sortable: true,
      },
    ],
    getRowId: (row: unknown) => (row as Row).id,
    caption: "記事一覧",
    pageSize: 3,
    motion: "inherit",
  },
  argTypes: {
    rows: { control: false },
    columns: { control: false },
    getRowId: { control: false },
    motion: {
      description:
        "並べ替えで行の行き先を見えるようにする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof DataTable>) {
  const [published, setPublished] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="cobalt-stack">
      <DataTable
        {...args}
        filterKey={String(published)}
        filterRow={published ? (row) => (row as Row).published : undefined}
        onSelectionChange={setSelected}
        filters={
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-pressed={published}
            onClick={() => setPublished(!published)}
          >
            公開済みのみ
          </Button>
        }
        emptyAction={
          <Button type="button" variant="outline" onClick={() => setPublished(false)}>
            絞り込みを解除
          </Button>
        }
      />
      <p className="cobalt-note" role="status">
        選択した記事：{selected.length ? selected.join("、") : "なし"}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Empty: Story = { ...Default, args: { rows: [] } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };

export const Interaction: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectPage = () => canvas.getByRole("checkbox", { name: "表示中の項目をすべて選択" });
    const selection = () => canvas.getByText(/^選択した記事：/);
    await userEvent.click(selectPage());
    await expect(selection()).toHaveTextContent("選択した記事：1、2、3");
    await userEvent.click(canvas.getByRole("checkbox", { name: "記事 2を選択" }));
    await expect(selectPage()).toHaveAttribute("aria-checked", "mixed");
    await userEvent.click(canvas.getByRole("button", { name: "次へ" }));
    await waitFor(() =>
      expect(canvas.getByRole("checkbox", { name: "記事 4を選択" })).toBeVisible(),
    );
    await expect(selection()).toHaveTextContent("選択した記事：1、3");
    await userEvent.click(canvas.getByRole("button", { name: "公開済みのみ" }));
    await expect(selection()).toHaveTextContent("選択した記事：なし");
    await expect(canvas.getByRole("button", { name: "前へ" })).toBeDisabled();
    await userEvent.click(selectPage());
    await expect(selection()).toHaveTextContent("選択した記事：1、3、5");
    const search = canvas.getByRole("searchbox");
    await userEvent.type(search, "記事 7");
    await expect(selection()).toHaveTextContent("選択した記事：なし");
    await waitFor(() =>
      expect(canvas.getByRole("checkbox", { name: "記事 7を選択" })).toBeVisible(),
    );
    await userEvent.clear(search);
    const sort = canvas.getByRole("button", { name: "閲覧数" });
    await userEvent.click(sort);
    await expect(sort.closest("th")).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(sort);
    await expect(sort.closest("th")).toHaveAttribute("aria-sort", "descending");
    await expect(canvas.getAllByRole("row")[1]).toHaveTextContent("記事 7");
    await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(
      window.innerWidth,
    );
  },
};

export const InteractionMotionOff: Story = { ...Interaction, args: { motion: "off" } };

export const MotionInteraction: Story = {
  ...Default,
  args: { pageSize: 8 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sort = canvas.getByRole("button", { name: "閲覧数" });
    await userEvent.click(sort);
    await userEvent.click(sort);
    const row = canvas.getAllByRole("row")[1];
    await expect(row).toHaveTextContent("記事 8");
    const animations = row.getAnimations();
    if (row.closest("[data-cobalt-motion]")?.getAttribute("data-cobalt-motion") === "on") {
      await expect(
        animations.some((animation) =>
          (animation.effect as KeyframeEffect).getKeyframes().some((frame) => "translate" in frame),
        ),
      ).toBe(true);
      await Promise.allSettled(animations.map((animation) => animation.finished));
    } else await expect(animations).toHaveLength(0);
  },
};

export const MotionInteractionOff: Story = {
  ...MotionInteraction,
  args: { pageSize: 8, motion: "off" },
};
