import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";
export type Config = Partial<typeof defaultConfig>;

export interface UIconProps {
  /**
   * Icon name.
   */
  name?: string;

  /**
   * Icon source (svg as a vue component).
   */
  src?: object;

  /**
   * Icon color.
   */
  color?: `${Color}`;

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
  tooltipSettings?: object;

  /**
   * Mark that Icon used inside Vueless components (used to get icons from vueless library).
   */
  internal?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
