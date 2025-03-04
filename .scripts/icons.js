/**
 * The file has `.js` extension because it is a node script.
 */

import { cacheIcons } from "../src/utils/node/loaderIcon.js";
import { getVueDirs } from "../src/utils/node/helper.js";

/* Copy SVG icons from the default icon library into the assets' folder. */
await cacheIcons({ mode: "vuelessIcons", env: "vueless", targetFiles: getVueDirs() });
