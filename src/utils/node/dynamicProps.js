import fs from "fs/promises";
import { existsSync } from "fs";
import path from "node:path";

const OPTIONAL_MARK = "?";
const CLOSING_BRACKET = "}";
const IGNORE_PROP = "@ignore";
const CUSTOM_PROP = "@custom";

export async function cacheComponentTypes(filePath) {
  const cacheDir = path.join(filePath, ".cache");
  const sourceFile = path.join(filePath, "types.ts");
  const destFile = path.join(cacheDir, "types.ts");

  if (existsSync(cacheDir)) {
    return;
  }

  if (existsSync(sourceFile)) {
    await fs.mkdir(cacheDir);
    await fs.cp(sourceFile, destFile);
  }
}

export async function clearComponentTypesCache(filePath) {
  await fs.rm(path.join(filePath, ".cache"), { force: true, recursive: true });
}

export async function restoreComponentTypes(filePath) {
  const cacheDir = path.join(filePath, ".cache");
  const sourceFile = path.join(cacheDir, "types.ts");
  const destFile = path.join(filePath, "types.ts");

  if (existsSync(sourceFile)) {
    await fs.cp(sourceFile, destFile);
  }
}

/**
 * Updates or add a prop types dynamically.
 * @param {string} filePath - The path to the TypeScript file.
 * @param {Array} props - Array of prop objects to add or update.
 */
export async function modifyComponentTypes(filePath, props) {
  try {
    const targetFile = path.join(filePath, "types.ts");

    /* Read `types.ts` and split it by lines. */
    const content = await fs.readFile(targetFile, "utf-8");
    const lines = content.split("\n");

    for (const prop of props) {
      let { name, type, values = [], description, required, ignore } = prop;

      if (!name) return;

      /* Find line with prop. */
      const propRegex = new RegExp(`^\\s*${name}[?:]?\\s*:`);
      const propIndex = lines.findIndex((line) => propRegex.test(line));

      /* Prepare prop params. */
      const uniqueValues = [...new Set(values)];
      const unionType = uniqueValues.map((value) => `"${value}"`).join(" | ");
      const userOptionalMark = required ? "" : OPTIONAL_MARK;
      const defaultOptionalMark = lines[propIndex]?.includes(OPTIONAL_MARK) ? OPTIONAL_MARK : "";
      const optionalMark = required === undefined ? defaultOptionalMark : userOptionalMark;

      const propDescription = description?.replaceAll(/[\n\s]+/g, " ").trim() || "–"; // removes new lines and double spaces.
      const propType = unionType.length ? unionType : type;

      /* Add ignore JSDoc property. */
      if (ignore) {
        const ignoreDefinition = [`   * ${IGNORE_PROP}`, `   */`];
        const deleteLinesCount = lines[propIndex - 2].includes(IGNORE_PROP) ? 2 : 1;

        lines.splice(propIndex - deleteLinesCount, deleteLinesCount, ...ignoreDefinition);
      }

      /* Check if the prop type already exists. */
      if (~propIndex) {
        if (unionType.length) {
          lines.splice(propIndex, 1, `  ${name}${defaultOptionalMark}: ${propType};`);
        }

        const isCustomProp = lines[propIndex - 2].includes(CUSTOM_PROP);

        if (!isCustomProp && (type || description || required)) {
          // eslint-disable-next-line no-console, prettier/prettier
          console.warn("Changing of prop type, description or required are not allowed for the default props.");
        }

        continue;
      }

      /* Add new prop. */
      const closingBracketIndex = lines.findIndex((line) => line.trim() === CLOSING_BRACKET);
      const propDefinition = [
        "",
        `  /**`,
        `   * ${propDescription}`,
        `   * ${CUSTOM_PROP}`,
        `   */`,
        `  ${name}${optionalMark}: ${type};`,
      ];

      lines.splice(closingBracketIndex, 0, ...propDefinition);
    }

    /* Update `types.ts` file. */
    await fs.writeFile(targetFile, lines.join("\n"), "utf-8");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating file:", error.message);
  }
}
