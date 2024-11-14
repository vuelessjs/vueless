import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UMoneyProps {
  /**
   * Money value.
   */
  value?: number;

  /**
   * Money size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  /**
   * Money color.
   */
  color?:
    | "brand"
    | "grayscale"
    | "gray"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "white";

  /**
   * Money currency symbol.
   */
  symbol?: string;

  /**
   * Money currency symbol align.
   */
  symbolAlign?: "right" | "left";

  /**
   * Add space between currency symbol and sum.
   */
  symbolDivided?: boolean;

  /**
   * Money sign.
   */
  sign?: "default" | "positive" | "negative";

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
