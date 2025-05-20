import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Hide or show label.
   */
  label?: boolean;

  /**
   * Label placement.
   */
  labelAlign?: "topInside" | "top" | "left" | "right";

  /**
   * Input type.
   */
  type?: "input" | "textarea";

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
