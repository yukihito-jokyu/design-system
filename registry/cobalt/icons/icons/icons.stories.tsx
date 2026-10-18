import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "./index";

const artwork = {
  FoldWelcomeCharacterIcon: Icons.FoldWelcomeCharacterIcon,
  FoldThinkingCharacterIcon: Icons.FoldThinkingCharacterIcon,
  FoldSuccessCharacterIcon: Icons.FoldSuccessCharacterIcon,
  FoldDocumentFeatureIcon: Icons.FoldDocumentFeatureIcon,
  FoldIdeaFeatureIcon: Icons.FoldIdeaFeatureIcon,
  FoldHistoryFeatureIcon: Icons.FoldHistoryFeatureIcon,
  FoldThinkingStatusIcon: Icons.FoldThinkingStatusIcon,
  FoldSavedStatusIcon: Icons.FoldSavedStatusIcon,
  MonolithWelcomeCharacterIcon: Icons.MonolithWelcomeCharacterIcon,
  MonolithThinkingCharacterIcon: Icons.MonolithThinkingCharacterIcon,
  MonolithSuccessCharacterIcon: Icons.MonolithSuccessCharacterIcon,
  MonolithDocumentFeatureIcon: Icons.MonolithDocumentFeatureIcon,
  MonolithIdeaFeatureIcon: Icons.MonolithIdeaFeatureIcon,
  MonolithHistoryFeatureIcon: Icons.MonolithHistoryFeatureIcon,
  MonolithThinkingStatusIcon: Icons.MonolithThinkingStatusIcon,
  MonolithSavedStatusIcon: Icons.MonolithSavedStatusIcon,
  InkWelcomeCharacterIcon: Icons.InkWelcomeCharacterIcon,
  InkThinkingCharacterIcon: Icons.InkThinkingCharacterIcon,
  InkSuccessCharacterIcon: Icons.InkSuccessCharacterIcon,
  InkDocumentFeatureIcon: Icons.InkDocumentFeatureIcon,
  InkIdeaFeatureIcon: Icons.InkIdeaFeatureIcon,
  InkHistoryFeatureIcon: Icons.InkHistoryFeatureIcon,
  InkThinkingStatusIcon: Icons.InkThinkingStatusIcon,
  InkSavedStatusIcon: Icons.InkSavedStatusIcon,
  AssemblyWelcomeCharacterIcon: Icons.AssemblyWelcomeCharacterIcon,
  AssemblyThinkingCharacterIcon: Icons.AssemblyThinkingCharacterIcon,
  AssemblySuccessCharacterIcon: Icons.AssemblySuccessCharacterIcon,
  AssemblyDocumentFeatureIcon: Icons.AssemblyDocumentFeatureIcon,
  AssemblyIdeaFeatureIcon: Icons.AssemblyIdeaFeatureIcon,
  AssemblyHistoryFeatureIcon: Icons.AssemblyHistoryFeatureIcon,
  AssemblyThinkingStatusIcon: Icons.AssemblyThinkingStatusIcon,
  AssemblySavedStatusIcon: Icons.AssemblySavedStatusIcon,
  ImpressWelcomeCharacterIcon: Icons.ImpressWelcomeCharacterIcon,
  ImpressThinkingCharacterIcon: Icons.ImpressThinkingCharacterIcon,
  ImpressSuccessCharacterIcon: Icons.ImpressSuccessCharacterIcon,
  ImpressDocumentFeatureIcon: Icons.ImpressDocumentFeatureIcon,
  ImpressIdeaFeatureIcon: Icons.ImpressIdeaFeatureIcon,
  ImpressHistoryFeatureIcon: Icons.ImpressHistoryFeatureIcon,
  ImpressThinkingStatusIcon: Icons.ImpressThinkingStatusIcon,
  ImpressSavedStatusIcon: Icons.ImpressSavedStatusIcon,
  OrbitWelcomeCharacterIcon: Icons.OrbitWelcomeCharacterIcon,
  OrbitThinkingCharacterIcon: Icons.OrbitThinkingCharacterIcon,
  OrbitSuccessCharacterIcon: Icons.OrbitSuccessCharacterIcon,
  OrbitDocumentFeatureIcon: Icons.OrbitDocumentFeatureIcon,
  OrbitIdeaFeatureIcon: Icons.OrbitIdeaFeatureIcon,
  OrbitHistoryFeatureIcon: Icons.OrbitHistoryFeatureIcon,
  OrbitThinkingStatusIcon: Icons.OrbitThinkingStatusIcon,
  OrbitSavedStatusIcon: Icons.OrbitSavedStatusIcon,
};

function Icon({ name, size, label }: { name: keyof typeof artwork; size: number; label: string }) {
  const Component = artwork[name];
  return <Component size={size} label={label} />;
}

const meta = {
  title: "Cobalt/Icons/Icons",
  component: Icon,
  parameters: { designSystem: "cobalt" },
  args: { name: "FoldWelcomeCharacterIcon", size: 96, label: "ようこそ" },
  argTypes: {
    name: { control: "select", options: Object.keys(artwork) },
    size: { control: { type: "number", min: 12, max: 512 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
