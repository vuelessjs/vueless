import path from "node:path";
import { existsSync } from "node:fs";
import { rename, readdir } from "node:fs/promises";

import { vuelessConfig } from "./vuelessConfig.js";
import { COMPONENTS, VUELESS_DIR, VUELESS_LOCAL_DIR } from "../../constants.js";

async function hideComponentStories(storybookPath) {
  if (existsSync(storybookPath)) {
    const storyFiles = await readdir(storybookPath);
    const visibleFiles = storyFiles.filter((storybookFile) => !storybookFile.includes("hidden"));

    await Promise.all(
      visibleFiles.map((storybookFile) => {
        const [fileName, extension] = storybookFile.split(".");

        return rename(
          path.join(storybookPath, storybookFile),
          path.join(storybookPath, `${fileName}_hidden.${extension}`),
        );
      }),
    );
  }
}

async function showComponentStories(storybookPath) {
  if (existsSync(storybookPath)) {
    const storyFiles = await readdir(storybookPath);
    const hiddenFiles = storyFiles.filter((storybookFile) => storybookFile.includes("hidden"));

    await Promise.all(
      hiddenFiles.map((storybookFile) => {
        const [fileName, extension] = storybookFile.split(".");
        const [originalFileName] = fileName.split("_");

        return rename(
          path.join(storybookPath, storybookFile),
          path.join(storybookPath, `${originalFileName}.${extension}`),
        );
      }),
    );
  }
}

export async function hideHiddenStories(isVuelessEnv) {
  const srcDir = isVuelessEnv ? VUELESS_LOCAL_DIR : VUELESS_DIR;

  for await (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    const componentGlobalConfig = vuelessConfig.component[componentName];
    const isHiddenStories = componentGlobalConfig && componentGlobalConfig.storybook === false;

    if (isHiddenStories) {
      await hideComponentStories(path.join(process.cwd(), srcDir, componentDir, "storybook"));
    }
  }
}

export async function showHiddenStories(isVuelessEnv) {
  const srcDir = isVuelessEnv ? VUELESS_LOCAL_DIR : VUELESS_DIR;

  for await (const componentDir of Object.values(COMPONENTS)) {
    await showComponentStories(path.join(process.cwd(), srcDir, componentDir, "storybook"));
  }
}
