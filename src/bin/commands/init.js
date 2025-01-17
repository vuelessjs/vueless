/* eslint-disable no-console */

import { cwd } from "node:process";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { styleText } from "node:util";

import { DEFAULT_VUELESS_CONFIG_CONTNET } from "../constants.js";
import { JAVASCRIPT_EXT, TYPESCRIPT_EXT, VUELESS_CONFIG_FILE_NAME } from "../../constants.js";

const destPath = path.join(cwd(), VUELESS_CONFIG_FILE_NAME);

const vuelessInitOptions = ["--ts", "--js"];

export async function vuelssInit(options) {
  const isValidOptions = options.every((option) => vuelessInitOptions.includes(option));

  if (options.length && !isValidOptions) {
    throw new Error("Ivalid options were provided");
  }

  const fileExt = options.includes("--ts") ? TYPESCRIPT_EXT : JAVASCRIPT_EXT;
  const formattedDestPath = path.format({ ...path.parse(destPath), base: "", ext: fileExt });

  console.log(formattedDestPath);

  await writeFile(formattedDestPath, DEFAULT_VUELESS_CONFIG_CONTNET, "utf-8");

  const successMessage = styleText(
    "green",
    `Success: ${formattedDestPath.split(path.sep).at(-1)} was created in ${cwd()} directory`,
  );

  console.log(successMessage);
}
