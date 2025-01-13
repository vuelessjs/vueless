/* eslint-disable no-console */

import { cwd } from "node:process";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { styleText } from "node:util";

import { DEFAULT_VUELESS_CONFIG_NAME, DEFAULT_VUELESS_CONFIG_CONTNET } from "../constants.js";

const destPath = path.join(cwd(), DEFAULT_VUELESS_CONFIG_NAME);

const vuelessInitOptions = {};

export async function vuelssInit(options) {
  const recivedOptions = Object.keys(options).slice(1);
  const isValidOptions = recivedOptions.every((option) =>
    Object.keys(vuelessInitOptions).includes(option),
  );

  if (!isValidOptions) process.exit(9);

  try {
    await writeFile(destPath, DEFAULT_VUELESS_CONFIG_CONTNET, "utf-8");

    const successMessage = styleText(
      "green",
      `Success: ${DEFAULT_VUELESS_CONFIG_NAME} was created in ${cwd()} directory`,
    );

    console.log(successMessage);
  } catch (error) {
    console.error(error);
  }
}
