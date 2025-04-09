import defaultConfig from "./config.ts";

import type { Option } from "../ui.dropdown-list/types.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface BadgeOption extends Option {
  id?: string | number;
}

export interface Props {
  /**
   * Selected badge.
   */
  modelValue?: number | string | (number | string)[];

  /**
   * Badge label.
   */
  label?: string;

  /**
   * Allows multiple selection.
   */
  multiple?: boolean;

  /**
   * Options list.
   */
  options?: BadgeOption[];

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

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
   * Set badge corners rounded.
   */
  round?: boolean;

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
