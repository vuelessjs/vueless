import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Text label.
   */
  label?: string;

  /**
   * Text size.
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Text align.
   */
  align?: "left" | "center" | "right";

  /**
   * Text variant.
   */
  variant?: "default" | "accented" | "lifted" | "muted";

  /**
   * Text color.
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
    | "inherit"
    | "text"; // the default design system text color

  /**
   * Removes text line height (useful for 1-line text).
   */
  line?: boolean;

  /**
   * Enables text wrapping.
   */
  wrap?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
