import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

export function ErrorState({
  title = "処理を完了できませんでした",
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
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
  );
}
