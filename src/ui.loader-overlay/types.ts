import defaultConfig from "./config.ts";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export interface ULoaderOverlayProps {
  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Loader color.
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
   * Component config object.
   */
  config?: Config;
}
