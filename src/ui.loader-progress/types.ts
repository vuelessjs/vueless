import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Loader stripe color.
   */
  color?: "primary" | "grayscale" | "success" | "warning" | "error" | "info" | "neutral";

  /**
   * API resource names (endpoint URIs).
   */
  resources?: string | string[] | "any" | ["any"];

  /**
   * Progress size.
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
