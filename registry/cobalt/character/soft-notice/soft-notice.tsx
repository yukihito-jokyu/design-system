import type { ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/registry/cobalt/ui/alert/alert";
import {
  MotionProvider,
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function SoftNotice({
  title,
  children,
  tone = "neutral",
  action,
  motion = "inherit",
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
  action?: ReactNode;
  motion?: MotionPreference;
}) {
  const effective = useDesignMotion(motion);
  return (
    <MotionProvider motion={motion}>
      <Alert
        className="cobalt-character-entry"
        data-cobalt-motion={effective}
        variant={tone === "danger" ? "destructive" : tone === "neutral" ? "default" : tone}
      >
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {children}
          {action && <div className="cobalt-actions">{action}</div>}
        </AlertDescription>
      </Alert>
    </MotionProvider>
  );
}
