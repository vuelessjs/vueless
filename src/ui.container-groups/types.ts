import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * The distance between nested elements.
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
