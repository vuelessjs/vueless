import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Input value.
   */
  modelValue?: string | number;

  /**
   * Input label.
   */
  label?: string;

  /**
   * Label placement.
   */
  labelAlign?: "topInside" | "top" | "topWithDesc" | "left" | "right";

  /**
   * Input placeholder.
   */
  placeholder?: string;

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
   * Left icon name.
   */
  leftIcon?: string;

  /**
   * Maximum character length.
   */
  maxLength?: string | number;

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
