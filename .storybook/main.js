import { resolve } from "node:path";

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ["../src/**/stories.{js,jsx,ts,tsx}", "../src/**/docs.mdx"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    resolve(__dirname, "./addons/storybook-dark-mode/preset/manager.tsx"),
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.js",
      },
    },
  },
  env: (config) => ({
    ...config,
    BASE_URL: "/",
  }),
};
