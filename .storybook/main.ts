/** @type { import('@storybook/vue3-vite').StorybookConfig } */
import { defineConfigWithVueless } from "@vueless/storybook";

export default defineConfigWithVueless({
  vuelessEnv: "internal",
  stories: [
    /* Path to the project component stories. */
    // "../src/**/stories.ts",
    // "../src/**/docs.mdx",
    //
    /* Path to the custom vueless component stories. */
    // "../.vueless/components/**/stories.ts",
    // "../.vueless/components/**/docs.mdx",
  ],
});
