# FriendlyTooltip

- Registry: `@yukihi/cobalt-friendly-tooltip`
- Source: `registry/cobalt/character/friendly-tooltip/friendly-tooltip.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-friendly-tooltip @yukihi/cobalt-button
```

## 使用例

```tsx
import { Button } from "@/components/ui/button";
import { FriendlyTooltip } from "@/components/character/friendly-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

<TooltipProvider>
  <FriendlyTooltip content="補助説明">
    <Button>ヒント</Button>
  </FriendlyTooltip>
</TooltipProvider>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
