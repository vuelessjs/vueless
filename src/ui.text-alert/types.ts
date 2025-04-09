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
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Alert size.
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Alert color.
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
   * Alert icon name.
   */
  icon?: string;

  /**
   * Delayed hide alert (milliseconds).
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
