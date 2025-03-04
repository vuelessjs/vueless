import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Button variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Button color.
   */
  color?: "brand" | "success" | "warning" | "error" | "info" | "grayscale";

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
