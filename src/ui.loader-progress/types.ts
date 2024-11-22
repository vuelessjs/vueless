import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface ULoaderProgressProps {
  /**
   * Loader stripe color.
   */
  color?: `${Color}`;

  /**
   * API resource names (endpoint URIs).
   */
  resources?: string | string[];

  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;
}
