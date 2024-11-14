import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
