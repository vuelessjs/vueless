import fs from "fs/promises";

const OPTIONAL_MARK = "?";
const CLOSING_BRACKET = "}";
const IGNORE_PROP = "@ignore";
const CUSTOM_PROP = "@custom";

/**
 * Updates or add a prop types dynamically.
 * @param {string} filePath - The path to the TypeScript file.
 * @param {Array} props - Array of prop objects to add or update.
 */
async function updateTypeScriptFile(filePath, props) {
  try {
    /* Read `types.ts` and split it by lines. */
    const content = await fs.readFile(filePath, "utf-8");
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
    await fs.writeFile(filePath, lines.join("\n"), "utf-8");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating file:", error.message);
  }
}

// Example usage
const filePath = "/Users/ivan.hridniev/PhpstormProjects/vuelessjs/vueless/src/ui.button/types.ts";

const params = [
  {
    name: "featured",
    type: "boolean",
    required: true,
    description: "Some featured prop.",
  },
  {
    name: "size",
    values: ["sm", "md", "lg"],
  },
  {
    name: "color",
    ignore: true,
  },
];

updateTypeScriptFile(filePath, params);
