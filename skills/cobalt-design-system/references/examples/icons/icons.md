# Iconsの一括export

- Registry: `@yukihi/cobalt-icons`
- Source: `registry/cobalt/icons/icons/index.ts`

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-icons
```

```tsx
import { InkIdeaFeatureIcon } from "@/components/icons";

<InkIdeaFeatureIcon label="アイデア" />;
```

48点の個別SVGと共通枠のexportを導入する。固定の数点だけ必要なら個別itemを選ぶ。実行時の系統・表情選択には`cobalt-character-icons`を使う。固有色を維持する。
