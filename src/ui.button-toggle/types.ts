import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export type LabelSize = "sm" | "md" | "lg";

export interface UToggleOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface Props {
  /**
   * Selected value.
   */
  modelValue?: string | number | (string | number)[];

  /**
   * Toggle item options.
   */
  options?: UToggleOption[];

  /**
   * Toggle size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Label placement.
   */
  labelAlign?: "top" | "topWithDesc" | "left" | "right";

  /**
   * Toggle label.
   */
  label?: string;

  /**
   * Toggle description.
   */
  description?: string;

  /**
   * Toggle name.
   */
  name: string;

  /**
   * Allow selecting a few options and return them as an array.
   */
  multiple?: boolean;

  /**
   * Show items without a grouping border.
   */
  split?: boolean;

  /**
   * Make toggle disabled.
   */
  disabled?: boolean;

  /**
   * Make the toggle fill the width with its container.
   */
  block?: boolean;

  /**
   * Set button corners rounded.
   */
  round?: boolean;

  /**
   * Set the same paddings for the button.
   */
  square?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
