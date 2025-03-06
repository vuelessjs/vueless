import defaultConfig from "./config.ts";

import type { PrimaryColors, GrayColors, ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Selected primary color (v-model).
   */
  primary?: PrimaryColors;

  /**
   * Selected gray color (v-model).
   */
  gray?: GrayColors;

  /**
   * Component size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Primary color list.
   */
  primaryColors?: Record<PrimaryColors, string>;

  /**
   * Gray color list.
   */
  grayColors?: Record<GrayColors, string>;

  /**
   * Primary color labels.
   */
  primaryLabels?: Record<PrimaryColors, string>;

  /**
   * Gray color labels.
   */
  grayLabels?: Record<GrayColors, string>;

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
