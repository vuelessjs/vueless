import defaultConfig from "./config.ts";

import type { RouteLocationRaw } from "vue-router";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface UPageProps {
  /**
   * Page size (width).
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "wide";

  /**
   * Page title.
   */
  title?: string;

  /**
   * Page title size.
   */
  titleSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Set page description.
   */
  description?: string;

  /**
   * Back link vue-router route object.
   */
  backTo?: () => RouteLocationRaw;

  /**
   * Back link label.
   */
  backLabel?: string;

  /**
   * Sets background light gray (useful if the page contains nested cards).
   */
  gray?: boolean;

  /**
   * Stick right page rounding.
   */
  fixedRounding?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
