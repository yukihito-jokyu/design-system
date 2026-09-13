import { iconComponents, statusPalettes, type IconDirection } from "../icons/icon-map";
import { cn } from "@/lib/utils";
export { directions, type IconDirection } from "../icons/icon-map";
type CommonProps = { direction?: IconDirection; size?: number; label?: string; className?: string };
export type CharacterIconProps = CommonProps & { expression?: "welcome" | "thinking" | "success" };
export type FeatureIconProps = CommonProps & { name: "document" | "idea" | "history" };

// Compatibility API: dynamic selection uses the individually importable TSX components.
function SvgIcon({
  direction = "fold",
  size = 48,
  label = "",
  className,
  kind,
  name,
}: CommonProps & { kind: "character" | "feature" | "status"; name: string }) {
  const Icon = iconComponents[`${direction}/${kind}-${name}` as keyof typeof iconComponents];
  if (!Icon) throw new Error("Unknown icon kind/name");
  return <Icon size={size} label={label} className={className} />;
}

export function CharacterIcon({ expression = "welcome", size = 48, ...props }: CharacterIconProps) {
  return <SvgIcon {...props} size={size} kind="character" name={expression} />;
}

export function FeatureIcon({ name, size = 24, ...props }: FeatureIconProps) {
  return <SvgIcon {...props} size={size} kind="feature" name={name} />;
}

export type StatusBubbleProps = {
  direction?: IconDirection;
  status: "thinking" | "saved";
  children?: React.ReactNode;
  announce?: boolean;
  className?: string;
};

export function StatusBubble({
  direction = "fold",
  status,
  children,
  announce = false,
  className,
}: StatusBubbleProps) {
  const palette = statusPalettes[`${direction}/${status}`];
  return (
    <span
      className={cn("ds-status-bubble", className)}
      role={announce ? "status" : undefined}
      style={{
        backgroundColor: palette.background,
        color: palette.foreground,
        borderColor: palette.foreground,
      }}
    >
      <SvgIcon direction={direction} kind="status" name={status} size={20} />
      <span
        style={direction === "assembly" && status === "saved" ? { color: "#28180f" } : undefined}
      >
        {children ?? (status === "thinking" ? "考え中" : "保存しました")}
      </span>
    </span>
  );
}
