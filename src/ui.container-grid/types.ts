import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Number of columns.
   */
  cols?: string;

  /**
   * Number of rows.
   */
  rows?: string;

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
   * Items vertical align for multi-row grid containers (align-content).
   */
  content?:
    | "start"
    | "end"
    | "center"
    | "around"
    | "evenly"
    | "between"
    | "normal"
    | "stretch"
    | "baseline";

  /**
   * Control how grid items are aligned along their inline axis (justify-items).
   */
  justify?: "start" | "end" | "end-safe" | "center" | "center-safe" | "stretch";

  /**
   * Control how content is justified and aligned within the grid (place-content).
   */
  placeContent?:
    | "start"
    | "end"
    | "end-safe"
    | "center"
    | "center-safe"
    | "around"
    | "evenly"
    | "between"
    | "stretch"
    | "baseline";

  /**
   * Control how items are justified and aligned within the grid (place-items).
   */
  placeItems?: "start" | "end" | "end-safe" | "center" | "center-safe" | "stretch" | "baseline";

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
