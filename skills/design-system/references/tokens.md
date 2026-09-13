# Tokenと視覚仕様

- `tokens/`を共通値の正本とする。
- `tokens/foundation.json`の`decided`と`proposed`を区別する。
- 配色は`milk`、`cream`、`neutral`、`sage`、`lavender`から選ぶ。
- 面・文字・枠・アクセントを同じ配色セットで連動させる。
- 操作高36px、44px、48pxを維持する。
- 薄い枠4px、濃い枠2pxを維持する。
- 角丸8px、12px、20px、28pxを維持する。
- 個別SVGの形と固有色をテーマ色へ置換しない。
- StatusBubbleの独自配色を維持する。
- ASSEMBLY保存Bubbleの文言色だけ`#28180f`を維持する。
- 利用アプリの`body`や見出しへグローバルな見た目を追加しない。
- `stack`、`field`、`actions`などPatternが使う共通クラスを削除しない。
