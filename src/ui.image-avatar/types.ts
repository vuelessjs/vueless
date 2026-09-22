import defaultConfig from "./config";

import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

export interface BaseChipItem {
  icon?: string;
  color?: Props["color"];
  xPosition?: "left" | "right";
  yPosition?: "top" | "bottom";
  inset?: boolean;
}

/* Any object shape is a valid chip, only reserved chip keys are type checked. */
export type ChipItem = BaseChipItem & (object | UnknownObject);

export interface Props {
  /**
   * Avatar label (username, nickname, etc.).
   */
  label?: string;

  /**
   * Badge variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

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
    | "error"
    | "warning"
    | "success"
    | "info"
    | "notice"
    | "neutral"
    | "grayscale";

  /**
   * Avatar corner rounding.
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";

  /**
   * Avatar image source.
   */
  src?: string;

  /**
   * Avatar placeholder icon.
   */
  placeholderIcon?: string;

  /**
   * Avatar chip config.
   */
  chip?: ChipItem;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
