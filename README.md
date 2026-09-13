# design-system

再利用するデザインシステム本体です。Foundation 39種類・Character 9種類・Pattern 10種類・個別SVGアイコン48点を含みます。

## 構成

- `src/components/`：UI、Character、Pattern、個別アイコン、ThemeProvider
- `src/hooks/`、`src/lib/`：部品が使用する補助コード
- `src/styles.css`：部品とPatternの共通スタイル
- `tokens/`：配色・寸法の正本
- `registry/styles/`：生成したToken CSSとTailwind接続
- `scripts/build-design-tokens.mjs`：Tokenの再生成

```sh
npm ci
npm run typecheck
npm run tokens
```

ReactとTailwind v4を用いるアプリで利用します。スタイルは `src/styles.css`、テーマの切り替えは `DesignThemeProvider` を使用します。

## Registryをローカルで使う

Registryと導入先の両方で、shadcnをRadix構成にします。現行CLIでBase UI構成へ入れると`asChild`が`render`へ変換されるため、このデザインシステムでは`radix`を指定してください。

```sh
# このリポジトリ
npm ci
REGISTRY_BASE_URL=http://127.0.0.1:4173/r npm run registry:build
npm run registry:serve

# React + TypeScript + Tailwind v4の導入先（別ターミナル）
npx shadcn@latest init --base radix
npx shadcn@latest add http://127.0.0.1:4173/r/button.json
```

導入先のTailwind CSSファイルで、Tailwindの後に共通スタイルを1回読み込みます。`body`や見出しへデザインシステムの見た目は適用されません。

```css
@import "tailwindcss";
@import "@/components/design-system/styles.css";
```

```tsx
import { DesignThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <DesignThemeProvider theme="sage">
      <Button>保存する</Button>
    </DesignThemeProvider>
  );
}
```

全項目は`design-system.json`、動的な6案選択APIは`character-icons.json`から導入できます。

```sh
npx shadcn@latest add http://127.0.0.1:4173/r/design-system.json
```

個別SVGはそれぞれ独立項目です。たとえば次の導入は`InkIdeaFeatureIcon`と`IconFrame`だけを追加し、他の47点を追加しません。

```sh
npx shadcn@latest add http://127.0.0.1:4173/r/ink-idea-feature-icon.json
```

標準の公開先は`https://design.yukihi.tokyo/v1/r`です。別のURLやポートで配信する場合は、依存URLをその配信先にしてから生成します。

```sh
REGISTRY_BASE_URL=https://別の配信先.example/v1/r npm run registry:build
```

GitHub・CI・Cloudflare Workers配信・`@yukihi`名前空間を含む正式運用は、[Registry運用・導入手順書](docs/registry-operations.md)を参照してください。

## AI向け利用ルール

このデザインシステム専用のAgent Skillは[`skills/design-system/`](skills/design-system/SKILL.md)で管理します。公開後はGitHubから導入できます。

```sh
npx skills add yukihito-jokyu/design-system --skill design-system
```

Skillにはコンポーネント選択、Token、検証ルールと、Registryで導入できる各コンポーネントの使用例があります。AIは対象を決めた後、`skills/design-system/references/examples/`にある同名ファイルを参照します。

- 新規UIを作る前にRegistryの既存Foundation・Character・Patternを検索し、合成で対応する。
- 配色・寸法の共通値は`tokens/`を正本とし、`foundation.json`の`decided`と`proposed`を混同しない。
- SVGの形・固有色、StatusBubbleの独自配色、既存の名前付きexportを変更しない。
- Portal部品は`DesignThemeProvider`のテーマ継承を維持し、disabled、invalid、loading、IME、フォーカス復帰、Reduced Motionを退行させない。

```tsx
import { Button } from "@/components/ui/button";
import { FoldWelcomeCharacterIcon } from "@/components/icons/FoldWelcomeCharacterIcon";
```

配色5セット、操作高36/44/48px、薄い枠4px・濃い枠2px。SVGの固有色と輪郭を保持します。

カタログ・検証環境・画像原案・設計履歴は本体に含めません。開発時の一式は元の作業場所の `development-preview/` に保存しています。

このリポジトリ独自コードは[MIT License](LICENSE)で公開します。第三者由来コードと依存パッケージの表記は[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)を参照してください。
