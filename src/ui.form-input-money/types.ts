import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface FormatOptions {
  minFractionDigits: number;
  maxFractionDigits: number;
  decimalSeparator: string;
  thousandsSeparator: string;
  positiveOnly: boolean;
  prefix: string;
}

export interface UInputMoneyProps {
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
  labelAlign?: "top" | "topInside" | "topWithDesc" | "left" | "right";

  /**
   * Currency symbol.
   */
  symbol?: string;

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
   * Minimal number of signs after the decimal separator (fractional part of a number).
   */
  minFractionDigits?: number;

  /**
   * Maximal number of signs after the decimal separator (fractional part of a number).
   */
  maxFractionDigits?: number;

  /**
   * A symbol used to separate the integer part from the fractional part of a number.
   */
  decimalSeparator?: string;

  /**
   *  A symbol used to separate the thousand parts of a number.
   */
  thousandsSeparator?: string;

  /**
   * Allow only positive values.
   */
  positiveOnly?: boolean;

  /**
   * Prefix to display before input value.
   */
  prefix?: string;

  /**
   * Set input read-only.
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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}