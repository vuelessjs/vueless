/** @type { import('@storybook/vue3-vite').StorybookConfig } */
import { INTERNAL_ENV } from "../src/constants.js";
import { defineConfigWithVueless } from "../src/utils/node/storybook";

export default defineConfigWithVueless({
  vuelessEnv: INTERNAL_ENV,
  stories: [
    /* Define a path to your own component stories. */
    // "../src/**/stories.{js,jsx,ts,tsx}",
    // "../src/**/docs.mdx",
  ],
});
