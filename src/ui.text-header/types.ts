import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UHeaderProps {
  /**
   * Header label.
   */
  label?: string;

  /**
   * Header size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Header color.
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
   * Allows changing HTML tag.
   */
  tag?: string;

  /**
   * Removes text line height (disable for multiline headers).
   */
  line?: boolean;

  /**
   * Show the underline.
   */
  underlined?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
