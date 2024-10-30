import { copyIcons } from "./src/vite/utils/iconLoader.js";
import { getVueSourceFile } from "./src/vite/utils/common.js";

/* Copy SVG icons from the default icon library into the assets' folder. */
await copyIcons({ mode: "vuelessIcons", env: "vueless", targetFiles: [getVueSourceFile()] });
