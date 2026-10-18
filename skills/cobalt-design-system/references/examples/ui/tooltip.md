# Tooltip

- Registry: `@yukihi/cobalt-tooltip`
- Source: `registry/cobalt/ui/tooltip/tooltip.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-tooltip @yukihi/cobalt-button
```

## 使用例

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>ヒント</Button>
    </TooltipTrigger>
    <TooltipContent>補助説明</TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
