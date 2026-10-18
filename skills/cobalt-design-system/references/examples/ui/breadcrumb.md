# Breadcrumb

- Registry: `@yukihi/cobalt-breadcrumb`
- Source: `registry/cobalt/ui/breadcrumb/breadcrumb.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-breadcrumb
```

## 使用例

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

<Breadcrumb />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
