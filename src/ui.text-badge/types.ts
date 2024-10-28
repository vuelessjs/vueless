import defaultConfig from "./config";

export interface UBadgeProps {
  /**
   *  Badge label.
   */
  label?: string;

  /**
   * Badge variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Add border to the `thirdary` variant.
   */
  bordered: boolean;

  /**
   * Badge size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Badge color.
   */
  color?: "brand" | "grayscale" | "gray" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | "white";

  /**
   * Icon name (appears instead of label).
   */
  icon?: string;

  /**
   * Left icon name.
   */
  leftIcon?: string;

  /**
   * Right icon name.
   */
  rightIcon?: string;

  /**
   * Set badge corners rounded.
   */
  round: boolean;

  /**
   * Controls the keyboard “Tab” focus order of elements.
   */
  tabindex: string;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
