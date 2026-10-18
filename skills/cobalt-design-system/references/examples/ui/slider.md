# Slider

- Registry: `@yukihi/cobalt-slider`
- Source: `registry/cobalt/ui/slider/slider.tsx`

## 導入

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-slider
```

## 使用例

```tsx
import { Slider } from "@/components/ui/slider";

<Slider defaultValue={[50]} thumbLabels={["音量"]} />;
```

アプリを[Provider](../theme-provider.md)で囲み、必要な状態・Propsは導入後の型定義で確認する。Tokenとアクセシビリティ属性を維持する。
