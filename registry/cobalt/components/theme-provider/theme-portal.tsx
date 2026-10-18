import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { DesignThemeProvider, useDesignTheme, useDesignTokens } from "./theme-provider";
import { type MotionPreference } from "./motion-provider";

// PortalではDOMの親が変わるため、テーマと上書きした色を配置先へ渡す。
export function ThemePortal({
  children,
  container,
  motion = "inherit",
}: {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
  motion?: MotionPreference;
}) {
  const theme = useDesignTheme();
  const tokens = useDesignTokens();

  return createPortal(
    <DesignThemeProvider theme={theme} tokens={tokens} motion={motion}>
      {children}
    </DesignThemeProvider>,
    container ?? document.body,
  );
}
