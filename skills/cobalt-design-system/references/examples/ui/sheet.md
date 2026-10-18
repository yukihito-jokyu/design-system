# Sheet

- Registry: `@yukihi/cobalt-sheet`
- Source: `registry/cobalt/ui/sheet/sheet.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-sheet
```

## 使用例

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

<Sheet />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
