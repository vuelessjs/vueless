import defaultConfig from "./config.ts";

import type { Option } from "../ui.dropdown-list/types.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface LinkOption extends Option {
  id?: string | number;
}

export interface Props {
  /**
   * Selected link.
   */
  modelValue?: number | string | (number | string)[];

  /**
   * Link label.
   */
  label?: string;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Options list.
   */
  options?: LinkOption[];

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Link color.
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
   * Link size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Add underline.
   */
  underlined?: boolean;

  /**
   * Set dashed underline style.
   */
  dashed?: boolean;

  /**
   * Disable the link.
   */
  disabled?: boolean;

  /**
   * Hide dropdown icon.
   */
  noIcon?: boolean;

  /**
   * The position of dropdown list on the x-axis.
   */
  xPosition?: "left" | "right";

  /**
   * The position of dropdown list on the y-axis.
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
