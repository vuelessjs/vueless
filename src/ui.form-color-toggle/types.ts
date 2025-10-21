import defaultConfig from "./config";

import type { PrimaryColorName, NeutralColorName, ComponentConfig } from "../types";

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
  colors?: Record<PrimaryColorName, string>;

  /**
   * Color labels.
   */
  labels?: Record<NeutralColorName, string>;

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
