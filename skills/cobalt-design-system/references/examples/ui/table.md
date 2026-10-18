# Table

- Registry: `@yukihi/cobalt-table`
- Source: `registry/cobalt/ui/table/table.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-table
```

## 使用例

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

<Table />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
