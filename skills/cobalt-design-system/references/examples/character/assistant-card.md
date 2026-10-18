# AssistantCard

- Registry: `@yukihi/cobalt-assistant-card`
- Source: `registry/cobalt/character/assistant-card/assistant-card.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-assistant-card
```

## 使用例

```tsx
import { AssistantCard } from "@/components/character/assistant-card";

<AssistantCard
  title="次の一歩"
  body="内容を入力してください。"
  suggestions={[{ label: "ヒント", onSelect: () => {} }]}
/>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
