# Pagination

- Registry: `@yukihi/cobalt-pagination`
- Source: `registry/cobalt/ui/pagination/pagination.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-pagination
```

## 使用例

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

<Pagination />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
