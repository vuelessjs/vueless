import defaultConfig from "./config.ts";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export interface UGroupsProps {
  /**
   * The distance between nested elements.
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
