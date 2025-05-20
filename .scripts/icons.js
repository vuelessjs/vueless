/**
 * The file has a `.js ` extension because it is a node script.
 */

import {
  createIconsCache,
  copyIconsCache,
  removeIconsCache,
} from "../src/utils/node/loaderIcon.js";
import { getVueDirs, cacheMergedConfigs } from "../src/utils/node/helper.js";
import { INTERNAL_ENV, VUELESS_LOCAL_DIR } from "../src/constants.js";

/* Merge and cache component configs. */
await cacheMergedConfigs(VUELESS_LOCAL_DIR);

/* Copy SVG icons from the default icon library into the `./src/icons` folder. */
await removeIconsCache(VUELESS_LOCAL_DIR);
await createIconsCache({ env: INTERNAL_ENV, targetFiles: getVueDirs() });
await copyIconsCache(VUELESS_LOCAL_DIR);

/* Stop a command line process. */
process.exit(0);
