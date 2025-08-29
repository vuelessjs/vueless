/** @type { import('@storybook/vue3-vite').StorybookConfig } */
import { defineConfigWithVueless } from "@vueless/storybook";

export default defineConfigWithVueless({
  vuelessEnv: "internal",
  stories: [
    /* Define a path to your own component stories. */
    // "../src/**/stories.{js,jsx,ts,tsx}",
    // "../src/**/docs.mdx",
  ],
});
