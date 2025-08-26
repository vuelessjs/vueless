import { getVuelessConfig } from "./vuelessConfig.js";
import {
  COMPONENTS,
  DIRECTIVES,
  INTERNAL_ENV,
  VUELESS_LOCAL_DIR,
  VUELESS_PACKAGE_DIR,
} from "../../constants.js";

/**
 * Defines the config for Storybook.
 *
 * @param {Object} config - The config object.
 * @return {Promise<Object>} A promise that resolves to the modified config object.
 */
export function defineConfigWithVueless(config) {
  return (async () => ({
    ...config,
    stories: [...config.stories, ...(await getVuelessStoriesGlob(config?.vuelessEnv))],
    addons: [
      ...new Set([
        ...(config.addons || []),
        "@storybook/addon-docs",
        "@storybook/addon-links",
        "@vueless/storybook-dark-mode",
        "@storybook/addon-themes",
      ]),
    ],
    staticDirs: ["public"],
    framework: {
      ...config.framework,
      name: "@storybook/vue3-vite",
      options: {
        ...config.framework?.options,
        builder: {
          ...config.framework?.options?.builder,
          viteConfigPath: ".storybook/vite.config.js",
        },
      },
    },
    env: (envConfig) => ({
      ...envConfig,
      BASE_URL: "/",
    }),
  }))();
}

/**
 * Retrieves the glob pattern for Vueless stories based on the provided Vueless environment.
 *
 * @param {string} vuelessEnv - The Vueless environment.
 * @return {Promise<string[]>} A promise that resolves to an array of glob patterns for Vueless stories.
 */
async function getVuelessStoriesGlob(vuelessEnv) {
  const vuelessSrcDir = vuelessEnv === INTERNAL_ENV ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;
  const vuelessConfig = await getVuelessConfig();
  const storiesGlob = [];

  for (const [directiveName, directiveDir] of Object.entries(DIRECTIVES)) {
    const directiveGlobalConfig = vuelessConfig.directives?.[directiveName];
    const isHiddenStoriesByDirective = directiveGlobalConfig === false;
    const isHiddenStoriesByKey = directiveGlobalConfig?.storybook === false;

    if (isHiddenStoriesByDirective || isHiddenStoriesByKey) {
      continue;
    }

    storiesGlob.push(`../${vuelessSrcDir}/${directiveDir}/storybook/stories.{js,ts}`);
    storiesGlob.push(`../${vuelessSrcDir}/${directiveDir}/storybook/docs.mdx`);
  }

  for (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    const componentGlobalConfig = vuelessConfig.components?.[componentName];
    const isHiddenStoriesByComponent = componentGlobalConfig === false;
    const isHiddenStoriesByKey = componentGlobalConfig?.storybook === false;

    if (isHiddenStoriesByComponent || isHiddenStoriesByKey) {
      continue;
    }

    storiesGlob.push(`../${vuelessSrcDir}/${componentDir}/storybook/stories.{js,ts}`);
    storiesGlob.push(`../${vuelessSrcDir}/${componentDir}/storybook/docs.mdx`);
  }

  return storiesGlob;
}
