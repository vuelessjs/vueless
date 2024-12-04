import defaultConfig from "./config.ts";

import type { BrandColors, ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export type IconSize = "3xs" | "2xs" | "xs" | "sm" | "md";

export interface UColorPickerProps {
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
  colorOptions?: Array<BrandColors>;

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
