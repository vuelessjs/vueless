/* eslint-disable no-console */

import { existsSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { cp, readFile, writeFile, rename } from "node:fs/promises";
import { styleText } from "node:util";

import { getDirFiles } from "../../utils/node/helper.js";
import { replaceRelativeImports } from "../utils/formatUtil.js";
import { getStorybookId } from "../utils/dataUtils.js";

import { SRC_COMPONENTS_PATH, COMPONENTS_PATH } from "../constants.js";

import { COMPONENTS, VUELESS_DIR, VUELESS_LOCAL_DIR } from "../../constants.js";

const boilerplateName = "UBoilerplate";
const boilerplatePath = path.join(cwd(), VUELESS_DIR, "ui.boilerplate");

export async function createVuelessComponent(options) {
  const [componentName] = options;

  if (!componentName) {
    throw new Error("Component name is required.");
  }

  const isSrcDir = existsSync(path.join(cwd(), VUELESS_LOCAL_DIR));
  const destPath = isSrcDir
    ? path.join(SRC_COMPONENTS_PATH, componentName)
    : path.join(COMPONENTS_PATH, componentName);
  const absoluteDestPath = path.join(cwd(), destPath);

  const isComponentExists = componentName in COMPONENTS || existsSync(absoluteDestPath);

  if (isComponentExists) {
    throw new Error(`Component with name ${componentName} already exists.`);
  }

  await cp(boilerplatePath, absoluteDestPath, { recursive: true });
  await modifyCreatedComponent(absoluteDestPath, componentName);

  const successMessage = styleText(
    "green",
    `The '${componentName}' was successfully created in the '${destPath}' directory.`,
  );

  console.log(successMessage);
}

async function modifyCreatedComponent(destPath, componentName) {
  const destFiles = await getDirFiles(destPath, "");
  const storybookId = await getStorybookId();

  for await (const filePath of destFiles) {
    const fileContent = await readFile(filePath, "utf-8");

    let updatedContent = replaceRelativeImports(componentName, filePath, fileContent);
    let targetPath = filePath;

    if (filePath.endsWith("constants.ts")) {
      updatedContent = updatedContent.replace(boilerplateName, componentName);
    }

    if (filePath.endsWith("stories.ts")) {
      updatedContent = updatedContent
        .replaceAll(boilerplateName, componentName)
        .replace("{{component_id}}", String(storybookId));
    }

    if (targetPath.endsWith(`${boilerplateName}.vue`)) {
      targetPath = targetPath.replace(boilerplateName, componentName);

      await rename(filePath, targetPath);
    }

    await writeFile(targetPath, updatedContent);
  }
}
