import { existsSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { cp, readFile, writeFile, rm } from "node:fs/promises";
import crypto from "node:crypto";

import { getDirFiles } from "../../utils/node/helper.js";
import { replaceRelativeImports } from "../utils/formatUtil.js";

import { COMPONENTS } from "../../constants.js";

const srcComponentsPath = "/src/components";
const componentsPath = "/components";
const srcPath = "/src";
const boilerplateName = "UBoilerplate";

const boilerplatePath = path.join(
  "/",
  ...process.argv[1].split(path.sep).slice(0, -2),
  "vueless/ui.boilerplate",
);

export async function createVuelessComponent(options) {
  const [componentName] = options;

  if (!componentName) {
    throw new Error("Component name is required");
  }

  const isSrcDir = existsSync(path.join(cwd(), srcPath));
  const destPath = isSrcDir
    ? path.join(cwd(), srcComponentsPath, componentName)
    : path.join(cwd(), componentsPath, componentName);

  const isComponentExists = componentName in COMPONENTS || existsSync(destPath);

  if (isComponentExists) {
    throw new Error(`Component with name ${componentName} alrady exists`);
  }

  await cp(boilerplatePath, destPath, { recursive: true });

  const destFiles = await getDirFiles(destPath, "");

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
        .replace('id: "110010"', `id: "${crypto.randomUUID()}"`);
    }

    if (targetPath.endsWith(`${boilerplateName}.vue`)) {
      await rm(targetPath);

      targetPath = targetPath.replace(boilerplateName, componentName);
    }

    await writeFile(targetPath, updatedContent);
  }
}
