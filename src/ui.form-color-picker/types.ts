import defaultConfig from "./config.ts";

import type { BrandColors, GrayColors, ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Selected values.
   */
  modelValue: string;

  /**
   * Component size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Color list.
   */
  colors?: Record<BrandColors, string>;

  /**
   * Color labels.
   */
  labels?: Record<GrayColors, string>;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
