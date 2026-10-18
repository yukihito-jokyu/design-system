import type { Preview } from "@storybook/react-vite";
import { useEffect, type ReactNode } from "react";
import {
  DesignThemeProvider,
  type ThemeName,
} from "../registry/new-york/components/theme-provider/theme-provider";
import { ThemeProvider as CobaltThemeProvider } from "../registry/cobalt/components/theme-provider/theme-provider";
import "./styles.css";
import "./cobalt.css";
import "./compatibility.css";

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
    motion: {
      description: "cobalt全体の動き。各部品の明示指定とOS設定も反映します。",
      toolbar: {
        title: "Motion",
        items: [
          { value: "on", title: "ON" },
          { value: "off", title: "OFF" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: "Design System theme",
      toolbar: { title: "Theme", items: themes, dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "milk", motion: "on" },
  decorators: [
    (Story, context) => {
      if (context.parameters.designSystem === "cobalt") {
        return (
          <CobaltThemeProvider motion={context.globals.motion === "off" ? "off" : "on"}>
            <div
              style={{
                minHeight: "100vh",
                padding: "clamp(16px, 4vw, 24px)",
                background: "var(--cobalt-background)",
                color: "var(--cobalt-foreground)",
              }}
            >
              <Story />
            </div>
          </CobaltThemeProvider>
        );
      }
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
