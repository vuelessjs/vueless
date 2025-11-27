import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Placeholder label text.
   */
  label?: string;

  /**
   * Label text size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Border radius size.
   */
  rounded?: "sm" | "md" | "lg" | "none";

  /**
   * Use dashed border style.
   */
  dashed?: boolean;

  /**
   * Use dotted border style.
   */
  dotted?: boolean;

  /**
   * Border color.
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
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
