# DesignThemeProvider・MotionProvider・ThemePortal

- Registry: `@yukihi/cobalt-theme-provider`
- Source: `registry/cobalt/components/theme-provider/theme-provider.tsx`

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-theme-provider @yukihi/cobalt-button
```

共通CSSはCLIがアプリのTailwind入口へ反映する。入口でそのCSSを一度読み込む。

```tsx
import { DesignThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { Button } from "@/components/ui/button";

<DesignThemeProvider theme="light" motion="on">
  <MotionProvider motion="off">
    <Button>保存する</Button>
  </MotionProvider>
</DesignThemeProvider>;
```

`theme`は`"light"`のみ。`ThemeProvider`も同じファイルからexportされ、lightを省略指定できる。`motion`の既定は`inherit`、最も近い明示指定を継承し、OSのreduceを最優先する。`MotionProvider`と`useDesignMotion`は別ファイル`@/components/motion-provider`からimportする。

標準Overlayはテーマ・Token・Motionを引き継ぐ。独自のPortalを追加する場合だけ次を使う。通常のアプリ内配置では不要。

```tsx
import { ThemePortal } from "@/components/theme-portal";

<ThemePortal motion="inherit">
  <p>補助情報</p>
</ThemePortal>;
```

`container`で配置先ElementまたはDocumentFragmentを指定でき、未指定なら`document.body`へ配置する。`tokens`はProviderの`--cobalt-*`の上書きを継承する。承認済み値を推測で上書きしない。
