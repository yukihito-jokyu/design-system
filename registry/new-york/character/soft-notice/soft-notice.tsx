import type { ReactNode } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/registry/new-york/ui/alert/alert";

export function SoftNotice({
  title,
  children,
  tone = "neutral",
  action,
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
  action?: ReactNode;
}) {
  return (
    <Alert className={`ds-tone-${tone}`}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {children}
        {action}
      </AlertDescription>
    </Alert>
  );
}
