import fs from "fs";
import path from "path";

/* Web-types needs only for the dev purpose, so it needs to be removed from the dist. */
removeWebTypesFromPackageJson();

function removeWebTypesFromPackageJson() {
  try {
    const packageJsonPath = path.resolve(process.cwd(), "dist/package.json");
    const data = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(data);

    delete packageJson["web-types"];

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n", "utf8");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
}
