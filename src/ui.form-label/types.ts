import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface ULabelProps {
  /**
   * Label text.
   */
  label?: string;

  /**
   * Label description.
   */
  description?: string;

  /**
   * Label error message.
   */
  error?: string;

  /**
   * Label align.
   */
  align?: "top" | "topInside" | "topWithDesc" | "left" | "right";

  /**
   * Label size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Make label disabled.
   */
  disabled?: boolean;

  /**
   * Centre label horizontally.
   */
  centred?: boolean;

  /**
   * Set input id for label `for` attribute.
   */
  for?: string;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
