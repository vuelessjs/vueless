import defaultConfig from "./config.ts";

import type { Option } from "../ui.dropdown-list/types";
import type { Direction } from "../composables/useAutoPosition";
import type { Color } from "../types";

export type Config = Partial<typeof defaultConfig>;

export interface UDropdownLinkProps {
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
  color?: `${Color}`;

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
   * Hide focus ring.
   */
  noRing?: boolean;

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
