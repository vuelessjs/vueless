import fs from "fs/promises";

/**
 * Updates or add a prop types dynamically.
 * @param {string} filePath - The path to the TypeScript file.
 * @param {Array} params - Array of props objects to add or update.
 */
async function updateTypeScriptFile(filePath, params) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const lines = content.split("\n");

    for (const param of params) {
      let { name, type, values = [], description = "–", required = false } = param;

      if (!name || !type) {
        return;
      }

      const unionType = [...new Set(values)].map((value) => `"${value}"`).join(" | ");
      const optionalMark = required ? "" : "?";

      // removes new lines and double spaces.
      description = description.replaceAll(/[\n\s]+/g, " ").trim();
      type = values.length ? unionType : type;

      const propDefinition = [
        `  /**`,
        `   * ${description}`,
        `   */`,
        `  ${name}${optionalMark}: ${type};`,
      ].join("\n");

      /* Check if the prop type already exists. */
      const propRegex = new RegExp(`^\\s*${name}[?:]?\\s*:`);
      let propExistIndex = lines.findIndex((line) => propRegex.test(line));

      if (~propExistIndex) {
        const commentLines = 3;
        const propLines = 1;

        lines.splice(
          propExistIndex - commentLines,
          commentLines + propLines,
          ...propDefinition.split("\n"),
        );
      } else {
        const closingBracketIndex = lines.findIndex((line) => line.trim() === "}");

        lines.splice(closingBracketIndex, 0, "", ...propDefinition.split("\n"));
      }
    }

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
    default: false,
    required: true,
    description: "Some featured prop.",
  },
  {
    name: "size",
    type: "string",
    values: ["sm", "md", "lg"],
    default: "lg",
    required: false,
    description: "Some \n size \n \n \n prop.",
  },
];

updateTypeScriptFile(filePath, params);
