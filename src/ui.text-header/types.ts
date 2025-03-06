import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Header label.
   */
  label?: string;

  /**
   * Header size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Header color.
   */
  color?:
    | "grayscale"
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
    | "gray"
    | "white"
    | "primary";

  /**
   * Allows changing HTML tag.
   */
  tag?: string;

  /**
   * Removes text line height (useful for 1-line text).
   */
  line?: boolean;

  /**
   * Show the underline.
   */
  underlined?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
