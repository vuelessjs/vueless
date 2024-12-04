import defaultConfig from "./config.ts";

import type { RouteLocationRaw } from "vue-router";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
