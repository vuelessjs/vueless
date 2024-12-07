import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Group title.
   */
  title?: string;

  /**
   * Show line above the header.
   */
  upperlined?: boolean;

  /**
   * Show line under the header.
   */
  underlined?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
