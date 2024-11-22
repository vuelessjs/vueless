import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

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
  color?: `${Color}`;

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
