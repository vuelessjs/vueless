import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Input value.
   */
  modelValue: number | string;

  /**
   * Input step.
   */
  step?: number;

  /**
   * Input min value.
   */
  min?: number;

  /**
   * Input max value.
   */
  max?: number;

  /**
   * Input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Make input read-only.
   */
  readonly?: boolean;

  /**
   * Disable the input.
   */
  disabled?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
