# SearchField

- Registry: `@yukihi/cobalt-search-field`
- Source: `registry/cobalt/patterns/search-field/search-field.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-search-field
```

## 使用例

```tsx
import { SearchField } from "@/components/patterns/search-field";

<SearchField value={query} onValueChange={setQuery} />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
