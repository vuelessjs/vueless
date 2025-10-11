import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { cwd } from "node:process";

import { CACHE_DIR, COMPONENTS, VUELESS_USER_COMPONENTS_DIR } from "../../constants.js";

async function isDirNotEmpty(dirPath) {
  if (!existsSync(dirPath)) {
    return false;
  }

  try {
    const files = await fs.readdir(dirPath);

    return files.length > 0;
  } catch {
    return false;
  }
}

async function cacheOriginalComponent(componentDir, componentName) {
  const cacheDir = path.join(componentDir, CACHE_DIR, componentName);

  if (existsSync(cacheDir)) {
    return;
  }

  if (!existsSync(path.join(componentDir, CACHE_DIR))) {
    await fs.mkdir(path.join(componentDir, CACHE_DIR), { recursive: true });
  }

  await fs.mkdir(cacheDir, { recursive: true });

  const files = await fs.readdir(componentDir);

  for (const file of files) {
    const filePath = path.join(componentDir, file);
    const stat = await fs.stat(filePath);

    if (stat.isFile()) {
      const destPath = path.join(cacheDir, file);

      await fs.copyFile(filePath, destPath);
    } else if (stat.isDirectory() && file !== CACHE_DIR) {
      const destPath = path.join(cacheDir, file);

      await fs.cp(filePath, destPath, { recursive: true });
    }
  }
}

async function copyCustomComponent(customComponentDir, targetComponentDir) {
  const files = await fs.readdir(customComponentDir);

  for (const file of files) {
    const sourcePath = path.join(customComponentDir, file);
    const destPath = path.join(targetComponentDir, file);
    const stat = await fs.stat(sourcePath);

    if (stat.isFile()) {
      await fs.copyFile(sourcePath, destPath);
    } else if (stat.isDirectory()) {
      await fs.cp(sourcePath, destPath, { recursive: true, force: true });
    }
  }
}

export async function overrideComponents({ vuelessSrcDir } = {}) {
  const customComponentsDir = path.join(cwd(), VUELESS_USER_COMPONENTS_DIR);

  if (!existsSync(customComponentsDir)) {
    return;
  }

  for await (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
    const customComponentPath = path.join(customComponentsDir, componentName);
    const isCustomComponentExists = await isDirNotEmpty(customComponentPath);

    if (!isCustomComponentExists) {
      continue;
    }

    const targetComponentDir = path.join(vuelessSrcDir, componentDir);

    await cacheOriginalComponent(targetComponentDir, componentName);
    await copyCustomComponent(customComponentPath, targetComponentDir);
  }
}

export async function restoreComponents(vuelessSrcDir) {
  for await (const componentDir of Object.values(COMPONENTS)) {
    const componentPath = path.join(vuelessSrcDir, componentDir);
    const cachePath = path.join(componentPath, CACHE_DIR);

    if (!existsSync(cachePath)) {
      continue;
    }

    const cachedDirs = await fs.readdir(cachePath);

    for (const cachedDir of cachedDirs) {
      const cachedComponentPath = path.join(cachePath, cachedDir);
      const stat = await fs.stat(cachedComponentPath);

      if (!stat.isDirectory()) {
        continue;
      }

      const files = await fs.readdir(cachedComponentPath);

      for (const file of files) {
        const sourcePath = path.join(cachedComponentPath, file);
        const destPath = path.join(componentPath, file);
        const fileStat = await fs.stat(sourcePath);

        if (fileStat.isFile()) {
          await fs.copyFile(sourcePath, destPath);
        } else if (fileStat.isDirectory()) {
          const destExists = existsSync(destPath);

          if (destExists) {
            await fs.rm(destPath, { recursive: true, force: true });
          }

          await fs.cp(sourcePath, destPath, { recursive: true });
        }
      }

      await fs.rm(cachedComponentPath, { recursive: true, force: true });
    }

    const remainingFiles = await fs.readdir(cachePath);

    if (remainingFiles.length === 0) {
      await fs.rmdir(cachePath);
    }
  }
}
