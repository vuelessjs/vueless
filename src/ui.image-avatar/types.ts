import defaultConfig from "./config.ts";

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
  color?:
    | "brand"
    | "grayscale"
    | "gray"
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
    | "white";

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
