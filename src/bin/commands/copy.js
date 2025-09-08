/* eslint-disable no-console */

import path from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { styleText } from "node:util";
import { cp, readFile, writeFile, rename } from "node:fs/promises";

import { getDirFiles } from "../../utils/node/helper.js";
import { replaceRelativeImports } from "../utils/format.js";
import { getStorybookId, getStoryMetaKeyIndex } from "../utils/data.js";
import { COMPONENTS, VUELESS_PACKAGE_DIR, VUELESS_USER_COMPONENTS_DIR } from "../../constants.js";

/**
 * Copies an existing Vueless component to a new location with a new name.
 * This includes duplicating the source files and updating the component's internal references as needed.
 *
 * @param {Array<string>} options - An array containing two elements:
 * – The name of the component to be copied.
 * – The desired name for the copied component.
 * @return {Promise<void>} A promise that resolves when the component has been successfully copied.
 * If an error occurs, no value is returned, and the operation exits early with a logged message.
 */
export async function copyVuelessComponent(options) {
  const [componentName, newComponentName] = options;

  if (!componentName) {
    console.log(styleText("red", "Component name is required."));

    return;
  }

  if (!(componentName in COMPONENTS)) {
    console.log(styleText("red", "There is no such component."));

    return;
  }

  if (newComponentName in COMPONENTS) {
    console.log(
      styleText("red", `Component with name '${newComponentName}' already exists in Vueless UI.`),
    );

    return;
  }

  const absoluteSourcePath = path.join(cwd(), VUELESS_PACKAGE_DIR, COMPONENTS[componentName]);
  const absoluteDestPath = path.join(cwd(), VUELESS_USER_COMPONENTS_DIR, newComponentName);

  if (existsSync(absoluteDestPath)) {
    console.log(styleText("red", `Component with name '${newComponentName}' already exists.`));

    return;
  }

  await cp(absoluteSourcePath, absoluteDestPath, { recursive: true });
  await modifyCreatedComponent(absoluteDestPath, componentName, newComponentName);

  console.log(
    // eslint-disable-next-line vue/max-len, prettier/prettier
    styleText("green", `The '${componentName}' was successfully copied into the '${VUELESS_USER_COMPONENTS_DIR}/${newComponentName}' directory.`)
  );
}

/**
 * Modifies the files related to a specified component by renaming the component and updating its references
 * across various files in the specified directory.
 *
 * @param {string} destPath - The destination path where the component and its related files are located.
 * @param {string} componentName - The current name of the component to be modified.
 * @param {string} newComponentName - The new name to assign to the component and its references.
 * @return {Promise<void>} A promise that resolves when the modification process is completed.
 */
async function modifyCreatedComponent(destPath, componentName, newComponentName) {
  const destFiles = await getDirFiles(destPath, "");
  const storybookId = await getStorybookId();

  for await (const filePath of destFiles) {
    const fileContent = await readFile(filePath, "utf-8");

    let updatedContent = replaceRelativeImports(newComponentName, filePath, fileContent);

    if (filePath.endsWith("constants.ts")) {
      updatedContent = updatedContent.replace(componentName, newComponentName);
    }

    if (filePath.endsWith("test.ts")) {
      updatedContent = updatedContent.replaceAll(componentName, newComponentName);
    }

    if (filePath.endsWith("stories.ts")) {
      let storyLines = updatedContent.split("\n");
      const storyComponentImportIndex = storyLines.findIndex(
        (line) => line.includes(componentName) && line.includes("import"),
      );

      const storyIdIndex = getStoryMetaKeyIndex(fileContent, "id");
      const storyTitleIndex = getStoryMetaKeyIndex(fileContent, "title");

      updatedContent = storyLines.join("\n").replaceAll(componentName, newComponentName);
      storyLines = updatedContent.split("\n");

      storyLines[storyIdIndex] = `  id: "${storybookId}",`;
      storyLines[storyTitleIndex] = `  title: "Custom / ${newComponentName}",`;
      storyLines[storyComponentImportIndex] =
        `import ${newComponentName} from "../${newComponentName}.vue";`;

      updatedContent = storyLines.join("\n");
    }

    let targetPath = filePath;
    const [fileName] = filePath.split("/").reverse();

    if (fileName.includes(componentName)) {
      const [targetDir] = filePath.split(fileName);
      const targetFileName = fileName.replace(componentName, newComponentName);

      targetPath = path.join(targetDir, targetFileName);

      await rename(filePath, targetPath);
    }

    await writeFile(targetPath, updatedContent);
  }
}
