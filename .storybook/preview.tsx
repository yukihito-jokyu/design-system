import type { Preview } from "@storybook/react-vite";
import { useEffect, type ReactNode } from "react";
import {
  DesignThemeProvider,
  type ThemeName,
} from "../registry/new-york/components/theme-provider/theme-provider";
import "./styles.css";

const themes: ThemeName[] = ["milk", "cream", "neutral", "sage", "lavender"];

function ThemeFrame({ theme, children }: { theme: ThemeName; children: ReactNode }) {
  useEffect(() => {
    document.body.dataset.dsBase = theme;
    return () => {
      delete document.body.dataset.dsBase;
    };
  }, [theme]);

  return (
    <DesignThemeProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          padding: "var(--ds-space-6)",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {children}
      </div>
    </DesignThemeProvider>
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Design System theme",
      toolbar: { title: "Theme", items: themes, dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "milk" },
  decorators: [
    (Story, context) => {
      const selected = context.globals.theme as ThemeName;
      const theme = themes.includes(selected) ? selected : "milk";
      return (
        <ThemeFrame theme={theme}>
          <Story />
        </ThemeFrame>
      );
    },
  ],
};

export default preview;
