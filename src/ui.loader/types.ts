import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface ULoaderProps {
  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Loader color.
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
    | "black"
    | "white";

  /**
   * Loader size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;
}
