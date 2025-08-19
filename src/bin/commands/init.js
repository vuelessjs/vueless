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

const vuelessInitOptions = ["--ts", "--js"];

/**
 * Initializes Vueless in the project by creating a default config file and vueless config directory.
 * @param {string[]} options - The function options.
 * @param {boolean} options.includes("--ts") - If true, creates a TypeScript config file.
 * @param {boolean} options.includes("--js") - If true, creates a JavaScript config file.
 */
export async function vuelessInit(options) {
  const isValidOptions = options.every((option) => vuelessInitOptions.includes(option));

  if (options.length && !isValidOptions) {
    console.log(styleText("red", "Invalid options were provided."));

    return;
  }

  const hasTypeScript = await detectTypeScript();
  const fileExt = options.includes("--ts") || hasTypeScript ? TYPESCRIPT_EXT : JAVASCRIPT_EXT;

  const formattedDestPath = path.format({
    dir: cwd(),
    name: VUELESS_CONFIG_FILE_NAME,
    ext: fileExt,
  });

  /* Backup existing config if it exists. */
  if (existsSync(formattedDestPath)) {
    const timestamp = new Date().valueOf();
    const renamedTarget = `${VUELESS_CONFIG_FILE_NAME}-backup-${timestamp}${fileExt}`;

    await rename(formattedDestPath, renamedTarget);

    console.warn(
      styleText(
        "yellow",
        // eslint-disable-next-line vue/max-len
        `Current Vueless config backed into: '${path.basename(renamedTarget)}' folder. Don't forget to remove it before commit.`,
      ),
    );
  }

  /* Create a default config file. */
  await writeFile(formattedDestPath, DEFAULT_VUELESS_CONFIG_CONTENT, "utf-8");

  console.log(
    styleText(
      "green",
      `The '${formattedDestPath.split(path.sep).at(-1)}' was created in the project root directory.`,
    ),
  );

  /* Create a vueless config directory and index file. */
  const vuelessDir = path.join(cwd(), VUELESS_CONFIG_DIR);
  const destPath = path.join(vuelessDir, `${CONFIG_INDEX_FILE_NAME}${fileExt}`);

  if (!existsSync(vuelessDir)) {
    mkdirSync(vuelessDir);
    console.log(
      styleText(
        "green",
        `The '${VUELESS_CONFIG_DIR}' directory was created in the project root directory.`,
      ),
    );
  }

  const indexFileContent = await generateConfigIndexContent();

  await writeFile(destPath, indexFileContent, "utf-8");
}
