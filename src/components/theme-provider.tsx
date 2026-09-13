"use client";
import { createContext, useContext, type ReactNode } from "react";
export type ThemeName = "milk" | "cream" | "neutral" | "sage" | "lavender";
const ThemeContext = createContext<ThemeName>("milk");
export const useDesignTheme = () => useContext(ThemeContext);

export function DesignThemeProvider({
  theme,
  children,
}: {
  theme: ThemeName;
  children: ReactNode;
}) {
  return (
    <ThemeContext.Provider value={theme}>
      <div data-ds-base={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
