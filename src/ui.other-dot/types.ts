import defaultConfig from "./config.ts";

export interface UDotProps {
  /**
   * Dot color.
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
   * Dot size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
