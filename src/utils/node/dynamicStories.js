import path from "node:path";
import { cwd } from "node:process";
import { existsSync, promises as fsPromises } from "node:fs";

import { removeFolderIfEmpty } from "./helper.js";
import { vuelessConfig } from "./vuelessConfig.js";
import { CACHE_DIR, COMPONENTS } from "../../constants.js";

const STORYBOOK_DIR = "storybook";

/**
 * Hide stories for components that have `storybook: false` in their config.
 * @param srcDir
 * @return {Promise<void>}
 */
export async function hideHiddenStories(srcDir) {
  for await (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    const componentGlobalConfig = vuelessConfig.components?.[componentName];
    const isHiddenStoriesByComponent = componentGlobalConfig === false;
    const isHiddenStoriesByKey = componentGlobalConfig?.storybook === false;
    const componentPath = path.join(cwd(), srcDir, componentDir);

    if (isHiddenStoriesByComponent || isHiddenStoriesByKey) {
      await cacheComponentStories(componentPath);
      await hideComponentStories(componentPath);
    }
  }
}

/**
 * Show stories for components which was previously hidden by `storybook: false`.
 * @param srcDir
 * @return {Promise<void>}
 */
export async function showHiddenStories(srcDir) {
  for (const componentDir of Object.values(COMPONENTS)) {
    const componentPath = path.join(cwd(), srcDir, componentDir);

    await showComponentStories(componentPath);
    await clearComponentStoriesCache(componentPath);
  }
}

/**
 * Cache the storybook directory.
 * @return {Promise<void>}
 * @param componentPath
 */
async function cacheComponentStories(componentPath) {
  const storybookDir = path.join(componentPath, STORYBOOK_DIR);
  const cacheStorybookDir = path.join(componentPath, CACHE_DIR, STORYBOOK_DIR);

  if (existsSync(cacheStorybookDir) || !existsSync(storybookDir)) {
    return;
  }

  if (!existsSync(cacheStorybookDir)) {
    await fsPromises.mkdir(cacheStorybookDir, { recursive: true });
  }

  await fsPromises.cp(storybookDir, cacheStorybookDir, { recursive: true });
}

/**
 * Clear the cached storybook directory.
 * @return {Promise<void>}
 * @param componentPath
 */
async function clearComponentStoriesCache(componentPath) {
  const cacheDir = path.join(componentPath, CACHE_DIR, STORYBOOK_DIR);

  if (existsSync(cacheDir)) {
    await fsPromises.rm(cacheDir, { recursive: true, force: true });
  }

  await removeFolderIfEmpty(cacheDir);
}

/**
 * Remove all files from the storybook directory to hide them.
 * @return {Promise<void>}
 * @param componentPath
 */
async function hideComponentStories(componentPath) {
  const storybookDir = path.join(componentPath, STORYBOOK_DIR);

  if (existsSync(storybookDir)) {
    await fsPromises.rm(storybookDir, { recursive: true, force: true });
  }
}

/**
 * Copy all files from cache back to storybook directory.
 * @return {Promise<void>}
 * @param componentPath
 */
async function showComponentStories(componentPath) {
  const storybookDir = path.join(componentPath, STORYBOOK_DIR);
  const cacheStorybookDir = path.join(componentPath, CACHE_DIR, STORYBOOK_DIR);

  if (!existsSync(cacheStorybookDir)) {
    return;
  }

  try {
    await fsPromises.mkdir(path.dirname(storybookDir), { recursive: true });
    await fsPromises.cp(cacheStorybookDir, storybookDir, { recursive: true });
  } catch (error) {
    // If copy fails, try copying individual files
    if (error.code === "EEXIST" || error.code === "ENOENT") {
      await copyStorybookFiles(cacheStorybookDir, storybookDir);
    } else {
      throw error;
    }
  }
}

/**
 * Copy all files from cache back to storybook directory.
 * @param sourceDir
 * @param targetDir
 * @return {Promise<void>}
 */
async function copyStorybookFiles(sourceDir, targetDir) {
  try {
    await fsPromises.mkdir(targetDir, { recursive: true });

    const files = await fsPromises.readdir(sourceDir, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const targetPath = path.join(targetDir, file.name);

      file.isDirectory()
        ? await copyStorybookFiles(sourcePath, targetPath)
        : await fsPromises.copyFile(sourcePath, targetPath);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
}
