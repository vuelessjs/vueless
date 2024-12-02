import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface ULoaderProgressProps {
  /**
   * Loader stripe color.
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
   * API resource names (endpoint URIs).
   */
  resources?: string | string[];

  /**
   * Progress size.
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Component config object.
   */
  config?: Config;
}
