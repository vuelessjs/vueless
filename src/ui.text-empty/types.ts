import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
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
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
