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
   * Text variant.
   */
  variant?: "default" | "accented" | "lifted" | "muted";

  /**
   * Font weight.
   */
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";

  /**
   * Header color.
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
    | "grayscale"
    | "text"; // the default design system text color

  /**
   * Allows changing HTML tag.
   */
  tag?: string;

  /**
   * Removes text line height (useful for 1-line text).
   */
  line?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
