import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Rating label.
   */
  label?: string;

  /**
   * Rating value.
   */
  modelValue: number;

  /**
   * Rating description.
   */
  description?: string;

  /**
   * Rating number of stars.
   */
  stars?: number;

  /**
   * Rating size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Rating label placement.
   */
  labelAlign?: "top" | "topWithDesc" | "left" | "right";

  /**
   * Rating error message.
   */
  error?: string;

  /**
   * Disable the input.
   */
  disabled?: boolean;

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
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
