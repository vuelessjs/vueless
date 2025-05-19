import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

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
   * Brightness variant.
   */
  variant?: "light" | "default" | "dark";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
