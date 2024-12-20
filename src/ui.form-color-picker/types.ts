import defaultConfig from "./config.ts";

import type { BrandColors, ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export type IconSize = "3xs" | "2xs" | "xs" | "sm" | "md";

export interface Props {
  /**
   * Color picker selected value.
   */
  modelValue?: string;

  /**
   * Color picker name.
   */
  name?: string;

  /**
   * Color picker label.
   */
  label?: string;

  /**
   * Color picker description.
   */
  description?: string;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Color picker size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Color picker color list.
   */
  colorOptions?: BrandColors[];

  /**
   * Set color picker disabled.
   */
  disabled?: boolean;

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
  dataTest?: string;
}
