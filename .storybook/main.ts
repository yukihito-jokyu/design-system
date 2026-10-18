import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const config = {
  framework: "@storybook/react-vite",
  stories: [
    "../registry/new-york/patterns/**/*.stories.tsx",
    "../registry/cobalt/ui/**/*.stories.tsx",
    "../registry/cobalt/character/**/*.stories.tsx",
    "../registry/cobalt/icons/**/*.stories.tsx",
    "../registry/cobalt/patterns/**/*.stories.tsx",
  ],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: { alias: { "@": process.cwd() } },
      publicDir: false,
    });
  },
} satisfies StorybookConfig;

export default config;
