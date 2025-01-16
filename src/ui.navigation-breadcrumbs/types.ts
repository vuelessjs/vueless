import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface UBreadcrumb {
  label?: string;
  route?: {
    name: string;
  };
  href?: string;
  disabled?: boolean;
  icon?: string;
}

export interface Props {
  /**
   * Array of links.
   */
  links?: UBreadcrumb[];

  /**
   * Breadcrumbs' size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Breadcrumbs' color.
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
   * Show underline.
   */
  underlined?: boolean;

  /**
   * Set breadcrumbs' underline style as dashed.
   */
  dashed?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
