import defaultConfig from "./config.ts";

import type { Option } from "../ui.form-listbox/types.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Select value.
   */
  modelValue?: number | string | (number | string)[];

  /**
   * Select options.
   */
  options?: Option[];

  /**
   * Select label.
   */
  label?: string;

  /**
   * Label placement.
   */
  labelAlign?: "topInside" | "top" | "topWithDesc" | "left" | "right";

  /**
   * Select placeholder.
   */
  placeholder?: string;

  /**
   * Select description.
   */
  description?: string;

  /**
   * Select error message.
   */
  error?: string;

  /**
   * Select size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Left icon name.
   */
  leftIcon?: string;

  /**
   * Right icon name.
   */
  rightIcon?: string;

  /**
   * Select open direction.
   * @extendOnly
   */
  openDirection?: "auto" | "top" | "bottom";

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
   * Number of options you can see without a scroll.
   */
  visibleOptions?: number;

  /**
   * Allow clearing selected value.
   */
  clearable?: boolean;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Controls multiple selection view.
   */
  multipleVariant?: "inline" | "list" | "badge";

  /**
   * Determines how many selected option labels are shown in the label.
   */
  labelDisplayCount?: number;

  /**
   * Allows to search value in a list.
   */
  searchable?: boolean;

  /**
   * Disable the select.
   */
  disabled?: boolean;

  /**
   * Show "Add new option" button in the list.
   */
  addOption?: boolean;

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
