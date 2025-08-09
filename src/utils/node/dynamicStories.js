import path from "node:path";
import { cwd } from "node:process";
import { existsSync, promises as fsPromises } from "node:fs";

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
    const storybookPath = path.join(cwd(), srcDir, componentDir, STORYBOOK_DIR);

    if (isHiddenStoriesByComponent || isHiddenStoriesByKey) {
      await cacheComponentStories(storybookPath);
      await hideComponentStories(storybookPath);
    }
  }
}

/**
 * Show stories for components which was previously hidden by `storybook: false`.
 * @param srcDir
 * @return {Promise<void>}
 */
export async function showHiddenStories(srcDir) {
  for await (const componentDir of Object.values(COMPONENTS)) {
    const storybookPath = path.join(cwd(), srcDir, componentDir, STORYBOOK_DIR);

    await showComponentStories(storybookPath);
    await clearComponentStoriesCache(storybookPath);
  }
}

/**
 * Cache the storybook directory.
 * @param storybookPath
 * @return {Promise<void>}
 */
async function cacheComponentStories(storybookPath) {
  const parentDir = path.dirname(storybookPath);
  const cacheDir = path.join(parentDir, CACHE_DIR);
  const cacheStorybookDir = path.join(cacheDir, STORYBOOK_DIR);

  if (existsSync(cacheStorybookDir)) {
    return;
  }

  if (existsSync(storybookPath)) {
    await fsPromises.mkdir(cacheDir, { recursive: true });
    await fsPromises.cp(storybookPath, cacheStorybookDir, { recursive: true });
  }
}

/**
 * Clear the cached storybook directory.
 * @param storybookPath
 * @return {Promise<void>}
 */
async function clearComponentStoriesCache(storybookPath) {
  const parentDir = path.dirname(storybookPath);
  const cacheDir = path.join(parentDir, CACHE_DIR);

  if (existsSync(cacheDir)) {
    await fsPromises.rm(cacheDir, { recursive: true, force: true });
  }
}

/**
 * Remove all files from the storybook directory to hide them.
 * @param storybookPath
 * @return {Promise<void>}
 */
async function hideComponentStories(storybookPath) {
  if (existsSync(storybookPath)) {
    await fsPromises.rm(storybookPath, { recursive: true, force: true });
  }
}

/**
 * Copy all files from cache back to storybook directory.
 * @param storybookPath
 * @return {Promise<void>}
 */
async function showComponentStories(storybookPath) {
  const parentDir = path.dirname(storybookPath);
  const cacheStorybookDir = path.join(parentDir, CACHE_DIR, STORYBOOK_DIR);

  if (!existsSync(cacheStorybookDir)) {
    return;
  }

  try {
    await hideComponentStories();

    await fsPromises.mkdir(path.dirname(storybookPath), { recursive: true });
    await fsPromises.cp(cacheStorybookDir, storybookPath, { recursive: true });
  } catch (error) {
    // If copy fails, try copying individual files
    if (error.code === "EEXIST" || error.code === "ENOENT") {
      await copyStorybookFiles(cacheStorybookDir, storybookPath);
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
