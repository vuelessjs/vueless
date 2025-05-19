/**
 * The file has a `.js ` extension because it is a node script.
 */

import { cacheProjectIcons, copyIconsCache } from "../src/utils/node/loaderIcon.js";
import { getVueDirs } from "../src/utils/node/helper.js";
import { INTERNAL_ENV, VUELESS_LOCAL_DIR } from "../src/constants.js";

/* Copy SVG icons from the default icon library into the `./src/icons` folder. */
await cacheProjectIcons({ env: INTERNAL_ENV, targetFiles: getVueDirs() });
await copyIconsCache(VUELESS_LOCAL_DIR);
