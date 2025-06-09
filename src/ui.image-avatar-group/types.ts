import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Avatar group size.
   */
  size?: "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

  /**
   * Maximum number of avatars to display.
   */
  max?: number;

  /**
   * Avatar variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Avatar corner rounding.
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}

export interface AvatarItem {
  src?: string;
  label?: string;
  color?: string;
  placeholderIcon?: string;
}
