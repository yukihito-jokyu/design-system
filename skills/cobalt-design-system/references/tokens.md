# Tokenと視覚仕様

共通値とCSSの正本は`registry/cobalt/styles/registry.json`の`cobalt-design-system-styles`。この表は使い分けの要約であり、変更時は必ず正本と配布物を確認する。new-yorkの値を参照しない。

## 配色と文字

- テーマは`light`のみ。主色`--cobalt-primary: #0647ed`、水色`--cobalt-accent: #00b4dc`、背景`--cobalt-background: #f7f9fc`、面`--cobalt-surface: #ffffff`、文字`--cobalt-foreground: #232b3a`。
- 面・文字・枠・アクセントは用途に対応する`--cobalt-*`を使う。Tailwindには`bg-cobalt-surface`・`text-cobalt-foreground`等が接続される。任意のTokenがすべてTailwind utilityになるとは扱わない。
- 主要操作のグラデーションは`--cobalt-action-gradient`を使い、白文字の背面に青を多く残す配分を維持する。水色単色を主要ボタンの背景にしない。
- Noto Sans JPの400/500/600/700。ラベル600、見出し700を基準とする。共通CSSがGoogle Fontsから取得する。

## 寸法とレスポンシブ

| 用途                     | 601px以上      | 600px以下      |
| ------------------------ | -------------- | -------------- |
| 操作高Token sm / md / lg | 44 / 48 / 56px | 36 / 40 / 44px |
| Input既定の最小高        | 48px           | 40px           |
| 本文                     | 16px、行高1.9  | 15px、行高1.7  |
| Input文字                | 16px           | 16px           |
| 見出しtitle / heading    | 24 / 36px      | 20 / 26px      |
| Card内側の余白・角丸     | 28 / 28px      | 16 / 16px      |
| control角丸              | 24px           | 10px           |
| Button角丸               | 999px          | 10px           |

Buttonは`size="sm" | "default" | "lg"`、Inputは`controlSize="sm" | "md" | "lg"`を使う。表はTokenの値であり、内容によって実際の高さは増える。アイコンボタンは狭い画面でも44pxの操作領域を確保する。

余白は`--cobalt-space-1`〜`-8`（4px刻み）、`-10`（40px）、`-12`（48px）、`-16`（64px）。枠の基準は`--cobalt-border-width: 1.5px`、フォーカスは幅2px・offset 3px。Patternの共通クラス`cobalt-stack`・`cobalt-field`・`cobalt-actions`等を維持する。

AppShellと`useIsMobile`は768px未満でモバイル構成へ切り替わる。600pxの寸法切替と混同しない。狭い画面ではCardFooterの主要ボタンが全幅になる。表内部の横スクロールを許し、画面全体をはみ出させない。`body`や見出しへ独自のグローバルスタイルを追加しない。

## SVGの選択

- 6系統は`fold`・`impress`・`assembly`・`orbit`・`ink`・`monolith`。各系統はCharacter 3表情、Feature 3用途、Status 2状態で、個別SVGは計48点。
- 固定SVGは[個別itemの例](examples/icons/ink-idea-feature-icon.md)から選ぶ。動的な系統選択だけ[character-icons](examples/character/character-icons.md)を使う。全exportが必要な場合は[icons](examples/icons/icons.md)を使う。
- SVGの輪郭・固有色・名前付きexportを変えない。`currentColor`への置換、単色化、テーマ色への置換をしない。装飾なら`label`を省略し、意味を持つなら日本語の説明を付ける。
- StatusBubbleは系統別の背景・文字・枠を維持する。assemblyのsavedは文言色だけ`#28180f`。`announce`は更新を通知する必要があるときに使う。

Providerの`tokens`は`--cobalt-*`の上書きを受け取るが、承認済みの配色や寸法を推測で変更する用途には使わない。PortalはProviderのTokenも継承する。
