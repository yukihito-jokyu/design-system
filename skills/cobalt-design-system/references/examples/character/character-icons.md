# CharacterIcon・FeatureIcon・StatusBubble

- Registry: `@yukihi/cobalt-character-icons`
- Source: `registry/cobalt/character/character-icons/index.tsx`

## 導入

動的に6方向のアイコンを選択するときだけ使用します。個別SVGだけが必要なら、対応する個別itemを導入します。

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-character-icons
```

## 使用例

```tsx
import { CharacterIcon, FeatureIcon, StatusBubble } from "@/components/character";

<CharacterIcon direction="fold" expression="welcome" label="ようこそ" />;
<FeatureIcon direction="ink" name="idea" label="アイデア" />;
<StatusBubble direction="assembly" status="saved" announce />;
```

個別アイコンの例は`../icons/`を参照する。

`directions`・`IconDirection`も同じ入口からexportされる。SVG本体とStatusBubbleに`motion` Propはない。固有色を維持する。
