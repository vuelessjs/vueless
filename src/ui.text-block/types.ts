import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * HTML markdown or plain text.
   */
  html?: string;

  /**
   * Text size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Text align.
   */
  align?: "left" | "center" | "right";

  /**
   * Removes text line height (useful for 1-line text).
   */
  line?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
