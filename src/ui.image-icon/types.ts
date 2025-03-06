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
    | "inherit"
    | "primary";

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
   * Mark that Icon used inside Vueless components (used to get icons from vueless library).
   */
  internal?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
