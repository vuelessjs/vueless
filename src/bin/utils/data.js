import { existsSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import { readFile } from "node:fs/promises";

import { getDirFiles } from "../../utils/node/helper.js";

import { VUELESS_PACKAGE_DIR, VUELESS_USER_COMPONENTS_DIR } from "../../constants.js";

const storiesName = "stories.ts";

/**
 * Retrieves the next available Storybook ID by scanning story files for the highest existing ID and incrementing it.
 *
 * @return {Promise<number>} A promise that resolves to the next available Storybook ID.
 */
export async function getStorybookId() {
  const vuelessPackagePath = path.join(cwd(), VUELESS_PACKAGE_DIR);
  const vuelessUserComponentsPath = path.join(cwd(), VUELESS_USER_COMPONENTS_DIR);

  const stories = await getDirFiles(vuelessPackagePath, storiesName);
  const hasVuelessUserComponentsDir = existsSync(vuelessUserComponentsPath);

  if (hasVuelessUserComponentsDir) {
    const customStories = await getDirFiles(vuelessUserComponentsPath, storiesName);

    stories.push(...customStories);
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

/**
 * Retrieves the line index within a file content where a specific key appears
 * as a top-level property in an exported default object.
 *
 * @param {string} fileContent - The content of the file to search through.
 * @param {string} key - The key to locate within the top-level export block.
 * @return {number} The zero-based index of the line where the key is found, or -1 if the key is not found.
 */
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
