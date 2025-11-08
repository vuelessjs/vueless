import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Number of columns or responsive config (e.g. '1 sm:2 md:4').
   */
  cols?: string;

  /**
   * Gap between items.
   */
  gap?: "none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Vertical gap override.
   */
  rowGap?: "none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Horizontal gap override.
   */
  colGap?: "none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Vertical alignment (align-items).
   */
  align?: "start" | "end" | "center" | "stretch" | "baseline";

  /**
   * Horizontal alignment (justify-items).
   */
  justify?: "start" | "end" | "center" | "stretch";

  /**
   * Enables auto-fit responsive behavior.
   */
  responsive?: boolean;

  /**
   * Compact layout flow.
   */
  dense?: boolean;

  /**
   * Allows changing HTML tag.
   */
  tag?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
