import { useId, useState, type ReactNode } from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/registry/cobalt/ui/sheet/sheet";
import { Button } from "@/registry/cobalt/ui/button/button";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { useIsMobile } from "@/registry/cobalt/hooks/use-mobile/use-mobile";

export function AppShell({
  navigation,
  children,
  aside,
  contentElement = "main",
  motion = "inherit",
}: {
  navigation: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  contentElement?: "main" | "section";
  motion?: MotionPreference;
}) {
  const id = useId();
  const Content = contentElement;
  const mobile = useIsMobile();
  return (
    <MotionProvider motion={motion}>
      <div className="cobalt-app-shell">
        <a className="cobalt-skip-link" href={`#${id}`}>
          本文へ移動
        </a>
        {mobile && <MobileNavigation navigation={navigation} />}
        <nav className="cobalt-app-shell-nav" aria-label="メインナビゲーション">
          {navigation}
        </nav>
        <Content id={id} aria-label="作業領域" tabIndex={-1} className="cobalt-app-shell-content">
          {children}
        </Content>
        {aside && (
          <aside className="cobalt-app-shell-aside" aria-label="補助情報">
            {aside}
          </aside>
        )}
      </div>
    </MotionProvider>
  );
}

// PC表示へ切り替わったらメニューを破棄し、再度スマホ表示にしても閉じた状態で始める。
function MobileNavigation({ navigation }: { navigation: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="cobalt-app-shell-mobile">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            <MenuIcon aria-hidden="true" />
            メニュー
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>メニュー</SheetTitle>
            <SheetDescription>表示するページを選択してください。</SheetDescription>
          </SheetHeader>
          <nav
            className="cobalt-app-shell-menu"
            aria-label="モバイルナビゲーション"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a[href]")) setMenuOpen(false);
            }}
          >
            {navigation}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
