import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export type LoaderSize = "sm" | "md" | "lg";
export type IconSize = "2xs" | "xs" | "sm" | "md";

export interface UButtonProps {
  /**
   * Button variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Button color.
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
   * Button size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Button label.
   */
  label?: string;

  /**
   * Allows changing button html tag.
   */
  tag?: string;

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
   * Controls the keyboard “Tab” focus order of elements.
   */
  tabindex?: string | number;

  /**
   * Fill the background for thirdary variant.
   */
  filled?: boolean;

  /**
   * Disable the button.
   */
  disabled?: boolean;

  /**
   * Make the Button fill the width with its container.
   */
  block?: boolean;

  /**
   * Set button corners rounded.
   */
  round?: boolean;

  /**
   * Set the same paddings for the button.
   */
  square?: boolean;

  /**
   * Enable loader.
   */
  loading?: boolean;

  /**
   * Remove button ring on focus.
   */
  noRing?: boolean;

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
