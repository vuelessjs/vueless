import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export interface UGroupsProps {
  /**
   * The distance between nested elements.
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
