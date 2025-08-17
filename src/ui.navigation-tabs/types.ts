import defaultConfig from "./config";

import type { ComponentConfig, UnknownObject, UnknownArray } from "../types";

export type Config = typeof defaultConfig;

export type SetUTabsSelectedItem = (
  value: string | number | boolean | UnknownArray | UnknownObject,
) => void;

export interface UTabsOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface Props {
  /**
   * Selected tab value.
   */
  modelValue?: string;

  /**
   * Tab options.
   */
  options?: UTabsOption[];

  /**
   * Tabs size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Make the Tabs scrollable.
   */
  scrollable?: boolean;

  /**
   * Make the Tabs expand to fill the entire width of its container.
   */
  block?: boolean;

  /**
   * Set the same paddings for the tabs.
   */
  square?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
