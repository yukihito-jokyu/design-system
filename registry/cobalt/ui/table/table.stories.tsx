import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableCaption,
} from "./table";

const meta = {
  title: "Cobalt/UI/Table",
  component: Table,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "行を読みながら操作対象を追いやすくする。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>記事の公開状況</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>記事</TableHead>
          <TableHead>公開状況</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>秋の新サービス</TableCell>
          <TableCell>公開済み</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ご利用ガイド</TableCell>
          <TableCell>下書き</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
