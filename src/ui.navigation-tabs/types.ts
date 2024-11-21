import defaultConfig from "./config.ts";

import type { UnknownObject } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UTabsProps {
  /**
   * Selected tab value.
   */
  modelValue?: string;

  /**
   * Tab options.
   */
  options?: UnknownObject[];

  /**
   * Tabs size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Add the bottom line along the entire length.
   */
  underlined?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
