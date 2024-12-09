import defaultConfig from "./config.ts";
import type { ComponentConfig, UnknownObject } from "../types.ts";

export type Config = typeof defaultConfig;
export type OnClickOption = (option: Omit<Option, "onClick">) => void;

export interface BaseOption {
  isSubGroup?: boolean;
  groupLabel?: string;
  level?: number;
  isHidden?: boolean;
  onClick?: OnClickOption;
}

export interface Option extends BaseOption {
  [key: string]: string | number | boolean | UnknownObject | OnClickOption | undefined;
}

export interface Props {
  /**
   * List options.
   */
  options?: Option[];

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Value key in the item object of options.
   */
  valueKey?: string;

  /**
   * Show add option button.
   */
  addOption?: boolean;

  /**
   * List size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Number of options to show without a scroll.
   */
  visibleOptions?: undefined | number;

  /**
   * Disable the list.
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
  dataTest?: string;
}
