import defaultConfig from "./config.ts";

import type { ComponentConfig, UnknownObject, UnknownArray } from "../types.ts";

export type Config = typeof defaultConfig;

export type SetUTabsSelectedItem = (
  value: string | number | boolean | UnknownArray | UnknownObject,
) => void;

interface UTabsOption {
  value: string | number;
  label: string;
  disabled: boolean;
}

export interface UTabsProps {
  /**
   * Selected tab value.
   */
  modelValue?: string;

  /**
   * Tab options.
   */
  options?: () => UTabsOption[];

  /**
   * Tabs size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Add the bottom line along the entire length.
   */
  underlined?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
