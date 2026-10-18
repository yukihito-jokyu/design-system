import { Alert, AlertTitle, AlertDescription } from "@/registry/cobalt/ui/alert/alert";
import { Button } from "@/registry/cobalt/ui/button/button";
import {
  MotionProvider,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";

export function ErrorState({
  title = "処理を完了できませんでした",
  description,
  onRetry,
  motion = "inherit",
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
  motion?: MotionPreference;
}) {
  return (
    <MotionProvider motion={motion}>
      <Alert variant="destructive">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>{description}</p>
          {onRetry && (
            <Button type="button" variant="outline" onClick={onRetry}>
              再試行
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </MotionProvider>
  );
}
