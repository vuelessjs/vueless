import defaultConfig from "./config.ts";
import type { Component, UnknownObject } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export interface UIconProps {
  /**
   * Icon name.
   */
  name?: string;

  /**
   * Icon source (svg as a vue component).
   */
  src?: () => UnknownObject;

  /**
   * Icon color.
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
    | "black"
    | "white"
    | "brand";

  /**
   * Icon size.
   */
  size?: "4xs" | "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

  /**
   * Icon variant.
   */
  variant?: "light" | "default" | "dark";

  /**
   * Make the icon interactive (cursor pointer, etc.).
   */
  interactive?: boolean;

  /**
   * Add tooltip text on hover.
   */
  tooltip?: string;

  /**
   * Tooltip settings.
   * [See all settings here](https://kabbouchi.github.io/vue-tippy/4.0/features/placement.html).
   */
  tooltipSettings?: () => UnknownObject;

  /**
   * Mark that Icon used inside Vueless components (used to get icons from vueless library).
   */
  internal?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
