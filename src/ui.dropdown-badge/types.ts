import defaultConfig from "./config.ts";

import type { Option } from "../ui.form-listbox/types.ts";
import type { ComponentConfig, UnknownObject } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Selected badge.
   */
  modelValue?: string | number | UnknownObject | (string | number | UnknownObject)[];

  /**
   * Badge label.
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
   * Badge variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Badge color.
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
   * Badge size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Dropdown toggle icon.
   */
  toggleIcon?: boolean | string;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Set badge corners rounded.
   */
  round?: boolean;

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
