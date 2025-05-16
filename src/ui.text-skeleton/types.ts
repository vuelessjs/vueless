import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Header lines amount.
   */
  header?: number;

  /**
   * Text lines amount.
   */
  text?: number;

  /**
   * Input size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Brightness variant.
   */
  variant?: "light" | "default" | "dark";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
