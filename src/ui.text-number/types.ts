import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Number value.
   */
  value?: number | string;

  /**
   * Number size.
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Number color.
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
   * Number sign.
   */
  sign?: "auto" | "positive" | "negative" | "unsigned";

  /**
   * Currency symbol.
   */
  currency?: string;

  /**
   * Currency align.
   */
  currencyAlign?: "left" | "right";

  /**
   * Add space between currency and sum.
   */
  currencySpace?: boolean;

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
   * Number align.
   */
  align?: "left" | "right";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
