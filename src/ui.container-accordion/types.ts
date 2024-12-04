import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export type DividerSize = "md" | "lg" | "xl";
export interface UAccordionProps {
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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
