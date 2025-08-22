/* eslint-disable no-console */

import path from "node:path";
import { cwd } from "node:process";
import { styleText } from "node:util";
import { existsSync, mkdirSync } from "node:fs";
import { writeFile, rename } from "node:fs/promises";

import { detectTypeScript, generateConfigIndexContent } from "../../utils/node/helper.js";

import { DEFAULT_VUELESS_CONFIG_CONTENT } from "../constants.js";
import {
  JAVASCRIPT_EXT,
  TYPESCRIPT_EXT,
  VUELESS_CONFIG_DIR,
  CONFIG_INDEX_FILE_NAME,
  VUELESS_CONFIG_FILE_NAME,
} from "../../constants.js";

const vuelessInitOptions = ["--ts", "--js", "--pnpm", "--yarn"];

/**
 * Initializes Vueless in the project by creating a default config file and vueless config directory.
 * @param {string[]} options - The function options.
 * @param {boolean} options.includes("--ts") - If true, creates a TypeScript config file.
 * @param {boolean} options.includes("--js") - If true, creates a JavaScript config file.
 * @param {boolean} options.includes("--pnpm") - If true, creates a `.npmrc` config with hoisting disabled.
 * @param {boolean} options.includes("--yarn") - If true, creates a `.yarnrc.yml` config with pnp disabled.
 */
export async function vuelessInit(options) {
  const isValidOptions = options.every((option) => vuelessInitOptions.includes(option));

  if (options.length && !isValidOptions) {
    console.log(styleText("red", "Invalid options were provided."));

    return;
  }

  const hasTypeScript = await detectTypeScript();
  const fileExt = options.includes("--ts") || hasTypeScript ? TYPESCRIPT_EXT : JAVASCRIPT_EXT;

  const destPath = path.format({
    dir: cwd(),
    name: VUELESS_CONFIG_FILE_NAME,
    ext: fileExt,
  });

  /* Create pnpm package manager config. */
  if (options.includes("--pnpm")) {
    await createPackageManagerConfig(".npmrc", [
      "# Pnpm",
      "# Vueless: disable hoisting for the package related modules.",
      "public-hoist-pattern[] = tailwindcss",
      "public-hoist-pattern[] = *storybook*",
      "public-hoist-pattern[] = prettier2",
    ]);
  }

  /* Create yarn 2+ package manager config. */
  if (options.includes("--yarn")) {
    await createPackageManagerConfig(".yarnrc.yml", [
      "# Yarn 2+",
      "# Vueless: install Node packages into a standard node_modules folder, the same way as Yarn Classic or npm.",
      "nodeLinker: node-modules",
    ]);
  }

  /* Backup existing config if it exists. */
  await backupVuelessConfig(destPath);

  /* Create a default config file. */
  await createVuelessConfig(destPath);

  /* Create a vueless config directory and index file. */
  await createVuelessConfigDir(fileExt);
}

/**
 * Backs up the existing Vueless config file by renaming it.
 * @param {string} destPath - The path to the Vueless config file.
 */
async function backupVuelessConfig(destPath) {
  if (!existsSync(destPath)) return;

  const fileNameWithoutExtension = path.basename(destPath, path.extname(destPath));
  const extension = path.extname(destPath);
  const timestamp = new Date().valueOf();

  const backupConfigName = `${fileNameWithoutExtension}-backup-${timestamp}${extension}`;

  await rename(destPath, backupConfigName);

  console.warn(
    styleText(
      "yellow",
      `Current Vueless config backed into: '${path.basename(backupConfigName)}'. Remove it before commit.`,
    ),
  );
}

/**
 * Creates a default Vueless config file.
 * @param {string} destPath - The path to the Vueless config file.
 */
async function createVuelessConfig(destPath) {
  await writeFile(destPath, DEFAULT_VUELESS_CONFIG_CONTENT, "utf-8");

  const fileName = path.basename(destPath);

  console.log(styleText("green", `The '${fileName}' was created in the project root.`));
}

/**
 * Creates a Vueless config directory and index file.
 * @param {string} fileExt - The file extension to use for the index file.
 */
async function createVuelessConfigDir(fileExt) {
  const vuelessDir = path.join(cwd(), VUELESS_CONFIG_DIR);

  if (existsSync(vuelessDir)) return;

  mkdirSync(vuelessDir);
  console.log(
    styleText("green", `The '${VUELESS_CONFIG_DIR}' directory was created in the project root.`),
  );

  const indexFileContent = await generateConfigIndexContent();
  const destPath = path.join(vuelessDir, `${CONFIG_INDEX_FILE_NAME}${fileExt}`);

  await writeFile(destPath, indexFileContent, "utf-8");
}

/**
 * Creates a package manager config file.
 * @param {string} fileName - The name of the config file.
 * @param {string[]} fileContent - The content of the config file.
 */
async function createPackageManagerConfig(fileName, fileContent) {
  const filePath = path.join(cwd(), fileName);

  await writeFile(filePath, fileContent.join("\n"), "utf-8");
  console.log(styleText("green", `The '${fileName}' was created in the project root.`));
}
