import defaultConfig from "./config.ts";

import type { Option } from "../ui.dropdown-list/types.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export type IconSize = "sm" | "2xs" | "xs";

export interface UDropdownLinkProps {
  /**
   * Link label.
   */
  label?: string;

  /**
   * Options list.
   */
  options?: () => Option[];

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Link color.
   */
  color?:
    | "grayscale"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "gray"
    | "white"
    | "brand";

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
