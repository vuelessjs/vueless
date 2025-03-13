import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

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
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "grayscale"
    | "neutral";

  /**
   * Avatar corner rounding.
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";

  /**
   * Add border to the avatar.
   */
  bordered?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
