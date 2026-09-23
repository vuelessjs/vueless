import defaultConfig from "./config";
import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

export interface BaseAccordionOption {
  value: string;
  title: string;
  description?: string;
  opened?: boolean;
}

/* Any object shape is a valid option, only reserved option keys are type checked. */
export type UAccordionOption = BaseAccordionOption & (object | UnknownObject);

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
