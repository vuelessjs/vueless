import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Input label.
   */
  label?: string;

  /**
   * Search input value.
   */
  modelValue?: string;

  /**
   * Input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Input placeholder.
   */
  placeholder?: string;

  /**
   * Label placement.
   */
  labelAlign?: "topInside" | "top" | "topWithDesc" | "left" | "right";

  /**
   * Input description.
   */
  description?: string;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Minimum character length for search.
   */
  minLength?: number | string;

  /**
   * Search button label.
   */
  searchButtonLabel?: string;

  /**
   * Time in milliseconds before value emit.
   */
  debounce?: number | string;

  /**
   * Left icon name.
   */
  leftIcon?: string;

  /**
   * Right icon name.
   */
  rightIcon?: string;

  /**
   * Make input read-only.
   */
  readonly?: boolean;

  /**
   * Make input disabled.
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
