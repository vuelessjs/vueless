import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
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
   * Icon name for active (selected) stars.
   */
  activeIcon?: string;

  /**
   * Icon name for inactive (unselected) stars.
   */
  inactiveIcon?: string;

  /**
   * Make rating read-only.
   */
  readonly?: boolean;

  /**
   * Disable the rating.
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
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
