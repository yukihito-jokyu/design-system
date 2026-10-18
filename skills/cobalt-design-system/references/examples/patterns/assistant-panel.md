# AssistantPanel

- Registry: `@yukihi/cobalt-assistant-panel`
- Source: `registry/cobalt/patterns/assistant-panel/assistant-panel.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-assistant-panel
```

## 使用例

```tsx
import { AssistantPanel } from "@/components/patterns/assistant-panel";

<AssistantPanel title="次の一歩" body="内容を入力してください。" onClose={() => {}} />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
