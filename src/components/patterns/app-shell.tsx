import { useId, type ReactNode } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "../ui/sheet";
import { Button } from "../ui/button";

export function AppShell({
  navigation,
  children,
  aside,
  contentElement = "main",
}: {
  navigation: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  contentElement?: "main" | "section";
}) {
  const id = useId();
  const Content = contentElement;
  return (
    <div className="app-shell">
      <a className="skip-link" href={`#${id}`}>
        本文へ移動
      </a>
      <div className="app-shell-mobile">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">メニューを開く</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>メニュー</SheetTitle>
            <SheetDescription>表示するページを選択してください。</SheetDescription>
            <nav aria-label="モバイルナビゲーション">{navigation}</nav>
          </SheetContent>
        </Sheet>
      </div>
      <nav className="app-shell-nav" aria-label="メインナビゲーション">
        {navigation}
      </nav>
      <Content id={id} aria-label="作業領域" tabIndex={-1} className="app-shell-content">
        {children}
      </Content>
      {aside && <aside aria-label="補助情報">{aside}</aside>}
    </div>
  );
}
