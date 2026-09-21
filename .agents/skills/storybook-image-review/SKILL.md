---
name: storybook-image-review
description: StorybookのStoryをPNGとして撮影し、画像入力でAIがUIを検証する。Storybook画面の見た目、レイアウト、テーマ、レスポンシブ表示を確認したいとき、computer useの代わりに画像を渡したいときに使用する。
---

# Storybook画像検証

## 手順

1. リポジトリの `AGENTS.md` と `.storybook/main.ts`、`.storybook/preview.tsx` を確認する。リポジトリ内に検証画像や静的出力を残さない。
2. `python3 .agents/skills/storybook-image-review/scripts/capture.py --story <story-id>` を実行する。必要なら `--theme cream`、`--width 390 --height 844`、`--full-page`、`--output /tmp/name.png` を指定する。毎回Storybookを一時ディレクトリにビルドする。
3. スクリプトが出したPNGを画像入力として実際に開く。Codexでは `view_image` を使い、その画像をモデルに渡す。ファイルが存在するだけでは「AIが見た」と報告しない。
4. 人間も同じPNGを確認できるようにする。macOSでは `open -a Preview <PNGの絶対パス>` で開く。会話では `![撮影したStory](<PNGの絶対パス>)` と画像リンクを併記する。ファイルリンクだけを提示して可視性を保証しない。利用可能なら画像を会話の画像出力にも載せる。
5. 画像内で確認できた文字、配置、色、欠けや崩れを具体的に記す。Storybookのエラー画面、空のキャンバス、読み込み途中なら成功扱いにしない。
6. 必要な状態を比較するときは、Story ID、テーマ、幅を変えて撮り直す。比較対象の条件と画像パスを報告する。

## 依存と失敗時の確認

- `npm`、`python3`、`playwright` CLI、Chromeが必要。`playwright screenshot --help` と `ls /Applications/Google\ Chrome.app` で確認する。
- スクリプトは `index.json` でStory IDを検証し、localhostだけで静的Storybookを配信する。ポート待受がサンドボックスで拒否された場合は、その操作だけ承認付きで再実行する。
- `#storybook-root` の出現に加え、PNGを開いて実際のStoryを確認する。表示が未完了なら再撮影し、必要に応じて `--wait-ms` を増やす。
- AIに画像を渡せる画像読取りツールがない環境では、PNG作成までを報告し、AIによる視覚検証は未実施と明記する。
