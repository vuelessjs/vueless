import defaultConfig from "./config.ts";

import type { BrandColors, GrayColors, ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Selected brand color (v-model).
   */
  brand?: BrandColors;

  /**
   * Selected gray color (v-model).
   */
  gray?: GrayColors;

  /**
   * Component size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Brand color list.
   */
  brandColors?: Record<BrandColors, string>;

  /**
   * Gray color list.
   */
  grayColors?: Record<GrayColors, string>;

  /**
   * Brand color labels.
   */
  brandLabels?: Record<BrandColors, string>;

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
