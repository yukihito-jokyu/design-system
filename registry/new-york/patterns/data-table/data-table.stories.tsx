import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type DataColumn } from "./data-table";

type Row = { id: string; name: string; team: string; count: number };

const rows: Row[] = [
  { id: "1", name: "青木", team: "企画", count: 12 },
  { id: "2", name: "井上", team: "開発", count: 8 },
  { id: "3", name: "上田", team: "企画", count: 22 },
  { id: "4", name: "遠藤", team: "運用", count: 3 },
  { id: "5", name: "大野", team: "開発", count: 17 },
  { id: "6", name: "加藤", team: "運用", count: 5 },
];

const columns: DataColumn<Row>[] = [
  { id: "name", header: "名前", value: (row) => row.name, sortable: true },
  { id: "team", header: "チーム", value: (row) => row.team, sortable: true },
  { id: "count", header: "件数", value: (row) => row.count, sortable: true },
];

const meta = {
  title: "Patterns/DataTable",
  component: DataTable<Row>,
  args: {
    rows,
    columns,
    getRowId: (row: Row) => row.id,
    caption: "担当者一覧",
    pageSize: 3,
    onSelectionChange: () => {},
  },
} satisfies Meta<typeof DataTable<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Empty: Story = { args: { rows: [] } };
