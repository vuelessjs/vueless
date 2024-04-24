import { readdir, stat, readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

// Get the directory of the current ES module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const searchPath = join(__dirname, "../../src"); // Assuming the src folder is in the same directory as this script

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

const isRevert = !!process.argv[2];

const npmEnvConfig = `"../../../vueless.config.js"`;
const vuelessEnvConfig = `"../../vueless.config.js"`;

const npmEnvWebTypes = `"../web-types.json"`;
const vuelessEnvWebTypes = `"../../web-types.json"`;

if (isRevert) {
  await replaceTextInFiles(vuelessEnvConfig, npmEnvConfig, searchPath);
  await replaceTextInFiles(vuelessEnvWebTypes, npmEnvWebTypes, searchPath);
} else {
  await replaceTextInFiles(npmEnvConfig, vuelessEnvConfig, searchPath);
  await replaceTextInFiles(npmEnvWebTypes, vuelessEnvWebTypes, searchPath);
}
