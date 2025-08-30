#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates Netlify _redirects file for Vueless components
 * Scans all ui.* components and creates redirects from component names to their Storybook docs
 */

function extractStoryMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Extract the export default object
    const exportDefaultMatch = content.match(/export\s+default\s+\{([^}]+)\}/s);

    if (!exportDefaultMatch) {
      console.warn(`No export default found in ${filePath}`);

      return null;
    }

    const exportContent = exportDefaultMatch[1];

    // Extract id
    const idMatch = exportContent.match(/id:\s*["']([^"']+)["']/);

    if (!idMatch) {
      console.warn(`No id found in ${filePath}`);

      return null;
    }

    // Extract title
    const titleMatch = exportContent.match(/title:\s*["']([^"']+)["']/);

    if (!titleMatch) {
      console.warn(`No title found in ${filePath}`);

      return null;
    }

    return {
      id: idMatch[1],
      title: titleMatch[1],
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);

    return null;
  }
}

function titleToPath(title) {
  // Extract the component name (part after the last "/")
  const parts = title.split("/");
  const componentName = parts[parts.length - 1].trim();

  // Convert to lowercase and replace spaces with hyphens
  return componentName.toLowerCase().replace(/\s+/g, "-");
}

function redirects() {
  const srcDir = path.join(__dirname, "..", "src");
  const redirects = [];

  try {
    // Get all ui.* directories
    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    const uiDirs = entries
      .filter((entry) => entry.isDirectory() && entry.name.startsWith("ui."))
      .map((entry) => entry.name);

    console.log(`Found ${uiDirs.length} UI component directories`);

    for (const uiDir of uiDirs) {
      const storiesPath = path.join(srcDir, uiDir, "storybook", "stories.ts");

      if (fs.existsSync(storiesPath)) {
        const metadata = extractStoryMetadata(storiesPath);

        if (metadata) {
          const componentPath = titleToPath(metadata.title);
          const redirect = `/${componentPath}   /?path=/docs/${metadata.id}--docs   200`;

          redirects.push(redirect);

          console.log(`✓ ${uiDir}: /${componentPath} -> /?path=/docs/${metadata.id}--docs`);
        } else {
          console.warn(`✗ ${uiDir}: Could not extract metadata`);
        }
      } else {
        console.warn(`✗ ${uiDir}: No stories.ts found`);
      }
    }

    // Write _redirects file
    const redirectsPath = path.join(__dirname, "..", "_redirects");
    const redirectsContent = [
      "# Netlify redirects for Vueless components",
      "# Generated automatically by .scripts/generateRedirects.js",
      "",
      ...redirects,
      "",
    ].join("\n");

    fs.writeFileSync(redirectsPath, redirectsContent);

    console.log(`\n✅ Generated _redirects file with ${redirects.length} redirects`);
    console.log(`📁 File saved to: ${redirectsPath}`);
  } catch (error) {
    console.error("Error generating redirects:", error.message);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  redirects();
}

export { redirects, extractStoryMetadata, titleToPath };
