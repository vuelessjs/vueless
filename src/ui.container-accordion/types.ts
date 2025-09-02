import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface UAccordionOption {
  value: string;
  title: string;
  description?: string;
  opened?: boolean;
}

export type SetAccordionSelectedItem = (value: string, opened: boolean) => void;

export interface Props {
  /**
   * Accordion items state control.
   */
  modelValue?: string | string[] | null;

  /**
   * Accordion options.
   */
  options?: UAccordionOption[];

  /**
   * Unique accordion name (sets for each accordion).
   */
  name: string;

  /**
   * Accordion size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Allow multiple items to be opened at the same time.
   */
  multiple?: boolean;

  /**
   * Disable an accordion.
   */
  disabled?: boolean;

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
