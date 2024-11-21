import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UGroupProps {
  /**
   * Group title.
   */
  title?: string;

  /**
   * The distance between nested elements.
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
