import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Card title.
   */
  title?: string;

  /**
   * Card description.
   */
  description?: string;

  /**
   * Card variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
