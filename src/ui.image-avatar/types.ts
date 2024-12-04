import defaultConfig from "./config.ts";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export interface UAvatarProps {
  /**
   * Avatar image source.
   */
  src?: string;

  /**
   * Avatar label (username, nickname, etc.).
   */
  label?: string;

  /**
   * Avatar placeholder icon.
   */
  placeholderIcon?: string;

  /**
   * Avatar size.
   */
  size?: "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

  /**
   * Avatar color.
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
   * Avatar corner rounding.
   */
  rounded?: "dynamic" | "none" | "sm" | "md" | "lg" | "full";

  /**
   * Add border to the avatar.
   */
  bordered?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
