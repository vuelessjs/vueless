import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Accordion item value attribute.
   */
  value?: string;

  /**
   * Accordion item name.
   */
  name: string;

  /**
   * Accordion item title.
   */
  title?: string;

  /**
   * Accordion item description.
   */
  description?: string;

  /**
   * Accordion item size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Control accordion item state (opened/closed).
   */
  opened?: boolean;

  /**
   * Disable accordion item.
   */
  disabled?: boolean;

  /**
   * Accordion item toggle icon.
   */
  toggleIcon?: boolean | string;

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
  dataTest?: string | null;
}
