import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState, type ComponentProps } from "react";
import { X } from "lucide-react";
import { Button } from "../button/button";
import { Input } from "../input/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card";

const meta = {
  title: "Cobalt/UI/Card",
  component: Card,
  parameters: { designSystem: "cobalt" },
  args: {
    variant: "surface",
    motion: "inherit",
    children: (
      <>
        <CardHeader>
          <CardTitle>無料相談のご予約</CardTitle>
          <CardDescription>気になることを、まずは一緒に整理しましょう。</CardDescription>
          <CardAction>
            <Button variant="secondary" size="icon" aria-label="閉じる">
              <X aria-hidden="true" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>ご希望の内容を確認してから予約へ進めます。</CardContent>
        <CardFooter>
          <Button>予約へ進む</Button>
        </CardFooter>
      </>
    ),
  },
  argTypes: {
    variant: { control: "select", options: ["surface", "soft"] },
    motion: {
      description:
        "操作できるカードだけが反応する。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
    children: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Soft: Story = { args: { variant: "soft" } };
// Cardの指定が配下のButtonへ継承されることを確認する。
export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };

function ReservationExample(args: ComponentProps<typeof Card>) {
  const formId = useId();
  const [closed, setClosed] = useState(false);
  const [message, setMessage] = useState("");

  if (closed) {
    return (
      <Button variant="outline" onClick={() => setClosed(false)}>
        予約フォームをもう一度表示
      </Button>
    );
  }

  return (
    <Card {...args} style={{ maxWidth: 640, ...args.style }}>
      <CardHeader>
        <CardTitle>無料相談のご予約</CardTitle>
        <CardDescription>気になることを、まずは一緒に整理しましょう。</CardDescription>
        <CardAction>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="閉じる"
            onClick={() => setClosed(true)}
          >
            <X aria-hidden="true" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          id={formId}
          style={{ display: "grid", gap: "var(--cobalt-space-4)" }}
          onSubmit={(event) => {
            event.preventDefault();
            setMessage("入力を確認しました。この見本は外部へ送信しません。");
          }}
        >
          <label style={{ display: "grid", gap: "var(--cobalt-space-2)" }}>
            お名前
            <Input autoComplete="name" required />
          </label>
          <label style={{ display: "grid", gap: "var(--cobalt-space-2)" }}>
            メールアドレス
            <Input type="email" autoComplete="email" required />
          </label>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form={formId} size="lg">
          予約する
        </Button>
        {message && <p role="status">{message}</p>}
      </CardFooter>
    </Card>
  );
}

export const Reservation: Story = {
  name: "予約フォーム",
  render: (args) => <ReservationExample {...args} />,
};

export const Actions: Story = {
  name: "主要操作と補助操作",
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>変更内容の保存</CardTitle>
          <CardDescription>内容を確認してから保存してください。</CardDescription>
        </CardHeader>
        <CardContent>変更内容は保存後に反映されます。</CardContent>
        <CardFooter>
          <Button>変更内容を確認して保存する</Button>
          <Button variant="outline" size="sm">
            プレビュー
          </Button>
        </CardFooter>
      </>
    ),
  },
};
