import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UTabProps {
  /**
   * Tab label.
   */
  label: string;

  /**
   * Tab value.
   */
  value?: string | number;

  /**
   * Make tab disabled.
   */
  disabled?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
