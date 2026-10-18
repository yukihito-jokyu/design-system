import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell } from "./app-shell";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta = {
  title: "Cobalt/Patterns/AppShell",
  component: AppShell,
  parameters: { designSystem: "cobalt", layout: "fullscreen" },
  args: {
    navigation: (
      <a href="#content" className="cobalt-nav-link" aria-current="page">
        記事一覧
      </a>
    ),
    children: (
      <div id="content" className="cobalt-stack">
        <h1>記事一覧</h1>
        <p>記事を探して、公開状況を確認できます。</p>
      </div>
    ),
    motion: "inherit",
  },
  argTypes: {
    motion: {
      description:
        "本文とナビゲーションの関係を保つ。 inheritは親を継承、on/offは個別指定。OSの動きを減らす設定が最優先です。",
      control: "select",
      options: ["inherit", "on", "off"],
    },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const MotionOn: Story = { args: { motion: "on" } };
export const MotionOff: Story = { args: { motion: "off" } };

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const menu = canvas.queryByRole("button", { name: "メニュー" });
    if (window.matchMedia("(max-width: 767px)").matches) {
      await expect(menu).not.toBeNull();
      await userEvent.click(menu!);
      await waitFor(() => expect(body.getByRole("dialog")).toBeVisible());
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
      await expect(menu).toHaveFocus();
      await userEvent.click(menu!);
      await waitFor(() => expect(body.getByRole("dialog")).toBeVisible());
      await userEvent.click(
        within(body.getByRole("dialog")).getByRole("link", { name: "記事一覧" }),
      );
      await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
      await expect(menu).toHaveFocus();
      await expect(canvasElement.ownerDocument.body).not.toHaveAttribute("data-scroll-locked");
    } else {
      await expect(menu).toBeNull();
      await expect(canvas.getByRole("navigation", { name: "メインナビゲーション" })).toBeVisible();
    }
    await expect(canvas.getByRole("main", { name: "作業領域" })).toBeVisible();
    await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(
      window.innerWidth,
    );
  },
};

export const InteractionMotionOff: Story = { ...Interaction, args: { motion: "off" } };
