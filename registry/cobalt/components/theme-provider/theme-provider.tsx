import { createContext, useContext, type ReactNode } from "react";
import { MotionProvider, type MotionPreference } from "./motion-provider";

export type ThemeName = "light";
export type DesignTokens = { [key: `--cobalt-${string}`]: string | number };
const ThemeContext = createContext<ThemeName>("light");
const TokensContext = createContext<DesignTokens>({});
export const useDesignTheme = () => useContext(ThemeContext);
export const useDesignTokens = () => useContext(TokensContext);

export function DesignThemeProvider({
  theme,
  children,
  motion = "inherit",
  tokens,
}: {
  theme: ThemeName;
  children: ReactNode;
  motion?: MotionPreference;
  tokens?: DesignTokens;
}) {
  const inheritedTokens = useDesignTokens();
  const mergedTokens = { ...inheritedTokens, ...tokens };

  return (
    <ThemeContext.Provider value={theme}>
      <TokensContext.Provider value={mergedTokens}>
        <MotionProvider motion={motion}>
          <div className="cobalt-root" data-cobalt-theme={theme} style={mergedTokens}>
            {children}
          </div>
        </MotionProvider>
      </TokensContext.Provider>
    </ThemeContext.Provider>
  );
}

// 既存と同じく、テーマ指定なしで読み込むための入口を用意する。
export function ThemeProvider({
  children,
  motion,
  tokens,
}: {
  children: ReactNode;
  motion?: MotionPreference;
  tokens?: DesignTokens;
}) {
  return (
    <DesignThemeProvider theme="light" motion={motion} tokens={tokens}>
      {children}
    </DesignThemeProvider>
  );
}
