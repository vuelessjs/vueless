import defaultConfig from "./config.ts";

import type { Option } from "../ui.dropdown-list/types.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Link label.
   */
  label?: string;

  /**
   * Options list.
   */
  options?: Option[];

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Link color.
   */
  color?: "primary" | "grayscale" | "success" | "warning" | "error" | "info" | "neutral";

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
