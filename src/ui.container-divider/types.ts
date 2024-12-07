import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Divider label.
   */
  label?: string;

  /**
   * Divider padding size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Divider color.
   */
  variant?: "light" | "default" | "dark";

  /**
   * Set padding around the Divider.
   */
  padding?: "none" | "before" | "after" | "all";

  /**
   * Set line dashed.
   */
  dashed?: boolean;

  /**
   * Set line dotted.
   */
  dotted?: boolean;

  /**
   * Set divider vertically orientated.
   */
  vertical?: boolean;

  /**
   * Remove border (keeps only spacings).
   */
  noBorder?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
