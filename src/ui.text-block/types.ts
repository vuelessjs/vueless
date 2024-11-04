import defaultConfig from "./config.ts";

export interface UTextProps {
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
   * Remove line height (useful for 1-line text).
   */
  line?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
