# MessageBubble

- Registry: `@yukihi/cobalt-message-bubble`
- Source: `registry/cobalt/character/message-bubble/message-bubble.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-message-bubble
```

## 使用例

```tsx
import { MessageBubble } from "@/components/character/message-bubble";

<MessageBubble author="アシスタント">回答内容です。</MessageBubble>;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
