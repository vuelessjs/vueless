import defaultConfig from "./config.ts";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export type IconSize = "2xl" | "3xl" | "4xl";
export type TitleSize = "xs" | "sm" | "md";

export interface UEmptyProps {
  /**
   * Empty state title.
   */
  title?: string;

  /**
   * Empty state description.
   */
  description?: string;

  /**
   * Empty state size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
