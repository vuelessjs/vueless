import { readdir, stat, readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const searchPath = join(__dirname, "dist");

async function replaceTextInFiles(searchString, replaceString, directory) {
  try {
    const files = await readdir(directory);

    for (const file of files) {
      const filePath = join(directory, file);
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        await replaceTextInFiles(searchString, replaceString, filePath); // Recursively search subdirectories
      } else if (stats.isFile() && file.endsWith(".js")) {
        let data = await readFile(filePath, "utf8");

        if (data.includes(searchString)) {
          data = data.replace(new RegExp(searchString, "g"), replaceString);
          await writeFile(filePath, data, "utf8");
          console.log(`Updated file: ${filePath}`);
        }
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// Replace related paths to vueless.config.js and web-types.json in npm package source.
await replaceTextInFiles(`"../../vueless.config.js"`, `"../../../vueless.config.js"`, searchPath);
await replaceTextInFiles(`"../../web-types.json"`, `"../web-types.json"`, searchPath);
