# SuggestionChip

- Registry: `@yukihi/cobalt-suggestion-chip`
- Source: `registry/cobalt/character/suggestion-chip/suggestion-chip.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-suggestion-chip
```

## 使用例

```tsx
import { SuggestionChip } from "@/components/character/suggestion-chip";

<SuggestionChip label="続きを提案" onSelect={() => {}} />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
