import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

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
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
