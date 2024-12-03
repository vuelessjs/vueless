import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export type IconSize = "xs" | "sm" | "md";
export type ButtonSize = "xs" | "md" | "lg";

export interface UInputSearchProps {
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
  labelAlign?: "top" | "topInside" | "topWithDesc" | "left" | "right";

  /**
   * Input label.
   */
  label?: string;

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
