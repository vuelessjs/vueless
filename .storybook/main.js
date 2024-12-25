/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ["../src/**/*stories.@(js|jsx|ts|tsx)", "../src/**/docs.@(mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    // TODO: remove the condition when the dark mode will be implemented to the components.
    ...(process.env.NODE_ENV === "development" ? ["@storybook/addon-themes"] : []),
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
