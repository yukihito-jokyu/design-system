// CharacterIcon、FeatureIcon、StatusBubbleで動的に選択する。個別アイコンの読み込みは独立させる。
import { FoldWelcomeCharacterIcon } from "@/registry/cobalt/icons/fold-welcome-character-icon/FoldWelcomeCharacterIcon";
import { FoldThinkingCharacterIcon } from "@/registry/cobalt/icons/fold-thinking-character-icon/FoldThinkingCharacterIcon";
import { FoldSuccessCharacterIcon } from "@/registry/cobalt/icons/fold-success-character-icon/FoldSuccessCharacterIcon";
import { FoldDocumentFeatureIcon } from "@/registry/cobalt/icons/fold-document-feature-icon/FoldDocumentFeatureIcon";
import { FoldIdeaFeatureIcon } from "@/registry/cobalt/icons/fold-idea-feature-icon/FoldIdeaFeatureIcon";
import { FoldHistoryFeatureIcon } from "@/registry/cobalt/icons/fold-history-feature-icon/FoldHistoryFeatureIcon";
import { FoldThinkingStatusIcon } from "@/registry/cobalt/icons/fold-thinking-status-icon/FoldThinkingStatusIcon";
import { FoldSavedStatusIcon } from "@/registry/cobalt/icons/fold-saved-status-icon/FoldSavedStatusIcon";
import { MonolithWelcomeCharacterIcon } from "@/registry/cobalt/icons/monolith-welcome-character-icon/MonolithWelcomeCharacterIcon";
import { MonolithThinkingCharacterIcon } from "@/registry/cobalt/icons/monolith-thinking-character-icon/MonolithThinkingCharacterIcon";
import { MonolithSuccessCharacterIcon } from "@/registry/cobalt/icons/monolith-success-character-icon/MonolithSuccessCharacterIcon";
import { MonolithDocumentFeatureIcon } from "@/registry/cobalt/icons/monolith-document-feature-icon/MonolithDocumentFeatureIcon";
import { MonolithIdeaFeatureIcon } from "@/registry/cobalt/icons/monolith-idea-feature-icon/MonolithIdeaFeatureIcon";
import { MonolithHistoryFeatureIcon } from "@/registry/cobalt/icons/monolith-history-feature-icon/MonolithHistoryFeatureIcon";
import { MonolithThinkingStatusIcon } from "@/registry/cobalt/icons/monolith-thinking-status-icon/MonolithThinkingStatusIcon";
import { MonolithSavedStatusIcon } from "@/registry/cobalt/icons/monolith-saved-status-icon/MonolithSavedStatusIcon";
import { InkWelcomeCharacterIcon } from "@/registry/cobalt/icons/ink-welcome-character-icon/InkWelcomeCharacterIcon";
import { InkThinkingCharacterIcon } from "@/registry/cobalt/icons/ink-thinking-character-icon/InkThinkingCharacterIcon";
import { InkSuccessCharacterIcon } from "@/registry/cobalt/icons/ink-success-character-icon/InkSuccessCharacterIcon";
import { InkDocumentFeatureIcon } from "@/registry/cobalt/icons/ink-document-feature-icon/InkDocumentFeatureIcon";
import { InkIdeaFeatureIcon } from "@/registry/cobalt/icons/ink-idea-feature-icon/InkIdeaFeatureIcon";
import { InkHistoryFeatureIcon } from "@/registry/cobalt/icons/ink-history-feature-icon/InkHistoryFeatureIcon";
import { InkThinkingStatusIcon } from "@/registry/cobalt/icons/ink-thinking-status-icon/InkThinkingStatusIcon";
import { InkSavedStatusIcon } from "@/registry/cobalt/icons/ink-saved-status-icon/InkSavedStatusIcon";
import { AssemblyWelcomeCharacterIcon } from "@/registry/cobalt/icons/assembly-welcome-character-icon/AssemblyWelcomeCharacterIcon";
import { AssemblyThinkingCharacterIcon } from "@/registry/cobalt/icons/assembly-thinking-character-icon/AssemblyThinkingCharacterIcon";
import { AssemblySuccessCharacterIcon } from "@/registry/cobalt/icons/assembly-success-character-icon/AssemblySuccessCharacterIcon";
import { AssemblyDocumentFeatureIcon } from "@/registry/cobalt/icons/assembly-document-feature-icon/AssemblyDocumentFeatureIcon";
import { AssemblyIdeaFeatureIcon } from "@/registry/cobalt/icons/assembly-idea-feature-icon/AssemblyIdeaFeatureIcon";
import { AssemblyHistoryFeatureIcon } from "@/registry/cobalt/icons/assembly-history-feature-icon/AssemblyHistoryFeatureIcon";
import { AssemblyThinkingStatusIcon } from "@/registry/cobalt/icons/assembly-thinking-status-icon/AssemblyThinkingStatusIcon";
import { AssemblySavedStatusIcon } from "@/registry/cobalt/icons/assembly-saved-status-icon/AssemblySavedStatusIcon";
import { ImpressWelcomeCharacterIcon } from "@/registry/cobalt/icons/impress-welcome-character-icon/ImpressWelcomeCharacterIcon";
import { ImpressThinkingCharacterIcon } from "@/registry/cobalt/icons/impress-thinking-character-icon/ImpressThinkingCharacterIcon";
import { ImpressSuccessCharacterIcon } from "@/registry/cobalt/icons/impress-success-character-icon/ImpressSuccessCharacterIcon";
import { ImpressDocumentFeatureIcon } from "@/registry/cobalt/icons/impress-document-feature-icon/ImpressDocumentFeatureIcon";
import { ImpressIdeaFeatureIcon } from "@/registry/cobalt/icons/impress-idea-feature-icon/ImpressIdeaFeatureIcon";
import { ImpressHistoryFeatureIcon } from "@/registry/cobalt/icons/impress-history-feature-icon/ImpressHistoryFeatureIcon";
import { ImpressThinkingStatusIcon } from "@/registry/cobalt/icons/impress-thinking-status-icon/ImpressThinkingStatusIcon";
import { ImpressSavedStatusIcon } from "@/registry/cobalt/icons/impress-saved-status-icon/ImpressSavedStatusIcon";
import { OrbitWelcomeCharacterIcon } from "@/registry/cobalt/icons/orbit-welcome-character-icon/OrbitWelcomeCharacterIcon";
import { OrbitThinkingCharacterIcon } from "@/registry/cobalt/icons/orbit-thinking-character-icon/OrbitThinkingCharacterIcon";
import { OrbitSuccessCharacterIcon } from "@/registry/cobalt/icons/orbit-success-character-icon/OrbitSuccessCharacterIcon";
import { OrbitDocumentFeatureIcon } from "@/registry/cobalt/icons/orbit-document-feature-icon/OrbitDocumentFeatureIcon";
import { OrbitIdeaFeatureIcon } from "@/registry/cobalt/icons/orbit-idea-feature-icon/OrbitIdeaFeatureIcon";
import { OrbitHistoryFeatureIcon } from "@/registry/cobalt/icons/orbit-history-feature-icon/OrbitHistoryFeatureIcon";
import { OrbitThinkingStatusIcon } from "@/registry/cobalt/icons/orbit-thinking-status-icon/OrbitThinkingStatusIcon";
import { OrbitSavedStatusIcon } from "@/registry/cobalt/icons/orbit-saved-status-icon/OrbitSavedStatusIcon";

