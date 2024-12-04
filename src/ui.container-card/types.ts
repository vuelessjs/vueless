import defaultConfig from "./config.ts";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export interface UCardProps {
  /**
   * Card title.
   */
  title?: string;

  /**
   * Card description.
   */
  description?: string;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
