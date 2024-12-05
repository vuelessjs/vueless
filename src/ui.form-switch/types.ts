import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export type IconSize = "2xs" | "xs" | "sm";

export interface USwitchProps {
  /**
   * Switch value.
   */
  modelValue?: boolean;

  /**
   * Label alignment.
   */
  labelAlign?: "top" | "left" | "right";

  /**
   * Switch label.
   */
  label?: string;

  /**
   * Switch description.
   */
  description?: string;

  /**
   * Switch size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Switch color.
   */
  color?:
    | "grayscale"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "gray"
    | "white"
    | "brand";

  /**
   * Show toggle icons inside the circle.
   */
  toggleIcon?: boolean;

  /**
   * Show toggle labels (on / off).
   */
  toggleLabel?: boolean;

  /**
   * Set switch disabled.
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
