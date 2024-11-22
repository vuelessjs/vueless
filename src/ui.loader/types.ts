import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface ULoaderProps {
  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Loader color.
   */
  color?: `${Color}`;

  /**
   * Loader size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;
}
