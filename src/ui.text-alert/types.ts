import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Alert title.
   */
  title?: string;

  /**
   * Alert description.
   */
  description?: string;

  /**
   * Alert variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Add border to the `thirdary` variant.
   */
  bordered?: boolean;

  /**
   * Alert size.
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Alert color.
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
    | "brand";

  /**
   * Alert timeout.
   */
  timeout?: number;

  /**
   * Show close button.
   */
  closable?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
