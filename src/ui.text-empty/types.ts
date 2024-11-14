import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UEmptyProps {
  /**
   * Empty state title.
   */
  title?: string;

  /**
   * Empty state description.
   */
  description?: string;

  /**
   * Empty state size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
