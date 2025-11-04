import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Hide or show label.
   */
  label?: boolean;

  /**
   * Input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Label placement.
   */
  labelAlign?: "left" | "right";

  /**
   * Input type.
   */
  type?: "checkbox" | "radio";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
