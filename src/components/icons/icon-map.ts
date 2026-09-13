// Dynamic selection for CharacterIcon, FeatureIcon and StatusBubble. Individual icon imports stay independent.
import { FoldWelcomeCharacterIcon } from "./FoldWelcomeCharacterIcon";
import { FoldThinkingCharacterIcon } from "./FoldThinkingCharacterIcon";
import { FoldSuccessCharacterIcon } from "./FoldSuccessCharacterIcon";
import { FoldDocumentFeatureIcon } from "./FoldDocumentFeatureIcon";
import { FoldIdeaFeatureIcon } from "./FoldIdeaFeatureIcon";
import { FoldHistoryFeatureIcon } from "./FoldHistoryFeatureIcon";
import { FoldThinkingStatusIcon } from "./FoldThinkingStatusIcon";
import { FoldSavedStatusIcon } from "./FoldSavedStatusIcon";
import { MonolithWelcomeCharacterIcon } from "./MonolithWelcomeCharacterIcon";
import { MonolithThinkingCharacterIcon } from "./MonolithThinkingCharacterIcon";
import { MonolithSuccessCharacterIcon } from "./MonolithSuccessCharacterIcon";
import { MonolithDocumentFeatureIcon } from "./MonolithDocumentFeatureIcon";
import { MonolithIdeaFeatureIcon } from "./MonolithIdeaFeatureIcon";
import { MonolithHistoryFeatureIcon } from "./MonolithHistoryFeatureIcon";
import { MonolithThinkingStatusIcon } from "./MonolithThinkingStatusIcon";
import { MonolithSavedStatusIcon } from "./MonolithSavedStatusIcon";
import { InkWelcomeCharacterIcon } from "./InkWelcomeCharacterIcon";
import { InkThinkingCharacterIcon } from "./InkThinkingCharacterIcon";
import { InkSuccessCharacterIcon } from "./InkSuccessCharacterIcon";
import { InkDocumentFeatureIcon } from "./InkDocumentFeatureIcon";
import { InkIdeaFeatureIcon } from "./InkIdeaFeatureIcon";
import { InkHistoryFeatureIcon } from "./InkHistoryFeatureIcon";
import { InkThinkingStatusIcon } from "./InkThinkingStatusIcon";
import { InkSavedStatusIcon } from "./InkSavedStatusIcon";
import { AssemblyWelcomeCharacterIcon } from "./AssemblyWelcomeCharacterIcon";
import { AssemblyThinkingCharacterIcon } from "./AssemblyThinkingCharacterIcon";
import { AssemblySuccessCharacterIcon } from "./AssemblySuccessCharacterIcon";
import { AssemblyDocumentFeatureIcon } from "./AssemblyDocumentFeatureIcon";
import { AssemblyIdeaFeatureIcon } from "./AssemblyIdeaFeatureIcon";
import { AssemblyHistoryFeatureIcon } from "./AssemblyHistoryFeatureIcon";
import { AssemblyThinkingStatusIcon } from "./AssemblyThinkingStatusIcon";
import { AssemblySavedStatusIcon } from "./AssemblySavedStatusIcon";
import { ImpressWelcomeCharacterIcon } from "./ImpressWelcomeCharacterIcon";
import { ImpressThinkingCharacterIcon } from "./ImpressThinkingCharacterIcon";
import { ImpressSuccessCharacterIcon } from "./ImpressSuccessCharacterIcon";
import { ImpressDocumentFeatureIcon } from "./ImpressDocumentFeatureIcon";
import { ImpressIdeaFeatureIcon } from "./ImpressIdeaFeatureIcon";
import { ImpressHistoryFeatureIcon } from "./ImpressHistoryFeatureIcon";
import { ImpressThinkingStatusIcon } from "./ImpressThinkingStatusIcon";
import { ImpressSavedStatusIcon } from "./ImpressSavedStatusIcon";
import { OrbitWelcomeCharacterIcon } from "./OrbitWelcomeCharacterIcon";
import { OrbitThinkingCharacterIcon } from "./OrbitThinkingCharacterIcon";
import { OrbitSuccessCharacterIcon } from "./OrbitSuccessCharacterIcon";
import { OrbitDocumentFeatureIcon } from "./OrbitDocumentFeatureIcon";
import { OrbitIdeaFeatureIcon } from "./OrbitIdeaFeatureIcon";
import { OrbitHistoryFeatureIcon } from "./OrbitHistoryFeatureIcon";
import { OrbitThinkingStatusIcon } from "./OrbitThinkingStatusIcon";
import { OrbitSavedStatusIcon } from "./OrbitSavedStatusIcon";

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
