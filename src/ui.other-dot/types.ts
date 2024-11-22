import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UDotProps {
  /**
   * Dot color.
   */
  color?: `${Color}`;

  /**
   * Dot size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
