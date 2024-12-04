import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export interface UTabSize {
  size: string;
}

export interface UTabProps {
  /**
   * Tab label.
   */
  label: string;

  /**
   * Tab value.
   */
  value?: string | number;

  /**
   * Make tab disabled.
   */
  disabled?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
