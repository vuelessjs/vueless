import defaultConfig from "./config.ts";

import type { Option } from "../ui.form-listbox/types.ts";
import type { ComponentConfig, UnknownObject } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Selected button.
   */
  modelValue?: string | number | UnknownObject | (string | number | UnknownObject)[];

  /**
   * Button label.
   */
  label?: string;

  /**
   * Determines how many selected option labels are shown in the label.
   */
  labelDisplayCount?: number;

  /**
   * Options list.
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
   * Button variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft" | "ghost";

  /**
   * Button color.
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
   * Button size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Dropdown toggle icon.
   */
  toggleIcon?: boolean | string;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Set button corners rounded.
   */
  round?: boolean;

  /**
   * Set the same paddings for the button.
   */
  square?: boolean;

  /**
   * Disable the button.
   */
  disabled?: boolean;

  /**
   * The position of a dropdown list on the x-axis.
   */
  xPosition?: "left" | "right";

  /**
   * The position of a dropdown list on the y-axis.
   */
  yPosition?: "top" | "bottom";

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
