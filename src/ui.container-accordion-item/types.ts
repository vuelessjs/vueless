import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Accordion value.
   */
  modelValue?: string | null;

  /**
   * Accordion value attribute.
   */
  value?: string;

  /**
   * Accordion name.
   */
  name: string;

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
   * Control accordion state (opened/closed).
   */
  opened?: boolean;

  /**
   * Disable an accordion.
   */
  disabled?: boolean;

  /**
   * Accordion toggle icon.
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
