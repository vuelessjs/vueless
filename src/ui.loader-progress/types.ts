import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface ULoaderProgressProps {
  /**
   * Loader stripe color.
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
   * API resource names (endpoint URIs).
   */
  resources?: string | Array<string>;

  /**
   * Loader state (shown / hidden).
   */
  loading?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;
}
