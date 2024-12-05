import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface UTabSize {
  size: string;
}

export interface Props {
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
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
