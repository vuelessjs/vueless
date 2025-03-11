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
   * Right icon name.
   */
  rightIcon?: string;

  /**
   * Maximum character length.
   */
  maxLength?: string | number;

  /**
   * Prevents some characters from input.
   * You can use predefined values or own RegExp.
   */
  validationRule?: "symbol" | "string" | "stringAndNumber" | "number" | "integer";

  /**
   * Input type.
   */
  type?: "text" | "number" | "tel" | "email" | "url" | "search" | "password";

  /**
   * Set specific keyboard for mobile devices.
   */
  inputmode?: "text" | "decimal" | "numeric" | "tel" | "email" | "url" | "search" | "none";

  /**
   * Make input read-only.
   */
  readonly?: boolean;

  /**
   * Disable the input.
   */
  disabled?: boolean;

  /**
   * Disable browsers autocomplete.
   */
  noAutocomplete?: boolean;

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
