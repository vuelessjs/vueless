import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export type IconSize = "xs" | "sm" | "md";

export interface UInputRatingProps {
  /**
   * Rating value.
   */
  modelValue: number;

  /**
   * Rating number of stars.
   */
  stars?: number;

  /**
   * Rating size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Rating label.
   */
  label?: string;

  /**
   * Rating label placement.
   */
  labelAlign?: "top" | "topWithDesc" | "left" | "right";

  /**
   * Rating error message.
   */
  error?: string;

  /**
   * Rating description.
   */
  description?: string;

  /**
   * Rating total.
   */
  total?: number;

  /**
   * Show rating counter.
   */
  counter?: boolean;

  /**
   * Make rating selectable.
   */
  selectable?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
