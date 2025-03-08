import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Money value.
   */
  value?: number | string;

  /**
   * Money size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Money color.
   */
  color?: "primary" | "grayscale" | "success" | "warning" | "error" | "info" | "neutral";

  /**
   * Money currency symbol.
   */
  symbol?: string;

  /**
   * Money currency symbol align.
   */
  symbolAlign?: "left" | "right";

  /**
   * Add space between currency symbol and sum.
   */
  symbolDivided?: boolean;

  /**
   * Money sign.
   */
  sign?: "auto" | "positive" | "negative" | "unsigned";

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
   * Money align.
   */
  align?: "right" | "left";

  /**
   * Make money planned (add brackets).
   */
  planned?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
