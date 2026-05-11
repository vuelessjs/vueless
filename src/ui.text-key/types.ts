import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Key value to display.
   */
  value?: string;

  /**
   * Kbd variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Kbd size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Kbd color.
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
