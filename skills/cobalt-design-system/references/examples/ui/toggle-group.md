# ToggleGroup

- Registry: `@yukihi/cobalt-toggle-group`
- Source: `registry/cobalt/ui/toggle-group/toggle-group.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-toggle-group
```

## 使用例

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

<ToggleGroup type="single" defaultValue="list" aria-label="表示形式">
  <ToggleGroupItem value="list">一覧</ToggleGroupItem>
  <ToggleGroupItem value="grid">カード</ToggleGroupItem>
</ToggleGroup>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
