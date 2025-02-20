/* eslint-disable no-console */

import { cwd } from "node:process";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { styleText } from "node:util";

import { DEFAULT_VUELESS_CONFIG_CONTENT } from "../constants.js";
import { JAVASCRIPT_EXT, TYPESCRIPT_EXT, VUELESS_CONFIG_FILE_NAME } from "../../constants.js";

const vuelessInitOptions = ["--ts", "--js"];

export async function vuelessInit(options) {
  const isValidOptions = options.every((option) => vuelessInitOptions.includes(option));

  if (options.length && !isValidOptions) {
    throw new Error("Invalid options were provided.");
  }

  const fileExt = options.includes("--ts") ? TYPESCRIPT_EXT : JAVASCRIPT_EXT;
  const formattedDestPath = path.format({
    dir: cwd(),
    name: VUELESS_CONFIG_FILE_NAME,
    ext: fileExt,
  });

  await writeFile(formattedDestPath, DEFAULT_VUELESS_CONFIG_CONTENT, "utf-8");

  const successMessage = styleText(
    "green",
    `The '${formattedDestPath.split(path.sep).at(-1)}' was created in the project root directory.`,
  );

  console.log(successMessage);
}
