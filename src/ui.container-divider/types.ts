import defaultConfig from "./config.ts";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export interface UDividerProps {
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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
