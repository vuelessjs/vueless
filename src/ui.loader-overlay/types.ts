import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface ULoaderOverlayProps {
  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Loader color.
   */
  color?: `${Color}`;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;
}
