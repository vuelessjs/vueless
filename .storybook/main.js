/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)", "../src/**/*.@(mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  env: (config) => ({
    ...config,
    BASE_URL: "/",
  }),
  // TODO: test for performance improvement: prevent loading stories on hovering items in the main menu.
  managerHead: (head) => `
    ${head}
    <script>
      window.document.addEventListener('mouseout', function(ev) {
        ev.stopImmediatePropagation();
      }, true);
    </script>
  `,
};
