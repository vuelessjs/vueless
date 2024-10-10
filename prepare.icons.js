import { copyIcons } from "@vueless/plugin-vite/utils/iconLoader.js";
import { getVueSourceFile } from "@vueless/plugin-vite/utils/common.js";

/* Copy SVG icons from the default icon library into the assets' folder. */
await copyIcons({ mode: "vuelessIcons", env: "vueless", targetFiles: [getVueSourceFile()] });
