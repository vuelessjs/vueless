import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;
export type DividerSize = "md" | "lg" | "xl";

export interface Props {
  /**
   * Accordion title.
   */
  title?: string;

  /**
   * Accordion description.
   */
  description?: string;

  /**
   * Accordion size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
