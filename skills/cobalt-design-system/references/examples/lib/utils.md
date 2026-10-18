# cn

- Registry: `@yukihi/cobalt-utils`
- Source: `registry/cobalt/lib/utils/utils.ts`

```sh
npx shadcn@4.21.0 add @yukihi/cobalt-utils
```

```tsx
import { cn } from "@/lib/utils";

<div className={cn("cobalt-stack", "w-full")}>内容</div>;
```

共通部品が依存として導入する。独自のクラス結合処理を追加する前に利用する。
