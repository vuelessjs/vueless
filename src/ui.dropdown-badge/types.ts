import defaultConfig from "./config.ts";

import type { Option } from "../ui.dropdown-list/types";
import type { Direction } from "../composables/useAutoPosition";
import type { Color } from "../types";

export type Config = Partial<typeof defaultConfig>;

export interface UDropdownBadgeProps {
  /**
   * Badge label.
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
   * Badge variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Badge color.
   */
  color?: `${Color}`;

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
