import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

declare global {
  interface Window {
    _vuelss_progress_loader_instance?: number;
  }
}

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Loader progress color.
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
   * API resource names (endpoint URIs).
   */
  resources?: string | string[] | "any" | ["any"];

  /**
   * Loader progress size.
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
