import defaultConfig from "./config";

import type { PrimaryColorName, NeutralColorName, ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Selected primary color (v-model).
   */
  primary?: PrimaryColorName;

  /**
   * Selected neutral color (v-model).
   */
  neutral?: NeutralColorName;

  /**
   * Component size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Primary color list.
   */
  primaryColors?: Record<PrimaryColorName, string>;

  /**
   * Gray color list.
   */
  neutralColors?: Record<NeutralColorName, string>;

  /**
   * Primary color labels.
   */
  primaryLabels?: Record<PrimaryColorName, string>;

  /**
   * Gray color labels.
   */
  neutralLabels?: Record<NeutralColorName, string>;

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
