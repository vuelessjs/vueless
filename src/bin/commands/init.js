/* eslint-disable no-console */

import { cwd } from "node:process";
import path from "node:path";
import { existsSync } from "node:fs";
import { writeFile, rename } from "node:fs/promises";
import { styleText } from "node:util";

import { DEFAULT_VUELESS_CONFIG_CONTENT } from "../constants.js";
import { JAVASCRIPT_EXT, TYPESCRIPT_EXT, VUELESS_CONFIG_FILE_NAME } from "../../constants.js";

const vuelessInitOptions = ["--ts", "--js"];

export async function vuelessInit(options) {
  const isValidOptions = options.every((option) => vuelessInitOptions.includes(option));

  if (options.length && !isValidOptions) {
    console.log(styleText("red", "Invalid options were provided."));

    return;
  }

  const fileExt = options.includes("--ts") ? TYPESCRIPT_EXT : JAVASCRIPT_EXT;
  const formattedDestPath = path.format({
    dir: cwd(),
    name: VUELESS_CONFIG_FILE_NAME,
    ext: fileExt,
  });

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

  await writeFile(formattedDestPath, DEFAULT_VUELESS_CONFIG_CONTENT, "utf-8");

  console.log(
    styleText(
      "green",
      `The '${formattedDestPath.split(path.sep).at(-1)}' was created in the project root directory.`,
    ),
  );
}
