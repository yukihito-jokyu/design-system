import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { HomeIcon, FileTextIcon, SettingsIcon, MoreHorizontalIcon } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarFooter,
  SidebarInput,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
  SidebarMenuSkeleton,
  useSidebar,
} from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../dropdown-menu/dropdown-menu";

const meta = {
  title: "Cobalt/UI/Sidebar",
  component: SidebarProvider,
  parameters: { designSystem: "cobalt" },
  args: { motion: "inherit" },
  argTypes: {
    motion: {
      description:
        "ナビゲーションと本文の位置関係を保つ。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof SidebarProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Contents({
  variant = "sidebar",
  side = "left",
  collapsible = "icon",
  loading = false,
}: Pick<React.ComponentProps<typeof Sidebar>, "variant" | "side" | "collapsible"> & {
  loading?: boolean;
}) {
  const [selected, setSelected] = useState("ホーム");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const { isMobile, setOpenMobile } = useSidebar();

  const go = (value: string) => {
    setSelected(value);
    if (isMobile) setOpenMobile(false);
  };

  return (
    <>
      <Sidebar variant={variant} side={side} collapsible={collapsible}>
        <SidebarHeader>
          <strong>Cobalt</strong>
          <SidebarInput
            aria-label="メニューを検索"
            placeholder="メニューを検索"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>ワークスペース</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {loading ? (
                  <>
                    <SidebarMenuSkeleton showIcon />
                    <SidebarMenuSkeleton showIcon />
                    <SidebarMenuSkeleton showIcon />
                  </>
                ) : (
                  [
                    { label: "ホーム", icon: HomeIcon },
                    { label: "記事", icon: FileTextIcon },
                    { label: "設定", icon: SettingsIcon },
                  ]
                    .filter((item) => item.label.includes(search))
                    .map(({ label, icon: Icon }) => (
                      <SidebarMenuItem key={label}>
                        <SidebarMenuButton
                          isActive={selected === label}
                          tooltip={label}
                          onClick={() => go(label)}
                          aria-label={label}
                        >
                          <Icon aria-hidden="true" />
                          <span>{label}</span>
                        </SidebarMenuButton>
                        {label === "記事" && (
                          <>
                            <SidebarMenuBadge>12</SidebarMenuBadge>
                            <SidebarMenuSub>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                  href="#"
                                  isActive={selected === "公開済み"}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    go("公開済み");
                                  }}
                                >
                                  公開済み
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          </>
                        )}
                        {label === "設定" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <SidebarMenuAction showOnHover aria-label="設定の追加操作">
                                <MoreHorizontalIcon aria-hidden="true" />
                              </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right">
                              <DropdownMenuItem
                                onSelect={() => setMessage("表示設定を選びました。")}
                              >
                                表示設定
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </SidebarMenuItem>
                    ))
                )}
                {!loading &&
                  search &&
                  !["ホーム", "記事", "設定"].some((label) => label.includes(search)) && (
                    <li className="cobalt-note">一致するメニューはありません。</li>
                  )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="cobalt-note">山田 友紀</p>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset style={{ padding: "clamp(16px, 4vw, 32px)" }}>
        <div className="cobalt-actions">
          {collapsible !== "none" && <SidebarTrigger />}
          <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700 }}>{selected}</h1>
        </div>
        <p className="cobalt-note" role="status">
          {message || `${selected}を表示しています。`}
        </p>
      </SidebarInset>
    </>
  );
}

function Example(
  args: React.ComponentProps<typeof SidebarProvider> &
    Pick<React.ComponentProps<typeof Sidebar>, "variant" | "side" | "collapsible"> & {
      loading?: boolean;
    },
) {
  const { variant, side, collapsible, loading, ...provider } = args;
  return (
    <SidebarProvider {...provider}>
      <Contents variant={variant} side={side} collapsible={collapsible} loading={loading} />
    </SidebarProvider>
  );
}

export const Default: Story = { render: (args) => <Example {...args} /> };
export const MotionOn: Story = { ...Default, args: { motion: "on" } };
export const MotionOff: Story = { ...Default, args: { motion: "off" } };
export const Collapsed: Story = { ...Default, args: { defaultOpen: false } };
export const Floating: Story = { render: (args) => <Example {...args} variant="floating" /> };
export const Inset: Story = { render: (args) => <Example {...args} variant="inset" /> };
export const Right: Story = { render: (args) => <Example {...args} side="right" /> };
export const Offcanvas: Story = { render: (args) => <Example {...args} collapsible="offcanvas" /> };
export const Static: Story = { render: (args) => <Example {...args} collapsible="none" /> };
export const Loading: Story = { render: (args) => <Example {...args} loading /> };
