import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
