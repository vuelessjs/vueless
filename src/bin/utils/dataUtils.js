import { existsSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import { readFile } from "node:fs/promises";

import { getDirFiles } from "../../utils/node/helper.js";

import { SRC_COMPONENTS_PATH, COMPONENTS_PATH } from "../constants.js";
import { VUELESS_PACKAGE_DIR } from "../../constants.js";

const storiesName = "stories.ts";

export async function getStorybookId() {
  const srcComponentsDir = path.join(cwd(), SRC_COMPONENTS_PATH);
  const componentsDir = path.join(cwd(), COMPONENTS_PATH);
  const vuelessPackagePath = path.join(cwd(), VUELESS_PACKAGE_DIR);
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

  let id = 200000;

  for await (const storyPath of stories) {
    const storyContent = await readFile(storyPath, "utf-8");

    const storyIdLineIndex = getStoryMetaKeyIndex(storyContent, "id");
    const storyIdLine = storyContent.split("\n").at(storyIdLineIndex);

    if (!storyIdLine) continue;

    const currentId = parseInt(storyIdLine.split(" ").at(-1).replaceAll('"', ""));

    if (currentId > id && !Number.isNaN(currentId)) {
      id = currentId;
    }
  }

  return id + 10;
}

export function getStoryMetaKeyIndex(fileContent, key) {
  const lines = fileContent.split("\n");
  let insideExportBlock = false;
  let bracketDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("export default {")) {
      insideExportBlock = true;
      bracketDepth = 1;
      continue;
    }

    if (insideExportBlock) {
      bracketDepth += (line.match(/{/g) || []).length;
      bracketDepth -= (line.match(/}/g) || []).length;

      if (bracketDepth === 1 && line.startsWith(`${key}:`)) {
        return i;
      }

      if (bracketDepth === 0) {
        break;
      }
    }
  }

  return -1; // Return -1 if no top-level `id` is found
}
