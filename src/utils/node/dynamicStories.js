import path from "node:path";
import { existsSync } from "node:fs";
import { rename, readdir } from "node:fs/promises";

import { vuelessConfig } from "./vuelessConfig.js";
import { COMPONENTS, VUELESS_DIR, VUELESS_LOCAL_DIR } from "../../constants.js";

const VUELESS_SRC = path.join(VUELESS_DIR, VUELESS_LOCAL_DIR);

async function hideStory(storybookPath) {
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

async function showHiddenStory(storybookPath) {
  if (existsSync(storybookPath)) {
    const storyFiles = await readdir(storybookPath);
    const hiddenFiles = storyFiles.filter((storybookFile) => storybookFile.includes("hidden"));

    await Promise.all(
      hiddenFiles.map((storybookFile) => {
        const [fileName, extension] = storybookFile.split(".");
        const originalFileName = fileName.split("_").at(0);

        return rename(
          path.join(storybookPath, storybookFile),
          path.join(storybookPath, `${originalFileName}.${extension}`),
        );
      }),
    );
  }
}

export async function hideStories(isVuelessEnv) {
  const srcDir = isVuelessEnv ? VUELESS_LOCAL_DIR : VUELESS_SRC;

  for await (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    const isStorybookHidden =
      componentName in vuelessConfig.component &&
      vuelessConfig.component[componentName].storybook === false;

    if (isStorybookHidden) {
      await hideStory(path.join(srcDir, componentDir, "storybook"));
    }
  }
}

export async function showHiddenStories(isVuelessEnv) {
  const srcDir = isVuelessEnv ? VUELESS_LOCAL_DIR : VUELESS_SRC;

  for await (const componentDir of Object.values(COMPONENTS)) {
    await showHiddenStory(path.join(srcDir, componentDir, "storybook"));
  }
}
