import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export type IconSize = "xs" | "sm" | "md";
export type RemoveIconSize = "2xs" | "xs" | "sm";

export interface UFileProps {
  /**
   * File url.
   */
  url?: string;

  /**
   * Image url.
   */
  imageUrl?: string;

  /**
   * File label.
   */
  label?: string;

  /**
   * File size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Show remove button.
   */
  removable?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
