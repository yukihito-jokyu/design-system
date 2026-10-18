# Popover

- Registry: `@yukihi/cobalt-popover`
- Source: `registry/cobalt/ui/popover/popover.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-popover
```

## 使用例

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";

<Popover />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
