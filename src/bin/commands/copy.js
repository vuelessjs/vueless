/* eslint-disable no-console */

import { existsSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { cp, readFile, writeFile, rename } from "node:fs/promises";
import { styleText } from "node:util";

import { getDirFiles } from "../../utils/node/helper.js";
import { replaceRelativeImports } from "../utils/formatUtil.js";
import { getStorybookId, getStoryMetaKeyIndex } from "../utils/dataUtils.js";

import { SRC_COMPONENTS_PATH, COMPONENTS_PATH } from "../constants.js";
import { COMPONENTS, VUELESS_DIR, VUELESS_LOCAL_DIR } from "../../constants.js";

function getSourcePath(componentName) {
  return path.join(cwd(), VUELESS_DIR, COMPONENTS[componentName]);
}

export async function copyVuelessComponent(options) {
  const [componentName, newComponentName] = options;

  if (!componentName) {
    throw new Error("Component name is required.");
  }

  if (!(componentName in COMPONENTS)) {
    throw new Error("There is no such component.");
  }

  const sourceComponentPath = getSourcePath(componentName);

  const isSrcDir = existsSync(path.join(cwd(), VUELESS_LOCAL_DIR));
  const destPath = isSrcDir
    ? path.join(SRC_COMPONENTS_PATH, newComponentName)
    : path.join(COMPONENTS_PATH, newComponentName);
  const absoluteDestPath = path.join(cwd(), destPath);

  const isComponentExists = newComponentName in COMPONENTS || existsSync(absoluteDestPath);

  if (isComponentExists) {
    throw new Error(`Component with name ${newComponentName} already exists.`);
  }

  await cp(sourceComponentPath, absoluteDestPath, { recursive: true });
  await modifyCreatedComponent(absoluteDestPath, componentName, newComponentName);

  const successMessage = styleText(
    "green",
    `The '${componentName}' was successfully copied into the '${destPath}' directory.`,
  );

  console.log(successMessage);
}

async function modifyCreatedComponent(destPath, componentName, newComponentName) {
  const destFiles = await getDirFiles(destPath, "");
  const storybookId = await getStorybookId();

  const componentFileName = `${componentName}.vue`;
  const newComponentFileName = `${newComponentName}.vue`;

  for await (const filePath of destFiles) {
    const fileContent = await readFile(filePath, "utf-8");

    let updatedContent = replaceRelativeImports(newComponentName, filePath, fileContent);
    let targetPath = filePath;

    if (filePath.endsWith("constants.ts")) {
      updatedContent = updatedContent.replace(componentName, newComponentName);
    }

    if (filePath.endsWith("stories.ts")) {
      const storyLines = updatedContent.split("\n");

      const storyComponentImportIndex = storyLines.findIndex(
        (line) => line.includes(componentName) && line.includes("import"),
      );
      const storyIdIndex = getStoryMetaKeyIndex(fileContent, "id");
      const storyTitleIndex = getStoryMetaKeyIndex(fileContent, "title");

      storyLines[storyIdIndex] = `  id: "${storybookId}",`;
      storyLines[storyTitleIndex] = `  title: "Custom / ${newComponentName}",`;
      storyLines[storyComponentImportIndex] =
        `import ${newComponentName} from "../${newComponentFileName}"`;

      updatedContent = storyLines.join("\n").replaceAll(componentName, newComponentName);
    }

    if (targetPath.endsWith(componentFileName)) {
      targetPath = targetPath.replace(componentFileName, newComponentFileName);

      await rename(filePath, targetPath);
    }

    await writeFile(targetPath, updatedContent);
  }
}