export const iconComponents = {
  "fold/character-welcome": FoldWelcomeCharacterIcon,
  "fold/character-thinking": FoldThinkingCharacterIcon,
  "fold/character-success": FoldSuccessCharacterIcon,
  "fold/feature-document": FoldDocumentFeatureIcon,
  "fold/feature-idea": FoldIdeaFeatureIcon,
  "fold/feature-history": FoldHistoryFeatureIcon,
  "fold/status-thinking": FoldThinkingStatusIcon,
  "fold/status-saved": FoldSavedStatusIcon,
  "monolith/character-welcome": MonolithWelcomeCharacterIcon,
  "monolith/character-thinking": MonolithThinkingCharacterIcon,
  "monolith/character-success": MonolithSuccessCharacterIcon,
  "monolith/feature-document": MonolithDocumentFeatureIcon,
  "monolith/feature-idea": MonolithIdeaFeatureIcon,
  "monolith/feature-history": MonolithHistoryFeatureIcon,
  "monolith/status-thinking": MonolithThinkingStatusIcon,
  "monolith/status-saved": MonolithSavedStatusIcon,
  "ink/character-welcome": InkWelcomeCharacterIcon,
  "ink/character-thinking": InkThinkingCharacterIcon,
  "ink/character-success": InkSuccessCharacterIcon,
  "ink/feature-document": InkDocumentFeatureIcon,
  "ink/feature-idea": InkIdeaFeatureIcon,
  "ink/feature-history": InkHistoryFeatureIcon,
  "ink/status-thinking": InkThinkingStatusIcon,
  "ink/status-saved": InkSavedStatusIcon,
  "assembly/character-welcome": AssemblyWelcomeCharacterIcon,
  "assembly/character-thinking": AssemblyThinkingCharacterIcon,
  "assembly/character-success": AssemblySuccessCharacterIcon,
  "assembly/feature-document": AssemblyDocumentFeatureIcon,
  "assembly/feature-idea": AssemblyIdeaFeatureIcon,
  "assembly/feature-history": AssemblyHistoryFeatureIcon,
  "assembly/status-thinking": AssemblyThinkingStatusIcon,
  "assembly/status-saved": AssemblySavedStatusIcon,
  "impress/character-welcome": ImpressWelcomeCharacterIcon,
  "impress/character-thinking": ImpressThinkingCharacterIcon,
  "impress/character-success": ImpressSuccessCharacterIcon,
  "impress/feature-document": ImpressDocumentFeatureIcon,
  "impress/feature-idea": ImpressIdeaFeatureIcon,
  "impress/feature-history": ImpressHistoryFeatureIcon,
  "impress/status-thinking": ImpressThinkingStatusIcon,
  "impress/status-saved": ImpressSavedStatusIcon,
  "orbit/character-welcome": OrbitWelcomeCharacterIcon,
  "orbit/character-thinking": OrbitThinkingCharacterIcon,
  "orbit/character-success": OrbitSuccessCharacterIcon,
  "orbit/feature-document": OrbitDocumentFeatureIcon,
  "orbit/feature-idea": OrbitIdeaFeatureIcon,
  "orbit/feature-history": OrbitHistoryFeatureIcon,
  "orbit/status-thinking": OrbitThinkingStatusIcon,
  "orbit/status-saved": OrbitSavedStatusIcon,
} as const;

