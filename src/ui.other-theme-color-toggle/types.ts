import defaultConfig from "./config.ts";

import type { PrimaryColors, NeutralColors, ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Selected primary color (v-model).
   */
  primary?: PrimaryColors;

  /**
   * Selected neutral color (v-model).
   */
  neutral?: NeutralColors;

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
  neutralColors?: Record<NeutralColors, string>;

  /**
   * Primary color labels.
   */
  primaryLabels?: Record<PrimaryColors, string>;

  /**
   * Gray color labels.
   */
  neutralLabels?: Record<NeutralColors, string>;

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
