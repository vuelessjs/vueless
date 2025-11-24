import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Placeholder label text.
   */
  label?: string;

  /**
   * Adds internal margin (16px).
   */
  inset?: boolean;

  /**
   * Adds rounded corners.
   */
  rounded?: boolean;

  /**
   * Use dashed border style.
   */
  dashed?: boolean;

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
