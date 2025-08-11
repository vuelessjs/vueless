import { getVuelessConfig } from "./vuelessConfig.js";
import {
  COMPONENTS,
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
  }))();
}

/**
 * Retrieves the glob pattern for Vueless stories based on the provided Vueless environment.
 *
 * @param {string} vuelessEnv - The Vueless environment.
 * @return {Promise<string[]>} A promise that resolves to an array of glob patterns for Vueless stories.
 */
export async function getVuelessStoriesGlob(vuelessEnv) {
  const vuelessSrcDir = vuelessEnv === INTERNAL_ENV ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;

  const storiesGlob = [
    `../${vuelessSrcDir}/directives/**/stories.{js,ts}`,
    `../${vuelessSrcDir}/directives/**/docs.mdx`,
  ];

  const vuelessConfig = await getVuelessConfig();

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