export const directions = ["fold", "monolith", "ink", "assembly", "impress", "orbit"] as const;
export type IconDirection = (typeof directions)[number];

export const statusPalettes = {
  "fold/thinking": {
    background: "#feefe1",
    foreground: "#4c281e",
  },
  "fold/saved": {
    background: "#fef0e1",
    foreground: "#4c281e",
  },
  "monolith/thinking": {
    background: "#efebf5",
    foreground: "#262568",
  },
  "monolith/saved": {
    background: "#f0ebf9",
    foreground: "#262568",
  },
  "ink/thinking": {
    background: "#f2f5e5",
    foreground: "#143e35",
  },
  "ink/saved": {
    background: "#f1f5e4",
    foreground: "#143e35",
  },
  "assembly/thinking": {
    background: "#f6ead5",
    foreground: "#543326",
  },
  "assembly/saved": {
    background: "#e7572d",
    foreground: "#fffdf7",
  },
  "impress/thinking": {
    background: "#dfeaf0",
    foreground: "#194496",
  },
  "impress/saved": {
    background: "#173f95",
    foreground: "#fffdf7",
  },
  "orbit/thinking": {
    background: "#eae4f2",
    foreground: "#49388e",
  },
  "orbit/saved": {
    background: "#3b2f85",
    foreground: "#fffdf7",
  },
} as const;
