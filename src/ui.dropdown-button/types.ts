import defaultConfig from "./config.ts";

import type { Option } from "../ui.dropdown-list/types";
import type { Direction } from "../composables/useAutoPosition";
import type { Color } from "../types";

export type Config = Partial<typeof defaultConfig>;

export interface UDropdownButtonProps {
  /**
   * Button label.
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
   * Button variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Fill the background for thirdary variant.
   */
  filled?: boolean;

  /**
   * Button color.
   */
  color?: `${Color}`;

  /**
   * Button size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

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
   * Hide dropdown icon.
   */
  noIcon?: boolean;

  /**
   * The position of dropdown list on the y-axis.
   */
  yPosition?: Direction.Top | Direction.Bottom;

  /**
   * The position of dropdown list on the x-axis.
   */
  xPosition?: Direction.Left | Direction.Right;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}