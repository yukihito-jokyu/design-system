import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "./navigation-menu";

const meta = {
  title: "Cobalt/UI/NavigationMenu",
  component: NavigationMenu,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit", "aria-label": "サイトメニュー" },
  argTypes: {
    motion: {
      description:
        "隣のメニューへの移動方向を示す。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(args: React.ComponentProps<typeof NavigationMenu>) {
  const [page, setPage] = useState("ホーム");

  const link = (label: string) => (
    <NavigationMenuLink
      href="#"
      active={page === label}
      onClick={(event) => {
        event.preventDefault();
        setPage(label);
      }}
    >
      {label}
    </NavigationMenuLink>
  );

  return (
    <div className="cobalt-stack">
      <NavigationMenu {...args}>
        <NavigationMenuList>
          <NavigationMenuItem>{link("ホーム")}</NavigationMenuItem>
          <NavigationMenuItem value="services">
            <NavigationMenuTrigger>サービス</NavigationMenuTrigger>
            <NavigationMenuContent>
              {link("無料相談")}
              {link("研修一覧")}
              {link("導入事例")}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="support">
            <NavigationMenuTrigger>サポート</NavigationMenuTrigger>
            <NavigationMenuContent>
              {link("よくあるご質問")}
              {link("お問い合わせ")}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
      <p role="status" className="cobalt-note">
        選択中：{page}
      </p>
    </div>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const Open: Story = { ...Default, args: { defaultValue: "services" } };
export const WithoutViewport: Story = { ...Default, args: { viewport: false } };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
