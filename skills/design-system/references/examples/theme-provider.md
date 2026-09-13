# DesignThemeProvider

- Registry: `@yukihi/theme-provider`
- Source: `src/components/theme-provider.tsx`

## 導入

```sh
npx shadcn@latest add @yukihi/theme-provider
```

アプリのTailwind CSSから共通スタイルを1回読み込みます。

```css
@import "tailwindcss";
@import "@/components/design-system/styles.css";
```

## 使用例

```tsx
import { DesignThemeProvider } from "@/components/theme-provider";

<DesignThemeProvider theme="sage">
  <App />
</DesignThemeProvider>;
```

テーマは`milk`、`cream`、`neutral`、`sage`、`lavender`から選ぶ。Portalを使う部品でもProviderの配色継承を維持する。
