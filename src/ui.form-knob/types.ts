import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Knob value.
   */
  modelValue?: number;

  /**
   * Knob label.
   */
  label?: string;

  /**
   * Label placement.
   */
  labelAlign?: "top" | "topInside" | "topWithDesc" | "left" | "right";

  /**
   * Minimum value.
   */
  min?: number;

  /**
   * Maximum value.
   */
  max?: number;

  /**
   * Step increment.
   */
  step?: number;

  /**
   * Knob diameter in pixels.
   */
  size?: number;

  /**
   * Arc range in degrees (e.g., 270 for 3/4 circle).
   */
  arcRange?: number;

  /**
   * Knob accent color.
   */
  color?: "primary" | "secondary" | "error" | "warning" | "success" | "info" | "notice" | "neutral";

  /**
   * Track background color.
   */
  trackColor?: string;

  /**
   * Show numeric value in center.
   */
  showValue?: boolean;

  /**
   * Disable the knob.
   */
  disabled?: boolean;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Knob description.
   */
  description?: string;

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
