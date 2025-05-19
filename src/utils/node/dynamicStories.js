import path from "node:path";
import { cwd } from "node:process";
import { existsSync, promises as fsPromises } from "node:fs";

import { vuelessConfig } from "./vuelessConfig.js";
import { COMPONENTS, VUELESS_PACKAGE_DIR, VUELESS_LOCAL_DIR } from "../../constants.js";

const STORYBOOK_DIR = "storybook";

export async function hideHiddenStories(isInternalEnv) {
  const srcDir = isInternalEnv ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;

  for await (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    const componentGlobalConfig = vuelessConfig.components?.[componentName];
    const isHiddenStories = componentGlobalConfig && componentGlobalConfig.storybook === false;

    if (isHiddenStories) {
      await hideComponentStories(path.join(cwd(), srcDir, componentDir, STORYBOOK_DIR));
    }
  }
}

export async function showHiddenStories(isInternalEnv) {
  const srcDir = isInternalEnv ? VUELESS_LOCAL_DIR : VUELESS_PACKAGE_DIR;

  for await (const componentDir of Object.values(COMPONENTS)) {
    await showComponentStories(path.join(cwd(), srcDir, componentDir, STORYBOOK_DIR));
  }
}

async function hideComponentStories(storybookPath) {
  if (existsSync(storybookPath)) {
    const storyFiles = await fsPromises.readdir(storybookPath);
    const visibleFiles = storyFiles.filter((storybookFile) => !storybookFile.includes("hidden"));

    await Promise.all(
      visibleFiles.map((storybookFile) => {
        const [fileName, extension] = storybookFile.split(".");

        return fsPromises.rename(
          path.join(storybookPath, storybookFile),
          path.join(storybookPath, `${fileName}_hidden.${extension}`),
        );
      }),
    );
  }
}

async function showComponentStories(storybookPath) {
  if (existsSync(storybookPath)) {
    const storyFiles = await fsPromises.readdir(storybookPath);
    const hiddenFiles = storyFiles.filter((storybookFile) => storybookFile.includes("hidden"));

    await Promise.all(
      hiddenFiles.map((storybookFile) => {
        const [fileName, extension] = storybookFile.split(".");
        const [originalFileName] = fileName.split("_");

        return fsPromises.rename(
          path.join(storybookPath, storybookFile),
          path.join(storybookPath, `${originalFileName}.${extension}`),
        );
      }),
    );
  }
}
