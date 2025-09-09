/* eslint-disable no-console */

import path from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { styleText } from "node:util";
import { readFile, writeFile, rename, mkdir, readdir, copyFile } from "node:fs/promises";

import { getStorybookId } from "../utils/data.js";
import { getDirFiles } from "../../utils/node/helper.js";
import { replaceRelativeImports } from "../utils/format.js";
import { COMPONENTS, VUELESS_PACKAGE_DIR, VUELESS_USER_COMPONENTS_DIR } from "../../constants.js";

const BOILERPLATE_NAME = "UBoilerplate";
const BOILERPLATE_PATH = path.join(cwd(), VUELESS_PACKAGE_DIR, "ui.boilerplate");

export async function createVuelessComponent(options) {
  const [componentName] = options;

  if (!componentName) {
    console.log(styleText("red", "Component name is required."));

    return;
  }

  if (componentName in COMPONENTS) {
    console.log(
      styleText("red", `Component with name '${componentName}' already exists in Vueless UI.`),
    );

    return;
  }

  if (!componentName.startsWith("U")) {
    console.log(styleText("red", `Component should have 'U' prefix (ex. 'UButtonCustom').`));

    return;
  }

  const absoluteDestPath = path.join(cwd(), VUELESS_USER_COMPONENTS_DIR, componentName);

  if (existsSync(absoluteDestPath)) {
    console.log(styleText("red", `Component with name '${componentName}' already exists.`));

    return;
  }

  await copyAndRenameFiles(BOILERPLATE_PATH, absoluteDestPath);
  await modifyCreatedComponent(componentName, absoluteDestPath);

  console.log(
    // eslint-disable-next-line vue/max-len, prettier/prettier
    styleText("green", `The '${componentName}' was successfully created in the '${VUELESS_USER_COMPONENTS_DIR}/${componentName}' directory.`,),
  );
}

async function copyAndRenameFiles(srcDir, destDir) {
  await mkdir(destDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    entry.isDirectory()
      ? await copyAndRenameFiles(srcPath, destPath)
      : await copyFile(srcPath, destPath);
  }
}

async function modifyCreatedComponent(componentName, destPath) {
  const destFiles = await getDirFiles(destPath, "");
  const storybookId = await getStorybookId();

  for await (const filePath of destFiles) {
    const fileContent = await readFile(filePath, "utf-8");
    let updatedContent = replaceRelativeImports(componentName, filePath, fileContent);

    /* Renaming component name in constants */
    if (filePath.endsWith("constants.ts")) {
      updatedContent = updatedContent.replaceAll(BOILERPLATE_NAME, componentName);
    }

    /* Renaming component name in tests */
    if (filePath.endsWith("test.ts")) {
      updatedContent = updatedContent.replaceAll(BOILERPLATE_NAME, componentName);
    }

    /* Renaming component name in types */
    if (filePath.endsWith("types.ts")) {
      updatedContent = updatedContent.replaceAll(BOILERPLATE_NAME, componentName);
    }

    /* Renaming component name in components */
    if (filePath.endsWith(".vue")) {
      let lines = updatedContent.split("\n");

      for (const [index, line] of lines.entries()) {
        // Add some condition here in future if some edge cases appear
        if (line.includes(componentName)) {
          lines[index] = line.replaceAll(BOILERPLATE_NAME, componentName);
        }
      }

      updatedContent = lines.join("\n");
    }

    /* Renaming component name in stories */
    if (filePath.endsWith("stories.ts")) {
      updatedContent = updatedContent
        .replaceAll(BOILERPLATE_NAME, componentName)
        .replace("{{component_id}}", String(storybookId));
    }

    /* Renaming file */
    let targetPath = filePath;
    const [fileName] = filePath.split("/").reverse();

    if (fileName.includes(BOILERPLATE_NAME)) {
      const [targetDir] = filePath.split(fileName);
      const targetFileName = fileName.replace(BOILERPLATE_NAME, componentName);

      targetPath = path.join(targetDir, targetFileName);

      await rename(filePath, targetPath);
    }

    /* Update file */
    await writeFile(targetPath, updatedContent);
  }
}
