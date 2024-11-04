/**
 * The file has `.js` extension because it is a node script.
 */

import { copyIcons } from "../src/utils/node/loaderIcon.js";
import { getVueSourceFile } from "../src/utils/node/helper.js";

/* Copy SVG icons from the default icon library into the assets' folder. */
await copyIcons({ mode: "vuelessIcons", env: "vueless", targetFiles: [getVueSourceFile()] });
