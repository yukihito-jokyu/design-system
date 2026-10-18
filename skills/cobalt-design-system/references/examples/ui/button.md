# Button

- Registry: `@yukihi/cobalt-button`
- Source: `registry/cobalt/ui/button/button.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-button
```

## 使用例

```tsx
import { Button } from "@/components/ui/button";

<Button>保存する</Button>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。

サイズは`sm`・`default`・`lg`と`icon`・`icon-sm`・`icon-lg`。`loading`中は二重操作を防ぐ。`asChild`のリンクも無効時にクリック・Enter・Space操作を抑制する。Motionは`<Button motion="off">保存</Button>`で指定する。
