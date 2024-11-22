import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UCardProps {
  /**
   * Card title.
   */
  title?: string;

  /**
   * Card description.
   */
  description?: string;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
