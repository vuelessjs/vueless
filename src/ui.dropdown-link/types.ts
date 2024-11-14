import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UDropdownLinkProps {
  /**
   * Link label.
   */
  label?: string;

  /**
   * Options list.
   */
  options?: Array<object>;

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Link color.
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
