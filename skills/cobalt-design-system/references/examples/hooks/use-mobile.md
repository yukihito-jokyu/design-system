# useIsMobile

- Registry: `@yukihi/cobalt-use-mobile`
- Source: `registry/cobalt/hooks/use-mobile/use-mobile.ts`

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-use-mobile
```

```tsx
import { useIsMobile } from "@/hooks/use-mobile";

export function LayoutHint() {
  const mobile = useIsMobile();
  return <span>{mobile ? "モバイル表示" : "PC表示"}</span>;
}
```

768px未満でtrue。サーバー描画時はfalseで、ブラウザー側で更新される。Button等の600px切替は共通CSSが担当する。画面サイズだけのために入力状態を破棄しない。
