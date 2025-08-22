import defaultConfig from "./config";
import type { ComponentConfig, UnknownObject } from "../types";

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
  [key: string]: string | number | boolean | UnknownObject | Option[] | OnClickOption | undefined;
}

export type SelectedValue = string | number | UnknownObject;

export interface Props {
  /**
   * Selected item.
   */
  modelValue?: string | number | UnknownObject | (string | number | UnknownObject)[];

  /**
   * List options.
   */
  options?: Option[];

  /**
   * Shows input to search value in a list.
   */
  searchable?: boolean;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Value key in the item object of options.
   */
  valueKey?: string;

  /**
   * Set a name of the property containing the group label.
   */
  groupLabelKey?: string;

  /**
   * Set a name of the property containing the group values.
   */
  groupValueKey?: string;

  /**
   * Number of options displayed in the dropdown.
   */
  optionsLimit?: number;

  /**
   * Show add option button.
   */
  addOption?: boolean;

  /**
   * List size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Option highlight color.
   */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "notice"
    | "neutral"
    | "grayscale";

  /**
   * Number of options to show without a scroll.
   */
  visibleOptions?: number;

  /**
   * Time in milliseconds before value emit.
   */
  debounce?: number | string;

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
  dataTest?: string | null;
}
