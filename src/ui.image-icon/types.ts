import defaultConfig from "./config.ts";

import type { DefineComponent, SVGAttributes } from "vue";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export type IconLibraries =
  | "vueless"
  | "@material-symbols"
  | "bootstrap-icons"
  | "heroicons"
  | "custom-icons";

export interface Props {
  /**
   * Icon name.
   */
  name?: string;

  /**
   * Icon source (svg as a vue component).
   */
  src?: DefineComponent<SVGAttributes>;

  /**
   * Icon color.
   */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "notice"
    | "neutral"
    | "grayscale"
    | "inherit";

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
   * Disable the link.
   */
  disabled?: boolean;

  /**
   * Mark that Icon used inside Vueless components or Storybook.
   * - "vueless": Using inside Vueless components (loads only icons used by Vueless)
   * - "storybook": Using inside Storybook (loads both sets of icons)
   */
  internal?: "storybook" | "vueless";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
