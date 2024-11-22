import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UHeaderProps {
  /**
   * Header label.
   */
  label?: string;

  /**
   * Header size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Header color.
   */
  color?: `${Color}`;

  /**
   * Allows changing HTML tag.
   */
  tag?: string;

  /**
   * Removes text line height (disable for multiline headers).
   */
  line?: boolean;

  /**
   * Show the underline.
   */
  underlined?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
