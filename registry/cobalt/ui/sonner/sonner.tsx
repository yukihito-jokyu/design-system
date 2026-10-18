import type { CSSProperties } from "react";
import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  useDesignMotion,
  type MotionPreference,
} from "@/registry/cobalt/components/theme-provider/motion-provider";
import { Spinner } from "@/registry/cobalt/ui/spinner/spinner";
import { cn } from "@/registry/cobalt/lib/utils/utils";

function Toaster({
  motion = "inherit",
  className,
  style,
  toastOptions,
  icons,
  ...props
}: ToasterProps & { motion?: MotionPreference }) {
  const effective = useDesignMotion(motion);
  return (
    <div className="cobalt-toaster" data-cobalt-motion={effective}>
      <Sonner
        theme="light"
        className={cn("cobalt-toast-region", className)}
        icons={{
          success: <CircleCheckIcon />,
          info: <InfoIcon />,
          warning: <TriangleAlertIcon />,
          error: <OctagonXIcon />,
          loading: <Spinner motion={motion} />,
          ...icons,
        }}
        style={
          {
            "--normal-bg": "var(--cobalt-surface)",
            "--normal-text": "var(--cobalt-foreground)",
            "--normal-border": "var(--cobalt-border)",
            "--border-radius": "var(--cobalt-radius-control)",
            ...style,
          } as CSSProperties
        }
        toastOptions={{ closeButtonAriaLabel: "通知を閉じる", ...toastOptions }}
        {...props}
      />
    </div>
  );
}

export { Toaster };
