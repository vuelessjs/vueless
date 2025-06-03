/* eslint-disable no-console */

import { existsSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { readFile, writeFile, rename, mkdir, readdir, copyFile } from "node:fs/promises";
import { styleText } from "node:util";

import { getDirFiles } from "../../utils/node/helper.js";
import { replaceRelativeImports } from "../utils/formatUtil.js";
import { getStorybookId } from "../utils/dataUtils.js";

import { SRC_COMPONENTS_PATH, COMPONENTS_PATH } from "../constants.js";

import { COMPONENTS, VUELESS_PACKAGE_DIR, VUELESS_LOCAL_DIR } from "../../constants.js";

const BOILERPLATE_NAME = "UBoilerplate";
const BOILERPLATE_PATH = path.join(cwd(), VUELESS_PACKAGE_DIR, "ui.boilerplate");

export async function createVuelessComponent(options) {
  const [componentName] = options;

  if (!componentName) {
    console.log(styleText("red", "Component name is required."));

    return;
  }

  const isSrcDir = existsSync(path.join(cwd(), VUELESS_LOCAL_DIR));
  const destPath = isSrcDir
    ? path.join(SRC_COMPONENTS_PATH, componentName)
    : path.join(COMPONENTS_PATH, componentName);
  const absoluteDestPath = path.join(cwd(), destPath);

  const isComponentExists = componentName in COMPONENTS || existsSync(absoluteDestPath);

  if (isComponentExists) {
    console.log(styleText("red", `Component with name ${componentName} already exists.`));

    return;
  }

  await copyAndRenameFiles(BOILERPLATE_PATH, absoluteDestPath);
  await modifyCreatedComponent(absoluteDestPath, componentName);

  console.log(
    // eslint-disable-next-line prettier/prettier
    styleText("green", `The '${componentName}' was successfully created in the '${destPath}' directory.`,),
  );
}

async function copyAndRenameFiles(srcDir, destDir) {
  await mkdir(destDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);

    const renamed = entry.name.replace(".hidden", "");
    const destPath = path.join(destDir, renamed);

    console.log(entry.name, renamed);

    entry.isDirectory()
      ? await copyAndRenameFiles(srcPath, destPath)
      : await copyFile(srcPath, destPath);
  }
}

async function modifyCreatedComponent(destPath, componentName) {
  const destFiles = await getDirFiles(destPath, "");
  const storybookId = await getStorybookId();

  for await (const filePath of destFiles) {
    const fileContent = await readFile(filePath, "utf-8");

    let updatedContent = replaceRelativeImports(componentName, filePath, fileContent);
    let targetPath = filePath;

    if (filePath.endsWith("constants.ts")) {
      updatedContent = updatedContent.replace(BOILERPLATE_NAME, componentName);
    }

    if (filePath.endsWith("stories.ts")) {
      updatedContent = updatedContent
        .replaceAll(BOILERPLATE_NAME, componentName)
        .replace("{{component_id}}", String(storybookId));
    }

    if (targetPath.endsWith(`${BOILERPLATE_NAME}.vue`)) {
      targetPath = targetPath.replace(BOILERPLATE_NAME, componentName);

      await rename(filePath, targetPath);
    }

    await writeFile(targetPath, updatedContent);
  }
}
