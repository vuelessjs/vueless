/** @type { import('@storybook/vue3-vite').StorybookConfig } */
import { INTERNAL_ENV } from "../src/constants.js";
import { defineConfigWithVueless } from "../src/utils/node/storybook.js";

export default defineConfigWithVueless({
  vuelessEnv: INTERNAL_ENV,
  stories: [
    // "../src/**/storybook/stories.{js,jsx,ts,tsx}",
    // "../src/**/storybook/docs.mdx",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@vueless/storybook-dark-mode",
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
});
