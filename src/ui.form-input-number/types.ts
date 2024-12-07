import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface UInputNumberProps {
  /**
   * Input value.
   */
  modelValue: number;

  /**
   * Input step.
   */
  step?: number;

  /**
   * Input min value.
   */
  min?: number;

  /**
   * Input max value.
   */
  max?: number;

  /**
   * Input label below number.
   */
  label?: string;

  /**
   * Label placement.
   */
  labelAlign?: "top" | "topWithDesc" | "left" | "right";

  /**
   * Input description.
   */
  description?: string;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Disable the input.
   */
  disabled?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
