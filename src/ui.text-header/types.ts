import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

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
    | "text" // the default design system text color
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "notice"
    | "neutral"
    | "grayscale"
    | "inherit";

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
