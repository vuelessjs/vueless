import defaultConfig from "./config.ts";

import type { UnknownObject } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UDropdownBadgeProps {
  /**
   * Badge label.
   */
  label?: string;

  /**
   * Options list.
   */
  options?: UnknownObject[];

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
  color?:
    | "brand"
    | "grayscale"
    | "gray"
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
    | "white";

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
  yPosition?: "top" | "bottom";

  /**
   * The position of dropdown list on the x-axis.
   */
  xPosition?: "left" | "right";

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
