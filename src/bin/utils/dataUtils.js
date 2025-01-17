import { existsSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import { readFile } from "node:fs/promises";

import { getDirFiles } from "../../utils/node/helper.js";

import { SRC_COMPONENTS_PATH, COMPONENTS_PATH } from "../constants.js";
import { VUELESS_DIR } from "../../constants.js";

const storiesName = "stories.ts";

export async function getLastStorybookId() {
  const srcComponentsDir = path.join(cwd(), SRC_COMPONENTS_PATH);
  const componentsDir = path.join(cwd(), COMPONENTS_PATH);
  const vuelessPackagePath = path.join(cwd(), VUELESS_DIR);
  const isSrcComponentsDir = existsSync(srcComponentsDir);
  const isComponentsDir = existsSync(componentsDir);

  const stories = await getDirFiles(vuelessPackagePath, storiesName);

  if (isSrcComponentsDir) {
    const srcComponentsDirStories = await getDirFiles(srcComponentsDir, storiesName);

    stories.push(...srcComponentsDirStories);
  }

  if (isComponentsDir) {
    const componentsDirStories = await getDirFiles(componentsDir, storiesName);

    stories.push(...componentsDirStories);
  }

  let id = 0;

  for await (const storyPath of stories) {
    const storyContent = await readFile(storyPath, "utf-8");

    const storyIdLine = storyContent.split("\n").find((line, idx, array) => {
      return line.includes("id:") && idx && array[idx - 1].includes("export default");
    });

    if (!storyIdLine) continue;

    const currentId = parseInt(storyIdLine.split(" ").at(-1).replaceAll('"', ""));

    if (currentId > id && !Number.isNaN(currentId)) {
      id = currentId;
    }
  }

  return id;
}
