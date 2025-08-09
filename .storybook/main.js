/* eslint-disable storybook/no-uninstalled-addons */
/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ["../src/**/storybook/stories.{js,jsx,ts,tsx}", "../src/**/storybook/docs.mdx"],
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
};
