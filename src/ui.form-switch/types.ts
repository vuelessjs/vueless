import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
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
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "notice"
    | "neutral"
    | "grayscale";

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
  dataTest?: string | null;
}
