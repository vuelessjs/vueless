import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * OTP value.
   */
  modelValue?: string;

  /**
   * Input label.
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
   * Number of OTP input fields.
   */
  length?: number;

  /**
   * Mask the input values.
   */
  mask?: boolean;

  /**
   * Only allow integer input.
   */
  integerOnly?: boolean;

  /**
   * Make input read-only.
   */
  readonly?: boolean;

  /**
   * Disable the input.
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
