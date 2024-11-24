import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UGroupProps {
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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
