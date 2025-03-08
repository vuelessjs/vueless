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
  variant?: "solid" | "outlined" | "soft" | "ghost";

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
  color?: "primary" | "grayscale" | "success" | "warning" | "error" | "info" | "neutral";

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
  dataTest?: string | null;
}
