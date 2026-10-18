# DataTable

- Registry: `@yukihi/cobalt-data-table`
- Source: `registry/cobalt/patterns/data-table/data-table.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-data-table
```

## 使用例

```tsx
import { DataTable } from "@/components/patterns/data-table";

<DataTable
  rows={[{ id: "1", name: "文書" }]}
  columns={[{ id: "name", header: "名前", value: (row) => row.name }]}
  getRowId={(row) => row.id}
  caption="文書一覧"
/>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
