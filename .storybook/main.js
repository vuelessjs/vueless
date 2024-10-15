/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ["../src/**/*stories.@(js|jsx|ts|tsx)", "../src/**/*.@(mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    // "@storybook/addon-themes", // TODO: uncomment when dark mode will be implemented to the components.
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      builder: {
        viteConfigPath: ".storybook/vite.config.js",
      },
    },
  },
  docs: {
    autodocs: true,
  },
  env: (config) => ({
    ...config,
    BASE_URL: "/",
  }),
};
