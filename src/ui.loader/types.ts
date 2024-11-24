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
   * Loader size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Component config object.
   */
  config?: Config;
}
